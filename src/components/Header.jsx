'use client';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function Header() {
  const { cartCount } = useContext(CartContext);

  return (
    <header className='flex justify-between items-center px-6 py-4 border-b shadow-sm bg-white'>
      <Link
        href='/'
        className='text-xl font-bold text-blue-600'
      >
        MyShop
      </Link>
      <nav className='flex items-center space-x-6'>
        <Link
          href='/products'
          className='hover:text-blue-500'
        >
          Products
        </Link>
        <Link
          href='/cart'
          className='relative hover:text-blue-500'
        >
          Cart
          {cartCount > 0 && (
            <span className='absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
