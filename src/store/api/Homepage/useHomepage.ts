import { baseQueryWithLang } from '@/lib/baseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const HomepageApi = createApi({
    reducerPath: 'Homepage',
    baseQuery: baseQueryWithLang,
    endpoints: (builder) => ({
        getHomeData: builder.query({
            query: (lang = "en") => ({
                url: "/home",
                headers: { "Accept-Language": lang },
            }),
        }),
    }),
});

export const { useGetHomeDataQuery } = HomepageApi;
