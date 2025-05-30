import React, { use, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import NoAuthApi from '../../apis/noAuthApi'
import cartApi from '../../apis/cartApi'
import addcart from '../../assets/icons/addcart.svg'
import photo4 from '../../assets/images/home/san pham.png'
import ProductCarousel from '../../components/components/ProductCarousel'
import StarRating from './components/StarRating'
import { set } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../../stores/useAuth'
// Sample product images - replace with your actual images
const productImagesSample = [
  '/src/assets/images/DetailProduct/vay1.avif',
  '/src/assets/images/DetailProduct/vay2.avif',
  '/src/assets/images/DetailProduct/vay3.avif',
  '/src/assets/images/DetailProduct/vay4.avif',
  '/src/assets/images/DetailProduct/vay5.avif',
  '/src/assets/images/DetailProduct/vay6.avif',
  '/src/assets/images/DetailProduct/vay7.avif',
]
const des =
  'Lorem ipsum dolor sit amet consectetur. Purus amet vulputate venenatis in adipiscing. Leo eu egestas et arcu in sapien neque quisque. Eleifend vitae tellus lacus venenatis in. Nunc donec ac vitae vitae sed ipsum habitasse. Lorem ipsum dolor sit amet consectetur. Purus amet vulputate venenatis in adipiscing. Leo eu egestas et arcu in sapien neque quisque. Eleifend vitae tellus lacus venenatis in. Nunc donec ac vitae vitae sed ipsum habitasse.'

// Transform API response data to application's product format
const transformAPIProducts = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return []

  return apiData.map((product) => ({
    id: product.id,
    // Use the first image URL from productImage array, or fallback to default image
    image:
      product.productImage && product.productImage.length > 0
        ? product.productImage[0].url
        : photo4,
    title:
      product.productName?.substring(0, 20) + (product.productName?.length > 20 ? '...' : '') ||
      'Không có tên sản phẩm',
    description:
      product.desc?.substring(0, 100) + (product.desc?.length > 100 ? '...' : '') ||
      'Không có mô tả',
    // Format price with thousand separators and Vietnamese currency
    price: new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    })
      .format(product.price)
      .replace(/\s/g, ''),
    category: product.categrory?.id || '',
    // Add additional useful information
    colors: product.colors || [],
    rating: product.rating || 0,
  }))
}

const sampleReviews = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    rating: 5,
    date: '12/03/2025',
    comment:
      'Sản phẩm chất lượng tuyệt vời, vải mềm và thoáng mát. Đúng như mô tả và giao hàng nhanh.',
    helpful: 12,
  },
  {
    id: 2,
    name: 'Trần Thị B',
    rating: 2,
    date: '05/03/2025',
    comment:
      'Tôi rất hài lòng với chất lượng sản phẩm. Tuy nhiên kích thước hơi rộng một chút so với bảng size.',
    helpful: 8,
  },
  {
    id: 3,
    name: 'Lê Hoàng C',
    rating: 3,
    date: '28/02/2025',
    comment: 'Chất liệu vải tốt nhưng màu sắc hơi khác so với hình ảnh trên website.',
    helpful: 5,
  },
]

const colorsSample = [
  { name: 'black', hex: '#000000' },
  { name: 'white', hex: '#FFFFFF' },
  { name: 'blue', hex: '#1E90FF' },
  { name: 'red', hex: '#FF4500' },
  { name: 'green', hex: '#228B22' },
]
const sizeSample = ['XS', 'S', 'M', 'L', 'XL']

