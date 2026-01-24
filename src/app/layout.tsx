import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Blue Screen Simulator',
  description: 'A simulated OS failure experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head />
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
