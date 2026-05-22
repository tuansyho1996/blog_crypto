import Link from 'next/link';
import getBlogModel from '@/src/models/Post';

interface BlogPageProps {
    params: { slug: string };
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
    const Blog = await getBlogModel();
    const post = await Blog.findOne({ slug: params.slug, publish: 'published' }).lean();

    if (!post) {
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

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12">
            <div className="mx-auto max-w-4xl px-4">
                <div className="mb-8 space-y-4 rounded-3xl border border-white/10 bg-slate-950/80 p-10">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                        <span>{new Date(post.publishedAt).toLocaleDateString('en-US')}</span>
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
                    <span>Last updated: {new Date(post.updatedAt || post.publishedAt).toLocaleDateString('en-US')}</span>
                </div>
            </div>
        </main>
    );
}
