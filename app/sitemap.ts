import { MetadataRoute } from 'next';
import getBlogModel from '@/models/Post';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const Blog = await getBlogModel();
    const posts = await Blog.find({ publish: 'published' }).lean();

    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
        },
    ];

    const blogUrls = posts.map((post: any) => ({
        url: `${baseUrl}/${post.slug}`,
        lastModified: post.updatedAt || post.publishedAt || post.createdAt,
    }));

    return [...staticUrls, ...blogUrls];
}
