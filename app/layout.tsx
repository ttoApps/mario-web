import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MARIO-WEB',
  description: 'FC版スーパーマリオブラザーズのようなWebゲーム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="pixel-font">
        {children}
      </body>
    </html>
  )
}