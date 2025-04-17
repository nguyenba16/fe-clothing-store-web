import React from 'react';
import addcart from '../../../assets/icons/addcart.svg';

const ProductCard = ({ image, title, description, rating, price }) => {
  return (
    <div className="border border-gray-300 bg-white p-4 rounded-lg w-full max-w-[300px] shadow-sm flex flex-col h-[600px]">
      {/* Phần hình ảnh với tỷ lệ cố định */}
      <div className="w-full h-[300px] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded absolute inset-0"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Phần nội dung với chiều cao cố định */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mt-3 mb-2 text-left line-clamp-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-3">{description}</p>
        <div className="flex items-center mb-3">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm text-gray-600">{rating}</span>
        </div>

        {/* Phần footer với giá và các nút */}
        <div className="flex justify-between items-start mt-auto">
          <div className="text-lg font-semibold text-red-600">{price}</div>
          <div className="flex flex-col items-end gap-2">
            <button className="border border-gray-300 p-2 rounded-full hover:bg-gray-200 active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:bg-gray-100 disabled:text-gray-400">
              <img src={addcart} alt="Add to Cart" className="h-4" />
            </button>
            <button className="text-button border border-button py-1.5 px-3 rounded-full text-xs hover:bg-button hover:text-white disabled:bg-gray-100 disabled:text-gray-400">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
