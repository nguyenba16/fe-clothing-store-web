import React from 'react'
import './styles.css'
import addcart from '../../../assets/icons/addcart.svg'
const ProductCard = ({ image, title, description, rating, price }) => {
  return (
    <div className='product-card'>
      <div className='product-image'>
        <img src={image} alt={title} />
      </div>
      <h3 className='product-title'>{title}</h3>
      <p className='product-description'>{description}</p>
      <div className='product-rating'>
        <span className='star-icon'>★</span>
        <span className='rating-number'>{rating}</span>
      </div>
      <div className='product-footer'>
        <div className='product-price'>{price}</div>
        <div className='product-actions'>
          <button className='add-to-cart-btn'>
            <img src={addcart} alt='Add to Cart' className='h-4' />
          </button>
          <button className='buy-now-btn'>Mua ngay</button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
