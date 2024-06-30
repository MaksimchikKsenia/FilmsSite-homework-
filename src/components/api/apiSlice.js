import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3030/api/v1'}),
    refetchOnMountOrArgChange: 10,
    endpoints: builder => ({
        getMovies: builder.query({
            query: (array) => {      
                let [page, genre, year, title] = array        
                
                if(genre == 'Не выбран' || genre == 0) genre = ''
                if(year == 'Не выбран') year = ''
                // page = 1
                if(genre || year || title) page = 1
                // console.log(genre, year, title, page)
                return `/search?page=${page}${genre ? `&genre=${genre}` : ''}${year ? `&release_year=${year}` : ''}${title ? `&title=${title}` : ''}`
            }
        }),
        getMovieById: builder.query({
            query: (id) => `/movie/${id}`,
        }),

    })
})

export const {useGetMoviesQuery, useGetMovieByIdQuery} = apiSlice