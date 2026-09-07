import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithLang = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: (headers) => {
        if (typeof window !== "undefined") {
            const locale = window.location.pathname.split("/")[1] || "ar";
            headers.set("Accept-Language", locale);
        }
        return headers;
    },
});
