import { MetadataRoute } from 'next';
import getBlogModel from '@/models/Post';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const Blog = await getBlogModel();
    const posts = await Blog.find({ publish: 'published' }).lean();

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: absoluteUrl('/'),
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: absoluteUrl('/tags/crypto'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: absoluteUrl('/tags/environment'),
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        },
    ];

    const blogUrls = posts.map((post: any) => ({
        url: absoluteUrl(`/${post.slug}`),
        lastModified: post.updatedAt || post.publishedAt || post.createdAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticUrls, ...blogUrls];
}
