import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
