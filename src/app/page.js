import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  return (
    <div className='min-h-screen flex flex-col'>
      <main className='flex-grow container mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Welcome to MyStore</h1>

        {/* Product Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
