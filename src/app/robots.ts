import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://test.com';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/ar/test/', '/en/test/', '/api/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
