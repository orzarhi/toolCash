import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';
import { Footer } from '@/components/footer';
import { Recursive } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Toaster } from '@/components/ui/sonner';

const inter = Recursive({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cash Flow',
  description: 'נהל את הוצאות בניית הבית שלך בצורה פשוטה ויעילה. דע לאן כל שקל נעלם ותקבל תמונה ברורה על התקציב שלך.',
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
              <Toaster position="top-center" dir="rtl" duration={5000} />
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
