import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import { absoluteUrl, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.brand}`,
    },
    description: siteConfig.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.brand }],
    creator: siteConfig.brand,
    publisher: siteConfig.brand,
    alternates: {
        canonical: absoluteUrl('/'),
    },
    openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        url: absoluteUrl('/'),
        siteName: siteConfig.name,
        title: siteConfig.name,
        description: siteConfig.description,
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
