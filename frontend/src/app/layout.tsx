import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Urbanist } from "next/font/google";
import "./globals.css"

// const inter = Inter({ subsets: ['latin'] });
const urbanist = Urbanist({
  subsets: ["latin"], 
  variable: "--font-urbanist", 
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: 'RealEstateHub - Find Your Dream Property',
  description: 'Browse and discover amazing properties for sale and rent',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={urbanist.className} suppressHydrationWarning>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}

