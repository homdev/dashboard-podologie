'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} flex justify-center min-h-screen`}>
        <SessionProvider>
          <div className="w-full">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}