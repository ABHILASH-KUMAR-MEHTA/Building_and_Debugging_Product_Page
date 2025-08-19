'use client';

import { useState, useContext, useEffect } from 'react';
import ProductDetails from '@/components/ProductDetails';
import RecentlyViewed from '@/components/RecentlyViewed';
import { CartContext } from '@/context/CartContext';

export default function ProductDetailsWrapper({ product }) {
  const { addToCart } = useContext(CartContext);

  // ✅ Default color should be the first variant’s color
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  
  // ✅ Compute available sizes dynamically based on selected color
  const availableSizesForColor =
    product.variants.find((v) => v.color === selectedColor)?.sizes || [];

  // ✅ Reset size whenever color changes
  const [selectedSize, setSelectedSize] = useState('');
  useEffect(() => {
    setSelectedSize('');
  }, [selectedColor]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select a color and size.');
      return;
    }
    addToCart(product, selectedColor, selectedSize);
  };

  return (
    <>
      <ProductDetails
        product={product}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        onColorSelect={setSelectedColor}
        onSizeSelect={setSelectedSize}
        onAddToCart={handleAddToCart}
        availableSizesForColor={availableSizesForColor}
      />
      {/* ✅ Pass current product to RecentlyViewed */}
      <RecentlyViewed currentProduct={product} />
    </>
  );
}
