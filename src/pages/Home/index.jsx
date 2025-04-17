import { Tabs } from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import photo1 from '../../assets/images/home/1.jpeg'
import photo2 from '../../assets/images/home/2.avif'
import photo3 from '../../assets/images/home/3.avif'
import photo4 from '../../assets/images/home/san pham.png'
import ProductCard from '../../components/components/ProductCard'
import ProductCarousel from '../../components/components/ProductCarousel'
import Carousel from './components/Carousel'
import ScrollingText from './components/ScrollingText'

import './styles.css'

export default function Home() {
  const slides = [photo1, photo2, photo3]
  const [activeCategory, setActiveCategory] = useState('1')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Categories data
  const categories = [
    {
      key: '1',
      label: 'QUẦN',
      icon: '👖',
    },
    {
      key: '2',
      label: 'ÁO',
      icon: '👕',
    },
    {
      key: '3',
      label: 'ĐỒ LÓT',
      icon: '🧦',
    },
    {
      key: '4',
      label: 'ÁO KHOÁC',
      icon: '🧥',
    },
    {
      key: '5',
      label: 'Phụ kiện',
      icon: '👜',
    },
  ]

  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      image: photo4,
      title: 'Áo Thun Nam Basic',
      description: 'Áo thun nam chất liệu cotton cao cấp, thoáng mát',
      rating: 4.5,
      price: '299.000₫',
      category: '1',
      badge: 'BÁN CHẠY',
      discount: '10%',
    },
    {
      id: 2,
      image: photo4,
      title: 'Quần Jeans Nữ',
      description: 'Quần jeans nữ dáng ôm, co giãn tốt',
      rating: 4.7,
      price: '459.000₫',
      category: '2',
    },
    {
      id: 3,
      image: photo4,
      title: 'Áo Khoác Dù Unisex',
      description: 'Áo khoác dù chống nắng, chống gió, nhẹ và thoáng khí',
      rating: 4.3,
      price: '399.000₫',
      category: '3',
    },
    {
      id: 4,
      image: photo4,
      title: 'Áo Polo Nam',
      description: 'Áo polo nam thiết kế hiện đại, chất liệu cao cấp',
      rating: 4.7,
      price: '459.000₫',
      category: '1',
    },
    {
      id: 5,
      image: photo4,
      title: 'Váy Liền Nữ',
      description: 'Váy liền nữ phong cách thời trang, trẻ trung',
      rating: 4.7,
      price: '559.000₫',
      category: '2',
    },
    {
      id: 6,
      image: photo4,
      title: 'Áo Khoác Bomber',
      description: 'Áo khoác bomber unisex phong cách thể thao',
      rating: 4.6,
      price: '699.000₫',
      category: '3',
    },
    {
      id: 7,
      image: photo4,
      title: 'Áo Thun Trẻ Em',
      description: 'Áo thun trẻ em in họa tiết ngộ nghĩnh',
      rating: 4.8,
      price: '199.000₫',
      category: '4',
    },
    {
      id: 8,
      image: photo4,
      title: 'Mũ Bucket',
      description: 'Mũ bucket thời trang, phong cách cá tính',
      rating: 4.5,
      price: '159.000₫',
      category: '5',
    },
    {
      id: 9,
      image: photo4,
      title: 'Dây Chuyền',
      description: 'Dây chuyền thời trang, thiết kế tinh tế',
      rating: 4.7,
      price: '259.000₫',
      category: '5',
    },
  ]

  const handleCategoryChange = (key) => {
    setActiveCategory(key)
  }

  // Get products by category
  const getProductsByCategory = (categoryKey) => {
    return sampleProducts.filter((product) => product.category === categoryKey)
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 ">
      {/* Hero Section with Carousel */}
      <div className="relative ">
        <Carousel slides={slides} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-center p-6 rounded-lg bg-black/50 backdrop-blur-sm max-w-md"
          >
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">SUMMER COLLECTION</h1>
            <p className="text-gray-100 mb-6">Khám phá xu hướng thời trang mới nhất</p>
            <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition duration-300 transform hover:scale-105">
              MUA NGAY
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scrolling Text with Enhanced Style */}
      <div className="py-6 bg-black text-white overflow-hidden">
        <ScrollingText />
      </div>

      {/* content section */}
      <div className='px-4 md:px-9'>
        {/* Flash Sale Section */}
        <div className="py-16 px-4 md:px-10">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUp}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-2">
              <span className="text-red-600">FLASH</span> SALE
            </h2>
            <div className="w-24 h-1 bg-red-500 mx-auto"></div>
          </motion.div>
          <ProductCarousel products={sampleProducts} title="" />
        </div>

        {/* Categories Section */}
        <div className="py-16 px-4 md:px-8 bg-gray-50">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            DANH MỤC <span className="text-blue-600">SẢN PHẨM</span>
          </motion.h2>

          <div className="categories-tabs">
            <Tabs
              items={categories.map(cat => ({
                key: cat.key,
                label: (
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="text-xl">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </div>
                )
              }))}
              onChange={handleCategoryChange}
              activeKey={activeCategory}
              centered
              size="large"
              className="custom-tabs"
            />

            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="category-products"
            >
              {getProductsByCategory(activeCategory).length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {getProductsByCategory(activeCategory).map((product) => (
                    <motion.div key={product.id} variants={fadeInUp}>
                      <ProductCard
                        image={product.image}
                        title={product.title}
                        description={product.description}
                        rating={product.rating}
                        price={product.price}
                        badge={product.badge}
                        discount={product.discount}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 12H4M8 16l-4-4 4-4M16 16l4-4-4-4" />
                  </svg>
                  <p className="text-xl">Không có sản phẩm trong danh mục này</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Featured Collections */}
        <div className="py-16 px-4 md:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-3xl md:text-5xl font-bold text-center mb-4"
          >
            BỘ SƯU TẬP <span className="text-indigo-600">NỔI BẬT</span>
          </motion.h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Khám phá bộ sưu tập mới nhất của chúng tôi với các thiết kế độc quyền và chất lượng cao cấp
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden group"
            >
              <img src={photo1} alt="Collection" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-3xl font-bold mb-4">BST Thu Đông</h3>
                <button className="bg-white text-black px-5 py-2 rounded-full">Xem ngay</button>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden group"
            >
              <img src={photo2} alt="Collection" className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-3xl font-bold mb-4">BST Thời Trang Trẻ</h3>
                <button className="bg-white text-black px-5 py-2 rounded-full">Xem ngay</button>
              </div>
            </motion.div>
          </div>

          {/* All Products Section */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            TẤT CẢ <span className="text-emerald-600">SẢN PHẨM</span>
          </motion.h2>

          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={stagger}
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12"
          >
            {sampleProducts.map((product) => (
              <motion.div key={product.id} variants={fadeInUp}>
                <ProductCard
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  rating={product.rating}
                  price={product.price}
                  badge={product.badge}
                  discount={product.discount}
                />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <button className="inline-flex items-center bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300">
              Xem thêm sản phẩm
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

        {/* Newsletter Section */}
        <div className="py-16 px-4 md:px-8 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-6">Đăng ký nhận thông tin</h3>
            <p className="text-gray-600 text-center mb-8">
              Hãy đăng ký để nhận thông tin về các sản phẩm mới, khuyến mãi hấp dẫn và các sự kiện đặc biệt
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-300">
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}
