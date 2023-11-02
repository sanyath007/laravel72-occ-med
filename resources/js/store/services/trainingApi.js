import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const trainingApi = createApi({
    reducerPath: 'trainingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/trainings/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = trainingApi;
