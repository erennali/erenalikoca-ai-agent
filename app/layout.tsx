import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/language-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Eren Ali Koca - iOS Developer',
  description: 'iOS Developer & Computer Engineer. AI-powered assistant to help you learn about my skills, projects, and experience. Swift, Flutter, ASP.NET Core specialist.',
  keywords: ['Eren Ali Koca', 'iOS Developer', 'hire iOS developer', 'Swift developer', 'Flutter', 'Computer Engineer', 'mobile developer', 'recruitment'],
  authors: [{ name: 'Eren Ali Koca' }],
  openGraph: {
    title: 'Eren Ali Koca - iOS Developer & Computer Engineer',
    description: 'Chat with AI assistant to learn about my iOS & mobile development skills, view projects, and download CV',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
