import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Eduleb - Education Platform',
  description:
    'Smart Study Where Knowledge Meets the Web - Online education platform with quality courses',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="antialiased">
        <Providers>
          <div>{children}</div>
        </Providers>
        <Toaster position="top-right" expand richColors />
      </body>
    </html>
  );
}
