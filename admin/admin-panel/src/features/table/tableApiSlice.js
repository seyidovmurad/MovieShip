import { apiSlice } from '../../app/api/apiSlice';

export const TableApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['table'],
    endpoints: builder => ({
        getTable: builder.query({
            query: (path) => `${path}`,
            providesTags: ['table']
        }),
        getTableById: builder.query({
            query: (path) => `${path}`,
        }),
        patchTable: builder.mutation({
            query: (path, data) => ({
                url: `${path}`,
                method: 'PUT',
                body: data
            }),
        }),
        addTable: builder.mutation({
            query: ({path, data}) => ({
                url: `${path}`,
                method: 'POST',
                body: {...data}
            }),
            invalidatesTags: ['table']
        }),
        deleteTable: builder.mutation({
            query: (path) => ({
                url: `${path}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['table']
        })
    })
});

export const {
    useGetTableQuery,
    useGetTableByIdQuery,
    useAddTableMutation,
    usePatchTableMutation,
    useDeleteTableMutation
} = TableApiSlice