import { MovieCreditsTypes, MovieTypes } from '@/types/movie';
import { QueryFunction } from '@tanstack/react-query';
import axios from 'axios';

const tmdb = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`
    },
    params: {
        api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY,
        language: 'ko-KR',
    }
})

export const getTopRated = async ({ pageCount }: { pageCount: number }) => {
    const { data } = await tmdb.get(`/movie/top_rated?page=${pageCount}`);
    return data;
}

export const getMovieDetail: QueryFunction<MovieTypes, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_, id] = queryKey;
    const { data } = await tmdb.get(`/movie/${id}`);
    return data;
}

export const getMovieCredits: QueryFunction<MovieCreditsTypes, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_, id] = queryKey;
    const { data } = await tmdb.get(`/movie/${id}/credits`);

    return data;
}

export const getMovies = async ({ pageCount, url }: { pageCount: number, url?: string }) => {
    const { data } = await tmdb.get(`/discover/movie?include_adult=false&include_video=false&${url}&page=${pageCount}`);

    return data;
}

export const getTrendingMovie = async () => {
    const { data } = await tmdb.get('/trending/movie/day');

    return data;
}

export const getNowPlayingMovie = async () => {
    const { data } = await tmdb.get('movie/now_playing');

    return data;
}

export const getPopularMovie = async () => {
    const { data } = await tmdb.get('movie/popular');

    return data;
}