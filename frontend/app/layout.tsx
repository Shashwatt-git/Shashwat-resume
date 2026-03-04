import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '../src/styles/globals.css';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio website'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
