import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import getBlogModel from '@/models/Post';
import { absoluteUrl, createExcerpt, siteConfig } from '@/lib/seo';

interface BlogPageProps {
    params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const Blog = await getBlogModel();
    const post = await Blog.findOne({ slug: params.slug, publish: 'published' }).lean();

    if (!post) {
        return {
            title: 'Post not found',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = post.title;
    const description = createExcerpt(post.content);
    const url = absoluteUrl(`/${post.slug}`);

    return {
        title,
        description,
        keywords: post.tags,
        alternates: {
            canonical: url,
        },
        authors: [{ name: post.author || siteConfig.brand }],
        openGraph: {
            type: 'article',
            locale: siteConfig.locale,
            url,
            siteName: siteConfig.name,
            title,
            description,
            publishedTime: post.publishedAt?.toISOString(),
            modifiedTime: (post.updatedAt || post.publishedAt)?.toISOString(),
            authors: [post.author || siteConfig.brand],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
    const Blog = await getBlogModel();
    const post = await Blog.findOne({ slug: params.slug, publish: 'published' }).lean();

    if (!post) {
        notFound();
    }

    const postUrl = absoluteUrl(`/${post.slug}`);
    const description = createExcerpt(post.content);
    const publishedAt = post.publishedAt || post.createdAt;
    const updatedAt = post.updatedAt || publishedAt;
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        url: postUrl,
        mainEntityOfPage: postUrl,
        datePublished: publishedAt?.toISOString(),
        dateModified: updatedAt?.toISOString(),
        author: {
            '@type': 'Person',
            name: post.author || siteConfig.brand,
        },
        publisher: {
            '@type': 'Organization',
            name: siteConfig.brand,
        },
        keywords: post.tags?.join(', '),
    };

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-8 space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-10">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span>{new Date(publishedAt).toLocaleDateString('en-US')}</span>
                        <span className="inline-block h-1 w-1 rounded-full bg-slate-500" />
                        <span>By {post.author}</span>
                    </div>
                    <h1 className="text-4xl font-semibold text-white">{post.title}</h1>
                    <div className="flex flex-wrap gap-2">
                        {post.tags?.map((tag: string) => (
                            <span key={tag} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">{tag}</span>
                        ))}
                    </div>
                </div>

                <article className="prose prose-invert max-w-none rounded-3xl border border-white/10 bg-slate-950/80 p-10 prose-a:text-sky-300 prose-p:text-slate-300">
                    <div>{post.content}</div>
                </article>

                <div className="mt-8 flex items-center justify-between gap-4 text-sm text-slate-400">
                    <Link href="/" className="rounded-full border border-slate-700 px-4 py-2 transition hover:border-sky-400 hover:text-sky-300">
                        ← Back to Blog
                    </Link>
                    <span>Last updated: {new Date(updatedAt).toLocaleDateString('en-US')}</span>
                </div>
            </div>
        </main>
    );
}
