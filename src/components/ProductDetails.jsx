'use client';
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import RecentlyViewed from './RecentlyViewed';

export default function ProductDetails({ product }) {
  const { addToCart } = useContext(CartContext);
  const [selectedColor, setSelectedColor] = useState(
    product.variants[0]?.color || ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.sizes[0] || ''
  );
  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor
  );

  // Track Recently Viewed
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const filtered = stored.filter((p) => p.id !== product.id);
    const newRecent = [product, ...filtered].slice(0, 3);
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecent));
  }, [product]);

  const handleAddToCart = () => addToCart(product, selectedColor, selectedSize);

  return (
    <div>
      <div className='grid md:grid-cols-2 gap-8'>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={400}
          className='w-full rounded-lg shadow'
          unoptimized
        />

        <div>
          <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
          <p className='text-gray-700 mb-4'>{product.description}</p>
          <p className='text-2xl font-semibold text-blue-600 mb-6'>
            ${product.price}
          </p>

          <ColorSelector
            variants={product.variants}
            selectedColor={selectedColor}
            onColorSelect={(color) => {
              setSelectedColor(color);
              const newVariant = product.variants.find(
                (v) => v.color === color
              );
              if (newVariant) setSelectedSize(newVariant.sizes[0]);
            }}
          />

          <div className='mt-4'>
            <SizeSelector
              availableSizes={currentVariant?.sizes || []}
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />
          </div>

          <button
            onClick={handleAddToCart}
            className='mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700'
          >
            Add to Cart
          </button>
        </div>
      </div>

      <RecentlyViewed />
    </div>
  );
}
