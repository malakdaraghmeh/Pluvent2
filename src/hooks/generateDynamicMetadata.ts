
import { fetchSeoData } from "./fetchSeoData";

export async function generateDynamicMetadata(
    endpoint: string, 
    locale: string, 
    fallback: { title?: string, description?: string } = {}
) {
    const data = await fetchSeoData(endpoint, locale);

    if (!data) {
        return {
            title: fallback.title || "Default Title",
            description: fallback.description || "Default description",
        };
    }

    return {
        title: data.title,
        description: data.content || data.description || "",
    };
}
