import mongoose from 'mongoose';

const MONGODB_URI_BLOG = process.env.MONGODB_URI_BLOG || '';

if (!MONGODB_URI_BLOG) {
    throw new Error('Please define the MONGODB_URI_BLOG environment variable');
}

let cachedBlog = (global as any).mongooseBlog;

if (!cachedBlog) {
    cachedBlog = (global as any).mongooseBlog = { conn: null, promise: null };
}

async function dbBlogConnect() {
    if (cachedBlog.conn) return cachedBlog.conn;
    if (!cachedBlog.promise) {
        const conn = mongoose.createConnection(MONGODB_URI_BLOG, {
            bufferCommands: false,
        });
        cachedBlog.promise = conn.asPromise().then(() => conn);
    }
    cachedBlog.conn = await cachedBlog.promise;
    return cachedBlog.conn;
}

export default dbBlogConnect;
