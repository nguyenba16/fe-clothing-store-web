import React from 'react'
import './styles.css'

const ScrollingText = () => {
  // Create an array with 8 "Hot Deals" items
  const hotDealsArray = Array(8).fill('Hot Deals')

  return (
    <div className='scrolling-container'>
      <div className='scrolling-wrapper'>
        {/* First set of items */}
        <div className='scrolling-text'>
          {hotDealsArray.map((text, index) => (
            <div key={`first-${index}`} className='hot-deal-item'>
              {text}
            </div>
          ))}
        </div>

        {/* Duplicate set for seamless looping */}
        <div className='scrolling-text'>
          {hotDealsArray.map((text, index) => (
            <div key={`second-${index}`} className='hot-deal-item'>
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ScrollingText
