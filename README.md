# Blog

Standalone blog project extracted from the NFT website.

## Run locally

1. Install dependencies:
   ```bash
   cd blog
   npm install
   ```
2. Set the blog MongoDB connection string in `.env.local` or environment:
   ```env
   MONGODB_URI_BLOG=mongodb+srv://.../your-blog-db
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

## Notes

- This project is intentionally separate from the NFT application.
- The blog list is available at `/` and post detail pages are available at `/:slug`.
- Use `npm run build` to build for production.
