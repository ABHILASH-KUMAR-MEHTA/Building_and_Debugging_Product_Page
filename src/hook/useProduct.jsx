'use client';
import useSWR from 'swr';
import { products } from '@/data/products';

// Async fetcher (simulate API)
const fetcher = async (id) => {
  return new Promise((resolve) => {
    const product = products.find((p) => p.id === id);
    setTimeout(() => resolve(product), 200); // simulate delay
  });
};

export default function useProduct(id) {
  const { data, error } = useSWR(id ? id : null, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 5 * 60 * 1000, // cache 5 minutes
  });

  return {
    product: data,
    isLoading: !data && !error,
    isError: error,
  };
}
