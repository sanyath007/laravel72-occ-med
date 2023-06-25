import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const monthlyApi = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.MIX_APP_URL }),
    endpoints: (builder) => ({
        getMonthliesByDivision: builder.query({
            query: (division, queryStr) => `/api/monthlies/division/${division}${queryStr}`,
        }),
    }),
});

export const { useGetMonthiesByDivision } = monthlyApi;
