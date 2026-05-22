import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Standalone Blog',
    description: 'Standalone SEO-friendly blog site separated from the NFT project.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
