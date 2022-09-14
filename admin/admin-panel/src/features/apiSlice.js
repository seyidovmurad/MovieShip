import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000/api'}),
    
    tagTypes: ['table'],
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: (path) => `${path}`,
            providesTags: ['table']
        }),
        getTableById: builder.query({
            query: (path) => `${path}`,
            providesTags: ['table']
        }),
        deleteTable: builder.mutation({
            query: (path) => ({
                url: `${path}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['table']
        })
    })
})

export const {
    useGetMoviesQuery,
    useGetTableByIdQuery,
    useDeleteTableMutation
} = apiSlice;