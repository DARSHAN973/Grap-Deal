import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import WaveBackground from '../components/ui/WaveBackground'
import InitialLoader from '../components/ui/InitialLoader'
import { UserProvider } from '../components/providers/UserProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Grap Deal Studio — Cinematic Marketplace Experiences',
  description: 'Design cinematic commerce drops, trending rails, and product spotlights in minutes.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <UserProvider>
          <InitialLoader />
          <WaveBackground />
          <Header />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}