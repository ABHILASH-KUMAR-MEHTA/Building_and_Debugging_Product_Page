'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentlyViewed() {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setRecentProducts(stored);
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Recently Viewed Products</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        {recentProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
          >
            <div className='border p-4 rounded-lg hover:shadow-lg cursor-pointer'>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={600}
                height={200}
                className='rounded object-cover'
                 unoptimized   //
              />
              <h3 className='mt-2 font-semibold'>{product.name}</h3>
              <p className='text-blue-600 font-bold'>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
