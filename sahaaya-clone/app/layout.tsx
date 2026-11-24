import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/app/context/auth-context';

export const metadata: Metadata = {
  title: 'Sahaaya+ · Well-Being Support',
  description: 'Gentle, regular check-ins. Real people when it matters. Aligned with NHAA & Integrated National Portal.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="antialiased min-h-full flex flex-col">
      <body className="bg-background text-foreground antialiased min-h-full flex flex-col font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
