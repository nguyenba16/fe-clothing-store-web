import { Tabs } from 'antd'
import React, { useState } from 'react'
import photo1 from '../../assets/images/1.jpeg'
import photo2 from '../../assets/images/2.avif'
import photo3 from '../../assets/images/3.avif'
import photo4 from '../../assets/images/san pham.png'
import Carousel from '../../components/Carousel'
import ProductCard from '../../components/ProductCard'
import ProductCarousel from '../../components/ProductCarousel'
import ScrollingText from '../../components/ScrollingText'

import './styles.css'

export default function Home() {
  const slides = [photo1, photo2, photo3]
  const [activeCategory, setActiveCategory] = useState('1')

  // Categories data
  const categories = [
    {
      key: '1',
      label: 'QUẦN',
    },
    {
      key: '2',
      label: 'ÁO',
    },
    {
      key: '3',
      label: 'ĐỒ LÓT',
    },
    {
      key: '4',
      label: 'ÁO KHOÁC',
    },
    {
      key: '5',
      label: 'Phụ kiện',
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

  return (
    <div className='home-container'>
      <Carousel slides={slides} />
      <div style={{ height: '30px' }}></div>
      <ScrollingText />
      <div style={{ height: '30px' }}></div>

      {/* Product Carousel Section */}
      <ProductCarousel products={sampleProducts} title='FLASH SALE' />

      <div style={{ height: '50px' }}></div>

      {/* Categories Section */}
      <div className='categories-section'>
        <h2 className='section-title'>CATEGORIES</h2>
        <div className='categories-tabs'>
          <Tabs
            items={categories}
            onChange={handleCategoryChange}
            activeKey={activeCategory}
            centered
            size='large'
          />
          <div className='category-products'>
            <div className='products-grid'>
              {getProductsByCategory(activeCategory).map((product) => (
                <ProductCard
                  key={product.id}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  rating={product.rating}
                  price={product.price}
                />
              ))}
            </div>
            {getProductsByCategory(activeCategory).length === 0 && (
              <div className='no-products-message'>
                <p>Không có sản phẩm trong danh mục này</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={{ height: '50px' }}></div>

      <div className='featured-products'>
        <h2 className='section-title'>ALL PRODUCTS</h2>
        <div className='products-grid'>
          {sampleProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              rating={product.rating}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
