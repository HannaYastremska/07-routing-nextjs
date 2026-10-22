import type { Metadata } from 'next';
import TanStackProvider from '../components/TanStackProvider/TanStackProvider';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'NoteHub - Manage Your Notes',
  description: 'A simple and efficient application designed for managing personal notes.',
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TanStackProvider>
          <Header />
          <div id="root-layout">
            {children}
            {modal}
          </div>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
