export const siteConfig = {
    name: 'Carnobon Blog',
    brand: 'carnobon',
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://blog.carnobon.com',
    description: 'Latest news, guides, and updates from carnobon.',
    locale: 'en_US',
};

export function absoluteUrl(path = '/') {
    return new URL(path, siteConfig.url).toString();
}

export function createExcerpt(content = '', maxLength = 160) {
    const plainText = content
        .replace(/<[^>]*>/g, ' ')
        .replace(/[#*_`[\]()]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    if (plainText.length <= maxLength) {
        return plainText || siteConfig.description;
    }

    return `${plainText.slice(0, maxLength - 1).trim()}...`;
}
