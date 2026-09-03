import './globals.css';
import { ThemeProvider } from 'next-themes';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { DEFAULT_SEO } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000"
  ),

  title: DEFAULT_SEO.title,

  description: DEFAULT_SEO.description,

  keywords: [
    "online tools",
    "developer tools",
    "JSON formatter",
    "JWT decoder",
    "QR code generator",
    "SaaS utilities",
  ],

  authors: [
    {
      name: "ToolVerse Team",
    },
  ],

  openGraph: DEFAULT_SEO.openGraph,

  twitter: DEFAULT_SEO.twitter,
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0d14' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-surface-dark text-slate-900 dark:text-slate-100 antialiased selection:bg-brand-500 selection:text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex flex-col min-h-screen">
            {/* Background Glow Accents */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
              <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-500/10 dark:bg-brand-600/15 rounded-full blur-3xl" />
              <div className="absolute top-1/3 -right-40 w-96 h-96 bg-accent-cyan/10 dark:bg-accent-cyan/10 rounded-full blur-3xl" />
              <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-accent-violet/10 dark:bg-accent-violet/10 rounded-full blur-3xl" />
            </div>

            <Navbar />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
