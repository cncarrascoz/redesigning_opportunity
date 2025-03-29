import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

// Initialize the Nunito font
const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Opportunity AI',
  description: 'A friendly guide to creating opportunities for your family',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-nunito">
        {children}
      </body>
    </html>
  )
}