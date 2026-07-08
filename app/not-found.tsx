import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12">
            <div className="mx-auto max-w-4xl px-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-10 text-center text-slate-400">
                    <p className="text-lg font-semibold text-white">Post not found</p>
                    <p className="mt-3">Please check the URL or return to the blog list.</p>
                    <Link href="/" className="mt-6 inline-flex rounded-full border border-sky-500 bg-sky-500/10 px-4 py-2 text-sm text-sky-200 transition hover:bg-sky-500/20">
                        Return to Blog
                    </Link>
                </div>
            </div>
        </main>
    );
}
