import { ProvidersWrapper } from '@/providers'

export const metadata = {
  title: 'RankTT',
  description: 'A maior plataforma de competições de tênis de mesa do Brasil'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
      </body>
    </html>
  )
}
