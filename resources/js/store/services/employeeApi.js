import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.MIX_APP_URL
    }),
    endpoints: (builder) => ({
        getInitialFormData: builder.query({
            query: () => ({
                url: `/api/employees/init/form`
            }),
        }),
    }),
});

export const { useGetInitialFormDataQuery } = employeeApi;
