import React from 'react'
import ProjectDetails from './components/ProjectDetails'


// async function fetchProjectForSeo(id, locale) {
//     const res = await fetch(`${process.env.API_BASE_URL}/projects/${id}`, {
//         headers: { "Accept-Language": locale },
//         cache: "no-store",
//     });
//     if (!res.ok) return null;
//     const json = await res.json();
//     return json.data;
// }

// export async function generateMetadata({ params }) {
//     const locale = params.locale || "en";
//     const { id } = params;

//     const project = await fetchProjectForSeo(id, locale);

//     if (!project) {
//         return {
//             title: "Project Not Found",
//             description: "The requested project does not exist.",
//         };
//     }

//     const seo = project.seo;

//     return {
//         title: seo?.title || project.hero?.title,
//         description: seo?.description || project.hero?.description,
//         keywords: seo?.keywords,
//         alternates: {
//             canonical: seo?.canonical,
//         },
//         openGraph: seo?.open_graph,
//         twitter: seo?.twitter,
//     };
// }


export default function page({ params }) {
    return (
        <div>
            <ProjectDetails params={params} />
        </div>
    )
}
