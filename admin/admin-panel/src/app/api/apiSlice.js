import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, setCredentials } from '../../features/auth/authSlice';
// import { logOut, setCredentials } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if(token) {
            headers.set("msh-auth-token", `${token}`);
        }
        return headers;
    }
})

const baseQueryWithReauth = async(args, api, options) => {
    let result = await baseQuery(args, api, options);

    if(result?.error?.originalStatus === 403) {
        let refreshResult = await baseQuery("/refresh", api, options);

        if(refreshResult?.data) {
            const user = api.getState().user;

            api.dispatch(setCredentials({...refreshResult.data, user}))

            result = await baseQuery(args, api, options);
        }
        else {
            api.dispatch(logOut());
        }
    }
    return result;
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})