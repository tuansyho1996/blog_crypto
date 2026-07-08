import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link href="/" className="text-lg font-semibold text-slate-900">
                    Carnobon Blog
                </Link>
                <nav className="flex items-center gap-4 text-sm text-slate-600">
                    <Link href="/tags/crypto" className="transition hover:text-slate-900">Crypto</Link>
                    <Link href="/tags/environment" className="transition hover:text-slate-900">Environment</Link>
                </nav>
            </div>
        </header>
    );
}
