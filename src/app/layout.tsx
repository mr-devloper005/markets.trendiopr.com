import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/lib/auth-context'
import { buildSiteMetadata } from '@/lib/seo'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getGoogleFontsHref, getSiteFontVariables } from '@/config/site.font'

export async function generateMetadata(): Promise<Metadata> {
  return buildSiteMetadata()
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { recipe, brandPack } = getFactoryState()
  const googleFontsHref = getGoogleFontsHref()
  const siteFontVariables = getSiteFontVariables()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {googleFontsHref ? <link rel="stylesheet" href={googleFontsHref} /> : null}
        <link rel="icon" href="/favicon.ico?v=20260423" sizes="any" />
        <link rel="icon" href="/favicon.png?v=20260423" type="image/png" />
      </head>
      <body
        data-site-shell={recipe.homeLayout}
        data-motion-pack={recipe.motionPack}
        className={`${brandPack.bodyClassName} ${brandPack.fontClassName} ${brandPack.paletteClassName}`}
        style={siteFontVariables}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
