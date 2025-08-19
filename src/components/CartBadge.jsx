'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function CartBadge() {
  const { cartCount } = useContext(CartContext);

  return (
    <div className='relative'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 7h13L17 13H7z'
        />
      </svg>
      {cartCount > 0 && (
        <span className='absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs'>
          {cartCount}
        </span>
      )}
    </div>
  );
}
