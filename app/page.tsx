import Link from 'next/link';
import getBlogModel from '@/src/models/Post';

export default async function BlogPage() {
    const Blog = await getBlogModel();
    const posts = await Blog.find({ publish: 'published' }).sort({ publishedAt: -1 }).lean();

    return (
        <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] py-12">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mb-10 space-y-3">
                    <p className="text-sm uppercase tracking-[0.25em] text-sky-400">Blog</p>
                    <h1 className="text-4xl font-semibold">News and guides for the blog</h1>
                    <p className="max-w-2xl text-slate-400">Latest posts from your blog system. You can view each article in detail and share the content.</p>
                    <div className="grid gap-6">
                        {posts.length === 0 ? (
                            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-10 text-center text-slate-400">
                                No posts available yet. Create the first post in the blog database.
                            </div>
                        ) : (
                            posts.map((post: any) => (
                                <article key={post._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 transition hover:border-sky-500/50 hover:bg-slate-900/90">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.3em] text-sky-400">{new Date(post.createdAt || post.created_at).toLocaleDateString('en-US')}</p>
                                            <h2 className="mt-3 text-2xl font-semibold text-white">{post.title}</h2>
                                        </div>
                                        <Link
                                            href={`/${post.slug}`}
                                            className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm font-semibold text-white transition hover:border-sky-400 hover:text-sky-300"
                                        >
                                            Read article
                                        </Link>
                                    </div>
                                    <p className="mt-5 max-w-3xl text-slate-400 line-clamp-3">{post.content}</p>
                                    <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500">
                                        <span>By {post.author}</span>
                                        {post.tags?.map((tag: string) => (
                                            <span key={tag} className="rounded-full border border-slate-700 px-3 py-1">{tag}</span>
                                        ))}
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