export default function DetailProduct() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [description, setDescription] = useState(des)
  const [reviews, setReviews] = useState(sampleReviews)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState('')
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState('áo')
  const [productList, setProductList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState(0)
  const [productImages, setProductImages] = useState(productImagesSample)
  const [colors, setColors] = useState(colorsSample)
  const [sizes, setSizes] = useState(sizeSample)
  const { user } = useAuth()
  const isAuthenticated = !!user

  const { id } = useParams()

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  const updateInfoProduct = (res) => {
    setDescription(res.data.desc)
    setProductName(res.data.productName)
    setPrice(
      new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
      })
        .format(res.data.price)
        .replace(/\s/g, ''),
    )
    // setPrice(res.data.price)
    setProductImages(res.data.productImage.map((item) => item.url))

    //set colors name and hex
    const colorNames = res.data.colors
    console.log('colorNames', colorNames)
    const colorHex = colorsSample.filter((item) => colorNames.includes(item.name))
    setColors(colorHex)
    setSizes(res.data.sizes)
    setCategoryFilter(res.data.categrory.id)
  }
  //fetch product list by catergories
  const fetchProducts = async () => {
    setIsLoading(true)
    try {
      const res = await NoAuthApi.getProductByCategory(categoryFilter)
      setProductList(transformAPIProducts(res.data))
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      console.log('Có lỗi xảy ra', error)
    }
  }
  const fetchProductDetail = async () => {
    try {
      setIsLoading(true)
      const res = await NoAuthApi.getProductById(id)
      console.log('product detail', res)
      updateInfoProduct(res)
      setIsLoading(false)
      return res
    } catch (error) {
      setIsLoading(false)
      console.log('Có lỗi xảy ra', error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [categoryFilter])
  // const sampleProducts = transformAPIProducts(productList);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    fetchProductDetail()
  }, [id])

  // Handle form submission
  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (reviewRating === 0 || reviewComment.trim() === '') {
      alert('Vui lòng chọn đánh giá và nhập nội dung bình luận')
      return
    }

    const newReview = {
      id: reviews.length + 1,
      name: 'Khách hàng mới',
      rating: reviewRating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: reviewComment,
      helpful: 0,
    }

    setReviews([newReview, ...reviews])
    setReviewRating(0)
    setReviewComment('')
    setShowReviewForm(false)
  }
  // Handle color selection
  const handleColorSelect = (index) => {
    setSelectedColor(index)
  }
  // Handle size selection
  const handleSizeSelect = (index) => {
    setSelectedSize(index)
  }
  // Handle image selection
  const handleImageSelect = (index) => {
    setSelectedImage(index)
  }
  // Handle add to cart
  const handleAddToCart = async () => {
    // Validate color and size selection
    if (selectedColor === null) {
      toast.warning('Vui lòng chọn màu sắc')
      return
    }
    if (selectedSize === null) {
      toast.warning('Vui lòng chọn kích thước')
      return
    }

    if (!isAuthenticated) {
      toast.warning('Vui lòng đăng nhập để thêm vào giỏ hàng')
      return
    }

    try {
      const productId = id
      const color = colors[selectedColor].name
      const size = sizes[selectedSize]
      const quantity = 1

      await cartApi.addItemToCart(productId, size, color, quantity)
      // Dispatch cart change event
      window.dispatchEvent(new Event('cartChanged'))
      toast.success('Đã thêm vào giỏ hàng')
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error('Không thể thêm vào giỏ hàng')
    }
  }
  // Handle buy now
  const handleBuyNow = () => {
    alert('Mua ngay')
  }
  return (
    <div>
      <div className='max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-8 font-text'>
        {/* Left Column - Product Images */}
        <div className='w-full md:w-1/2 flex flex-col-reverse md:flex-row gap-5'>
          {/* Thumbnails */}
          <div className='flex flex-row md:flex-col justify-center gap-3'>
            {productImages.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 border cursor-pointer overflow-hidden transition-all duration-200 ${
                  selectedImage === index
                    ? 'border-purple-600 border-2'
                    : 'border-gray-200 opacity-30'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className='flex-1 flex justify-center items-center overflow-hidden'>
            <img
              src={productImages[selectedImage]}
              className='max-w-full max-h-[650px] object-contain'
            />
          </div>
        </div>

        {/* Right Column - Product Information */}
        <div className='w-full md:w-1/2 flex flex-col gap-6 p-2 md:p-10 border rounded-lg'>
          <h1 className='text-xl md:text-2xl font-bold uppercase tracking-wide'>{productName}</h1>
          <div className='text-xl md:text-2xl font-semibold text-gray-800'>{price}</div>

          <div className='text-base text-gray-600 leading-relaxed'>
            <p>Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.</p>
          </div>

          <div className='flex flex-col gap-6'>
            {/* Color Selection */}
            <div>
              <h3 className='text-base font-semibold mb-3'>Color</h3>
              <div className='flex gap-3'>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-7 h-7 rounded border cursor-pointer transition-all duration-200 ${
                      selectedColor === index
                        ? 'border-pink-300 border-2 scale-105'
                        : 'border-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(index)}
                    title={color.name}
                  ></div>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className='text-base font-semibold mb-3'>Size</h3>
              <div className='flex gap-3'>
                {sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`w-10 h-10 flex items-center justify-center border cursor-pointer transition-all duration-200 
                                        ${
                                          selectedSize === index
                                            ? 'border-purple-600 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-600 hover:bg-purple-50'
                                        }`}
                    onClick={() => setSelectedSize(index)}
                  >
                    {size}
                  </div>
                ))}
              </div>
              <div className='mt-3 text-sm'>
                <a href='#' className='text-purple-700 hover:underline'>
                  Find your size
                </a>{' '}
                |{' '}
                <a href='#' className='text-purple-700 hover:underline'>
                  Measurement guide
                </a>
              </div>
            </div>
          </div>

          {/* Product Actions */}
          <div className='flex gap-4 mt-4'>
            <button
              className='w-24 h-12 border border-gray-200 rounded-3xl bg-white flex items-center justify-center transition-all duration-200 hover:border-purple-600 hover:bg-purple-50'
              onClick={handleAddToCart}
            >
              <img src={addcart} alt='Add to Cart' className='w-6 h-6' />
            </button>
            <button
              className='flex-1 h-12 border rounded-3xl text-pink font-semibold text-sm tracking-wide transition-all duration-200 hover:bg-pink-600 hover:text-white'
              onClick={handleBuyNow}
            >
              MUA NGAY
            </button>
          </div>
        </div>
      </div>

      {/* Mô tả sản phẩm */}
      <div className='max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-8 font-text'>
        <div className='text-xl md:text-2xl font-bold uppercase tracking-wide underline text-third'>
          MÔ TẢ SẢN PHẨM
        </div>
        <div>{description}</div>
      </div>

      {/* Đánh giá của người mua */}
      <div className='max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-8 font-text'>
        <div className='text-xl md:text-2xl font-bold uppercase tracking-wide underline text-third'>
          ĐÁNH GIÁ CỦA NGƯỜI MUA
        </div>

        {/* Rating summary */}
        <div className='flex flex-col md:flex-row gap-6'>
          <div className='w-full md:w-1/3 bg-gray-50 p-6 rounded-lg flex flex-col items-center justify-center transition-all duration-200'>
            <div className='text-4xl font-bold text-gray-800'>{averageRating.toFixed(1)}/5</div>
            <div className='my-2'>
              <StarRating rating={averageRating} />
            </div>
            <div className='text-gray-500 text-sm mt-1'>Dựa trên {reviews.length} đánh giá</div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className='mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
            >
              Viết đánh giá
            </button>
          </div>

          {/* Review form */}
          {showReviewForm && (
            <div className='w-full md:w-2/3 bg-white p-6 border rounded-lg'>
              <h3 className='text-lg font-semibold mb-4'>Chia sẻ đánh giá của bạn</h3>
              <form onSubmit={handleSubmitReview}>
                <div className='mb-4'>
                  <label className='block mb-2'>Xếp hạng</label>
                  <div className='flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => setReviewRating(star)}
                        className='mr-1'
                      >
                        <svg
                          className={`w-8 h-8 ${star <= reviewRating ? 'text-yellow-400' : 'text-gray-300'} 
                                                    cursor-pointer hover:text-yellow-400 transition-colors`}
                          fill='currentColor'
                          viewBox='0 0 20 20'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>
                <div className='mb-4'>
                  <label htmlFor='reviewComment' className='block mb-2'>
                    Nội dung đánh giá
                  </label>
                  <textarea
                    id='reviewComment'
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className='w-full border rounded-md p-2 h-32'
                    placeholder='Chia sẻ trải nghiệm của bạn về sản phẩm này...'
                  ></textarea>
                </div>
                <div className='flex justify-end gap-2'>
                  <button
                    type='button'
                    onClick={() => setShowReviewForm(false)}
                    className='px-4 py-2 border rounded-md hover:bg-gray-50'
                  >
                    Hủy
                  </button>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors'
                  >
                    Gửi đánh giá
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Reviews list */}
        <div className='mt-6'>
          {reviews.length > 0 ? (
            <div className='space-y-6'>
              {reviews.map((review) => (
                <div key={review.id} className='border-b pb-6'>
                  <div className='flex justify-between'>
                    <div className='font-semibold'>{review.name}</div>
                    <div className='text-gray-500 text-sm'>{review.date}</div>
                  </div>
                  <div className='my-1'>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className='mt-2 text-gray-700'>{review.comment}</p>
                  <div className='mt-3 flex items-center'>
                    <button className='text-sm text-gray-500 flex items-center hover:text-gray-700'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-4 w-4 mr-1'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5'
                        />
                      </svg>
                      Hữu ích ({review.helpful})
                    </button>
                    <button className='ml-4 text-sm text-gray-500 hover:text-gray-700'>
                      Báo cáo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-8 text-gray-500'>
              Chưa có đánh giá nào cho sản phẩm này
            </div>
          )}
        </div>
      </div>

      {/* Sản phẩm cùng loại */}
      <div className='max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-8 font-text'>
        <div className='text-xl md:text-2xl font-bold uppercase tracking-wide underline text-third'>
          SẢN PHẨM CÙNG LOẠI
        </div>
        <ProductCarousel products={productList} dot={false} />
      </div>
    </div>
  )
}
