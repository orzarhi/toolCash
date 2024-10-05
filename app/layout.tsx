import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Footer } from '@/components/footer';
import { Recursive } from 'next/font/google';
import { Navbar } from '@/components/navbar';

const inter = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${inter.className} antialiased`}>
        <main className="container mx-auto p-2.5 flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex-1 flex flex-col h-full">
            <Providers>
              <Navbar />
              {children}
              <Footer />
            </Providers>
          </div>
        </main>
      </body>
    </html>
  );
}
