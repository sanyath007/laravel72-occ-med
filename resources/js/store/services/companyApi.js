import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const companyApi = createApi({
    reducerPath: 'companyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/companies/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = companyApi;
