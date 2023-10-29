import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const vaccinationApi = createApi({
    reducerPath: 'vaccinationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/vaccinations/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = vaccinationApi;
