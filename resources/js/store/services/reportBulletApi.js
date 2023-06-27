import { createApi, fakeBaseQuery, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reportBulletApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.MIX_APP_URL }),
    endpoints: (builder) => ({
        getReportBullet: builder.query({
            query: (id) => `/api/report-bullets/${id}`,
        }),
    }),
});

export const { useGetReportBulletQuery } = reportBulletApi;
