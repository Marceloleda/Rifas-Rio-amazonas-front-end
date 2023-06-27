import '../assets/styles/globals.css'
import '../assets/styles/reset.css'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Rifas Rio Amazonas',
  description: 'Cria rifas online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StyledComponentsRegistry>
        <body className={inter.className} 
        suppressHydrationWarning={true} >
          {children}
        </body>
      </StyledComponentsRegistry>
    </html>
  )
}
