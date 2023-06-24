import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const patientsApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.MIX_APP_URL }),
    endpoints: builder => ({
        getPatients: builder.query({
            query: () => '/api/patients',
        }),
    }),
});

export const { useGetPatientsQuery } = patientsApi;
