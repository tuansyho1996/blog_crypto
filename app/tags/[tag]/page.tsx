import type { Metadata } from 'next';
import Link from 'next/link';
import getBlogModel from '@/models/Post';
import { absoluteUrl, siteConfig } from '@/lib/seo';

interface TagPageProps {
    params: { tag: string };
}

export const dynamic = 'force-dynamic';

function formatTag(tag: string) {
    return decodeURIComponent(tag).replace(/-/g, ' ');
}

export function generateMetadata({ params }: TagPageProps): Metadata {
    const tag = formatTag(params.tag);
    const title = `${tag} articles`;
    const description = `Read the latest ${tag} articles, guides, and updates from carnobon.`;

    return {
        title,
        description,
        alternates: {
            canonical: absoluteUrl(`/tags/${params.tag}`),
        },
        openGraph: {
            url: absoluteUrl(`/tags/${params.tag}`),
            title: `${title} | ${siteConfig.brand}`,
            description,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const tag = formatTag(params.tag);
    const Blog = await getBlogModel();
    const posts = await Blog.find({ publish: 'published', tags: tag }).sort({ publishedAt: -1 }).lean();

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-10 space-y-3">
                    <p className="text-sm uppercase tracking-[0.25em] text-sky-400">Tag</p>
                    <h1 className="text-4xl font-semibold capitalize">{tag} articles</h1>
                    <p className="max-w-2xl text-slate-400">Latest carnobon posts tagged with {tag}.</p>
                </div>

                <div className="grid gap-6">
                    {posts.length === 0 ? (
                        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-center text-slate-400">
                            No published posts found for this tag.
                        </div>
                    ) : (
                        posts.map((post: any) => (
                            <article key={post._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 transition hover:border-sky-500/50 hover:bg-slate-900/90">
                                <p className="text-sm uppercase tracking-[0.3em] text-sky-400">{new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US')}</p>
                                <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
                                <p className="mt-5 max-w-3xl text-slate-400 line-clamp-3">{post.content}</p>
                                <Link
                                    href={`/${post.slug}`}
                                    className="mt-6 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-300"
                                >
                                    Read article
                                </Link>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
