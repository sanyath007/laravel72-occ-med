import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const surveyingApi = createApi({
    reducerPath: 'surveyingApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/surveyings/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = surveyingApi;
