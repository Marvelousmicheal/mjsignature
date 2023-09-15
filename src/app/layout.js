import { GlobalContextProvider } from '@/context/context'
import './globals.css'
import { Inter } from 'next/font/google'

import Navbar from '@/components/Navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mjsignature-shop',
  description: 'The Best Body Supplument For You',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Navbar/>
          <main className="flex min-h-screen flex-col mt-[75px]">
{children}
          </main>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
