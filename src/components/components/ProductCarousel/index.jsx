import PropTypes from 'prop-types'
import React, { memo } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import ProductCard from '../ProductCard'

const ProductCarousel = ({ products, dot }) => {
  const settings = {
    dots: dot,
    infinite: products.length > 3,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  console.log('====asd=sa=d===', products)
  return (
    <div>
      {/* {title && (
        <h2 className="text-black text-4xl font-semibold text-center mb-8 font-['Poppins'] tracking-tight">
          {title}
        </h2>
      )} */}
      <div className='mx-auto'>
        <Slider {...settings} className='w-full'>
          {products.map((product) => (
            <div key={product.id} className='px-2.5 box-border'>
              <ProductCard
                id={product.id}
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
    </div>
  )
}

ProductCarousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  title: PropTypes.string,
}

export default memo(ProductCarousel)
