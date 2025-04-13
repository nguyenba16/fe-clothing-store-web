import React from 'react';
import photo1 from '../../assets/images/1.jpeg';
import photo2 from '../../assets/images/2.avif';
import photo3 from '../../assets/images/3.avif';
import photo4 from '../../assets/images/san pham.png';
import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';
import ProductCarousel from '../../components/ProductCarousel';
import ScrollingText from '../../components/ScrollingText';
import { Button, Checkbox, Divider, Tabs } from 'antd';

import './styles.css';

export default function Home() {
  const slides = [photo1, photo2, photo3];
  const items = Array.from({ length: 3 }).map((_, i) => {
    const id = String(i + 1);
    return {
      label: `Tab ${id}`,
      key: id,
      children: `Content of tab ${id}`,
    };
  });
  // Sample product data
  const sampleProducts = [
    {
      id: 1,
      image: photo4,
      title: "Áo Thun Nam Basic",
      description: "Áo thun nam chất liệu cotton cao cấp, thoáng mát",
      rating: 4.5,
      price: "299.000₫"
    },
    {
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },
    {
      id: 3,
      image: photo4,
      title: "Áo Khoác Dù Unisex",
      description: "Áo khoác dù chống nắng, chống gió, nhẹ và thoáng khí",
      rating: 4.3,
      price: "399.000₫"
    },
    {
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },
    {
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },{
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },
    {
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },{
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },{
      id: 2,
      image: photo4,
      title: "Quần Jeans Nữ",
      description: "Quần jeans nữ dáng ôm, co giãn tốt",
      rating: 4.7,
      price: "459.000₫"
    },
  ];
  
  return (
    <div className="home-container">
      <Carousel slides={slides} />
      <div style={{ height: '30px' }}></div>
      <ScrollingText />
      <div style={{ height: '30px' }}></div>
      
      {/* Product Carousel Section */}
      <ProductCarousel
        products={sampleProducts}
        title="FLASH SALE"
      />
      
      <div style={{ height: '50px' }}></div>
      
      <div className="featured-products">
        <h2 className="section-title">ALL PRODUCTS</h2>
        <div className="products-grid">
          {sampleProducts.map(product => (
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
  );
}
