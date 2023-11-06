import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const supervisionApi = createApi({
    reducerPath: 'supervisionApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/supervisions/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = supervisionApi;
