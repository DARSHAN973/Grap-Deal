import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'EcoShop - Modern E-commerce Store',
  description: 'Your one-stop destination for quality products',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}