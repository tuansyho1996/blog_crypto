import { Schema } from 'mongoose';
import dbBlogConnect from '@/lib/mongodbBlog';

export interface IPost {
    title: string;
    slug: string;
    content: string;
    author: string;
    tags: string[];
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        author: { type: String, required: true },
        tags: { type: [String], default: [] },
        publishedAt: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

const modelName = 'Post';

async function getPostModel() {
    const connection = await dbBlogConnect();
    return connection.models[modelName] || connection.model(modelName, BlogSchema);
}

export default getPostModel;
