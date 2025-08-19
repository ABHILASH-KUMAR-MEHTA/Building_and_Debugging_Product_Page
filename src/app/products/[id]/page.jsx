'use client';

import { useParams } from 'next/navigation';
import ProductDetails from '@/components/ProductDetails';
import useProduct from '../../../hook/useProduct';

export default function ProductPage() {
  const params = useParams(); // Get route params safely
  const { product, isLoading, isError } = useProduct(params.id);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found</p>;

  return (
    <div className='container mx-auto px-6 py-10'>
      <ProductDetails product={product} />
    </div>
  );
}
