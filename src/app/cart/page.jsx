'use client';
import { useContext } from 'react';
import { CartContext } from '@/context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  if (cartItems.length === 0) return <p className="p-6 text-center">Your cart is empty.</p>;

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {cartItems.map(item => (
          <div key={`${item.id}-${item.color}-${item.size}`} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">Color: {item.color}, Size: {item.size}</p>
                <p className="text-blue-600 font-bold">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="number" min={1} value={item.quantity} onChange={e => updateQuantity(item.id, item.color, item.size, parseInt(e.target.value))} className="w-16 p-1 border rounded"/>
              <button onClick={() => removeFromCart(item.id, item.color, item.size)} className="text-red-500 font-semibold">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Cart</button>
      </div>
    </div>
  );
}
