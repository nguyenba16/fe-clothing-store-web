import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ProductCard from '../ProductCard'
import './styles.css'

const ProductCarousel = ({ products, title }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  }

  return (
    <div className='product-carousel-container'>
      {title && <h2 className='carousel-title'>{title}</h2>}
      <Slider {...settings} className='product-slider'>
        {products.map((product) => (
          <div key={product.id} className='carousel-slide'>
            <ProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              rating={product.rating}
              price={product.price}
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ProductCarousel
