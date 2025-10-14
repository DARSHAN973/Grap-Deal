'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import WaveBackground from '../components/ui/WaveBackground'
import InitialLoader from '../components/ui/InitialLoader'
import { UserProvider } from '../components/providers/UserProvider'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          <InitialLoader />
          {!isAdminRoute && <WaveBackground />}
          {!isAdminRoute && <Header />}
          <main className={`min-h-screen relative ${!isAdminRoute ? 'z-10' : ''}`}>
            {children}
          </main>
          {!isAdminRoute && <Footer />}
        </UserProvider>
      </body>
    </html>
  )
}