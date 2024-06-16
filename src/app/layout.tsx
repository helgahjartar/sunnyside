import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import './globals.css';
import { WeatherProvider } from './contexts/WeatherContext';

const inter = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Weather Application',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <WeatherProvider>{children}</WeatherProvider>
         </body>
      </html>
   );
}
