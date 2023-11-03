import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const screeningApi = createApi({
    reducerPath: 'screeningApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/screenings/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = screeningApi;
