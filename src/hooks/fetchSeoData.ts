export async function fetchSeoData(endpoint: string, locale: string) {
    try {
        const res = await fetch(`${process.env.API_BASE_URL}${endpoint}`, {
            headers: { "Accept-Language": locale },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const json = await res.json();

        if (json.seo) return json.seo;

        if (json.data?.seo) return json.data.seo;

        return null;
    } catch (err) {
        console.error("Failed to fetch SEO data:", err);
        return null;
    }
}
