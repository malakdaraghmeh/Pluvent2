import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://test.com';

    const staticRoutes = [
        '',
        '/about',
        '/contact-us',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    staticRoutes.forEach(route => {
        sitemapEntries.push({
            url: `${baseUrl}/en${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'weekly' : 'monthly',
            priority: route === '' ? 1 : 0.8,
        });

        sitemapEntries.push({
            url: `${baseUrl}/ar${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'weekly' : 'monthly',
            priority: route === '' ? 1 : 0.8,
        });
    });

    return sitemapEntries;
}
