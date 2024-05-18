import { MovieTypes } from "@/types/movie";
import { ServerResponse } from "@/types/responseType";
import { IRegister, SignInBody } from "@/types/userTypes";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

const userInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL
})

export const postRegister = async (body: IRegister) => {
    const { data } = await userInstance.post(`/user/register`, body);

    return data;
}

export const postLogin = async (body: SignInBody) => {
    const { data } = await userInstance.post(`/user/login`, body);

    return data;
}

export const getLikeMovie: QueryFunction<ServerResponse, [_1: string, _2: string]> = async ({ queryKey }) => {
    const [_, user_id] = queryKey;
    const { data } = await userInstance.get(`movie/get_like_movie?user_id=${user_id.toString()}`);

    return data;
}

export const addLikeMovie = async ({ user_id, movie }: { user_id: string, movie: MovieTypes }) => {
    const { data } = await userInstance.post(`movie/add_movie`, { user_id, movie });

    return data;
}

export const removeLikeMovie = async ({ movie_id, user_id }: { movie_id: string, user_id: string }) => {
    const { data } = await userInstance.post(`movie/remove_movie`, { movie_id, user_id });

    return data;
}