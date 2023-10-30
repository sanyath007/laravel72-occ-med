import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const erplanApi = createApi({
    reducerPath: 'erplanApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/er-plans/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = erplanApi;
