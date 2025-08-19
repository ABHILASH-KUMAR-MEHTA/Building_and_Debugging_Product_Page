'use client';
import { useContext } from 'react';
import Image from 'next/image';
import { CartContext } from '@/context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    if (!product?.variants?.length) {
      alert('No variants available for this product.');
      return;
    }
    const defaultColor = product.variants[0]?.color || 'Default';
    const defaultSize = product.variants[0]?.sizes?.[0] || 'One Size';
    addToCart(product, defaultColor, defaultSize);
  };

  const handleView = () => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    const filtered = stored.filter((p) => p.id !== product.id);
    const newRecent = [product, ...filtered].slice(0, 3);
    localStorage.setItem('recentlyViewed', JSON.stringify(newRecent));
    window.location.href = `/products/${product.id}`;
  };

  return (
    <div className='bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 flex flex-col'>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={650}
        height={224}
        className='rounded-xl mb-4 object-cover'
        unoptimized
      />
      <h2 className='text-lg font-bold mb-1'>{product.name}</h2>
      <p className='text-gray-600 text-sm mb-2 line-clamp-2'>
        {product.description}
      </p>
      <p className='text-blue-600 font-semibold text-lg mb-4'>
        ${product.price}
      </p>
      <div className='mt-auto flex gap-2'>
        <button
          onClick={handleView}
          className='flex-1 border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition'
        >
          View
        </button>
        <button
          onClick={handleAddToCart}
          className='flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
