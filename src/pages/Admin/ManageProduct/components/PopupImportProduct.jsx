import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import * as XLSX from 'xlsx'
import AdminApi from '../../../../apis/adminApi'

export default function PopupImportProducts({ isOpen, onClose, fetchProducts }) {
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [selectedFile, setSelectedFile] = useState(null)
  const [importData, setImportData] = useState([])
  const [previewData, setPreviewData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [uploadStep, setUploadStep] = useState(1) // 1: Select file, 2: Preview, 3: Confirm

  useEffect(() => {
    setIsModalOpen(isOpen)
    if (!isOpen) {
      resetForm()
    }
  }, [isOpen])

  const resetForm = () => {
    setSelectedFile(null)
    setImportData([])
    setPreviewData([])
    setUploadStep(1)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    resetForm()
    onClose()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setSelectedFile(file)

    // Read the file
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const { result } = event.target
        const workbook = XLSX.read(result, { type: 'binary' })
        const worksheet = workbook.Sheets[workbook.SheetNames[0]]
        const jsonData = XLSX.utils.sheet_to_json(worksheet)

        // Validate the data format - basic check
        if (jsonData.length > 0 && validateDataFormat(jsonData[0])) {
          setImportData(jsonData)
          setPreviewData(jsonData.slice(0, 5)) // Show first 5 rows as preview
          setUploadStep(2)
        } else {
          toast.error('File không đúng định dạng. Vui lòng kiểm tra lại template.')
        }
      } catch (error) {
        console.error('Error parsing file:', error)
        toast.error('Có lỗi khi đọc file. Vui lòng thử lại.')
      }
    }
    reader.readAsBinaryString(file)
  }

  // Basic validation of required fields
  const validateDataFormat = (sample) => {
    const requiredFields = ['productName', 'price', 'desc', 'colors', 'sizes', 'stock', 'category']
    return requiredFields.every((field) => sample.hasOwnProperty(field))
  }

  const handleConfirmImport = async () => {
    setIsLoading(true)
    try {
      // Process data in batches to avoid overwhelming the server
      const batchSize = 10
      const batches = []

      for (let i = 0; i < importData.length; i += batchSize) {
        batches.push(importData.slice(i, i + batchSize))
      }

      let successCount = 0
      let errorCount = 0

      // Process each batch
      for (const batch of batches) {
        const promises = batch.map(async (product) => {
          try {
            // Transform data to match API requirements
            const formData = new FormData()

            // Basic fields
            formData.append('productName', product.productName)
            formData.append('price', product.price)
            formData.append('desc', product.desc)
            formData.append('stock', product.stock)
            formData.append('rating', 0)

            // Chuyển đổi từ tên danh mục sang ID
            let categoryID = ''
            switch (product.category.trim()) {
              case 'Áo':
                categoryID = '67eabfb752e95e072c0a14cc'
                break
              case 'Quần':
                categoryID = '67eba6c85ad5c520566e7be1'
                break
              case 'Váy':
                categoryID = '67eabff052e95e072c0a14cd'
                break
              default:
                // Mặc định nếu không tìm thấy danh mục phù hợp
                categoryID = '67eabfb752e95e072c0a14cc' // Mặc định là Áo
            }
            formData.append('categroryID', categoryID)

            // Handle arrays - split by comma if string
            const sizes =
              typeof product.sizes === 'string' ? product.sizes.split(',') : [product.sizes]
            sizes.forEach((size) => formData.append('sizes', size.trim()))

            const colors =
              typeof product.colors === 'string' ? product.colors.split(',') : [product.colors]
            colors.forEach((color) => formData.append('colors', color.trim()))

            // Handle images - if product has image URLs, fetch them
            if (product.productImage) {
              // If product has image URLs, fetch and use them
              const productImage =
                typeof product.productImage === 'string'
                  ? product.productImage.split(',')
                  : Array.isArray(product.productImage)
                    ? product.productImage
                    : []

              // Match image URLs with colors if possible, otherwise use what we have
              const promises = productImage.map(async (url) => {
                try {
                  const response = await fetch(url.trim())
                  const blob = await response.blob()
                  formData.append('productImage', blob, `image-${Date.now()}.png`)
                } catch (error) {
                  console.error('Error fetching image:', error)
                  // Fallback to placeholder if fetch fails
                  const placeholder = dataURItoBlob(
                    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
                  )
                  formData.append('productImage', placeholder, 'placeholder.png')
                }
              })

              await Promise.all(promises)
            } else {
              // Fallback to placeholders if no image URLs
              colors.forEach(() => {
                const blob = dataURItoBlob(
                  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
                )
                formData.append('productImage', blob, 'placeholder.png')
              })
            }

            // Send to API
            await AdminApi.addAProduct(formData)
            successCount++
          } catch (error) {
            console.error('Error importing product:', error)
            errorCount++
            return { error: true, product }
          }
        })

        await Promise.all(promises)
      }

      if (errorCount === 0) {
        toast.success(`Đã nhập thành công ${successCount} sản phẩm!`)
      } else {
        toast.warning(`Nhập ${successCount} sản phẩm thành công, ${errorCount} sản phẩm lỗi.`)
      }

      fetchProducts()
      handleClose()
    } catch (error) {
      console.error('Import error:', error)
      toast.error('Có lỗi xảy ra trong quá trình nhập sản phẩm.')
    } finally {
      setIsLoading(false)
    }
  }

  // Convert base64 to Blob for placeholder images
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1])
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    const ab = new ArrayBuffer(byteString.length)
    const ia = new Uint8Array(ab)

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }

    return new Blob([ab], { type: mimeString })
  }

  const handleDownloadTemplate = () => {
    // Create sample data
    const sampleData = [
      {
        productName: 'Áo Phông Basic',
        price: '299000',
        desc: 'Áo phông cổ tròn chất liệu cotton',
        colors: 'black,white',
        sizes: 'S,M,L',
        stock: '100',
        category: 'Áo', // Người dùng chỉ cần nhập tên danh mục
        productImage: 'https://example.com/image1.jpg,https://example.com/image2.jpg', // Chỉ cần nhập URL hình ảnh nếu có
      },
      {
        productName: 'Quần Jean Nam',
        price: '499000',
        desc: 'Quần Jean nam ống đứng',
        colors: 'blue,black',
        sizes: 'M,L,XL',
        stock: '75',
        category: 'Quần', // Người dùng chỉ cần nhập tên danh mục
        productImage: 'https://example.com/image1.jpg,https://example.com/image2.jpg', // Chỉ cần nhập URL hình ảnh nếu có
      },
      {
        productName: 'Váy Dáng Xòe',
        price: '399000',
        desc: 'Váy dáng xòe phong cách trẻ trung',
        colors: 'red,pink,white',
        sizes: 'S,M',
        stock: '50',
        category: 'Váy', // Người dùng chỉ cần nhập tên danh mục
        productImage: 'https://example.com/image1.jpg,https://example.com/image2.jpg', // Chỉ cần nhập URL hình ảnh nếu có
      },
    ]

    // Convert to worksheet
    const worksheet = XLSX.utils.json_to_sheet(sampleData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

    // Generate file and download
    XLSX.writeFile(workbook, 'product_import_template.xlsx')
  }

  return (
    <Modal open={isModalOpen} onClose={handleClose}>
      <Box
        sx={{
          maxHeight: '80vh',
          overflowY: 'auto',
          borderRadius: '10px',
        }}
        className='bg-white p-6 rounded-md shadow-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60vw]'
      >
        <h2 className='text-3xl font-bold text-center uppercase text-green-700 mb-5'>
          {uploadStep === 1
            ? 'Nhập Sản Phẩm Từ File'
            : uploadStep === 2
              ? 'Xem Trước Dữ Liệu'
              : 'Xác Nhận Nhập Dữ Liệu'}
        </h2>

        {uploadStep === 1 && (
          <div className='flex flex-col items-center gap-6'>
            <div className='text-center max-w-md'>
              <p className='mb-4'>
                Tải lên file Excel (.xlsx) hoặc CSV chứa thông tin sản phẩm để nhập vào hệ thống.
                Đảm bảo file của bạn đúng định dạng theo template mẫu.
              </p>
              <Button
                variant='outlined'
                color='primary'
                onClick={handleDownloadTemplate}
                className='mb-4'
              >
                Tải xuống template mẫu
              </Button>
            </div>

            <Paper
              elevation={0}
              className='border-2 border-dashed border-gray-300 rounded-lg p-8 text-center w-3/4'
            >
              <input
                type='file'
                accept='.xlsx,.xls,.csv'
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id='file-upload'
              />
              <label htmlFor='file-upload'>
                <Button
                  variant='contained'
                  component='span'
                  color='primary'
                  sx={{ padding: '10px 20px' }}
                >
                  Chọn file
                </Button>
              </label>
              <Typography variant='body1' sx={{ mt: 2 }}>
                {selectedFile ? selectedFile.name : 'Chưa chọn file nào'}
              </Typography>
            </Paper>

            <div className='mt-4 flex justify-center gap-4'>
              <Button variant='outlined' color='error' onClick={handleClose}>
                Hủy
              </Button>
            </div>
          </div>
        )}

        {uploadStep === 2 && (
          <div>
            <div className='mb-4'>
              <Typography variant='body1' gutterBottom>
                Xem trước {previewData.length} dòng đầu tiên trên tổng số {importData.length} sản
                phẩm:
              </Typography>
            </div>

            <TableContainer component={Paper} className='mb-6' sx={{ maxHeight: '40vh' }}>
              <Table stickyHeader aria-label='preview table' size='small'>
                <TableHead>
                  <TableRow>
                    {previewData.length > 0 &&
                      Object.keys(previewData[0]).map((header, index) => (
                        <TableCell key={index} align='center' sx={{ fontWeight: 'bold' }}>
                          {header}
                        </TableCell>
                      ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {previewData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {Object.values(row).map((cell, cellIndex) => (
                        <TableCell key={cellIndex} align='center'>
                          {String(cell)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box sx={{ bgcolor: '#f8f9fa', p: 2, borderRadius: 1, mb: 4 }}>
              <Typography variant='body2' color='text.secondary'>
                <strong>Lưu ý:</strong> Khi nhập sản phẩm từ file, các sản phẩm sẽ được thêm vào
                không có hình ảnh. Bạn cần cập nhật hình ảnh sản phẩm sau khi nhập.
              </Typography>
            </Box>

            <div className='flex justify-center gap-4'>
              <Button variant='outlined' color='error' onClick={() => setUploadStep(1)}>
                Quay lại
              </Button>
              <Button
                variant='contained'
                color='success'
                onClick={handleConfirmImport}
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={24} color='inherit' />
                ) : (
                  'Xác nhận nhập dữ liệu'
                )}
              </Button>
            </div>
          </div>
        )}
      </Box>
    </Modal>
  )
}
