import { NextFunction, Request, Response } from "express";
import { Movie as IMovie, MovieTypes } from "../@types/SchemaTypes";
import { Movie } from "../model/movieModel";

export const addLikeMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, movie } = req.body;

        const list = await Movie.findOne({ user_id });

        if (list) {
            const findCheckMovie = list?.movie_list.find((m: IMovie['movie_list'][0]) => m.id === movie.id);

            if (findCheckMovie) {
                return res.status(400).json({
                    message: 'Movie already exists',
                    status: 400,
                })
            }

            list?.movie_list.push(movie)

            await list?.save();

            return res.status(200).json({
                message: 'Movie added successfully',
                status: 200,
            })
        } else {
            return res.status(400).json({
                message: 'User not found',
                status: 400,
            })
        }
    } catch (error) {
        next(error);
    } finally {
        console.log('영화 좋아요 추가 완료');
    }
}

export const addLikeMovieList = async (user_id: string, movie: MovieTypes) => {
    console.log(user_id, movie);
    try {
        const list = await Movie.findOne({ user_id });
        if (list) {
            const findCheckMovie = list?.movie_list.find((m: IMovie['movie_list'][0]) => m.id === Number(movie.id));

            if (findCheckMovie) {
                list.movie_list = list?.movie_list.filter((m: IMovie['movie_list'][0]) => m.id !== Number(movie.id));
                await list?.save();

                return {
                    status: true,
                    message: 'Movie removed successfully',
                }
            }

            console.log(movie);
            list?.movie_list.push(movie);

            await list?.save();

            return {
                status: true
            }
        } else {
            return {
                status: false
            }
        }
    } catch (error) {
        return {
            status: false
        }
    }
}

export const removeLikeMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { movie_id, user_id } = req.body;

        const list = await Movie.findOne({ user_id });

        if (list) {
            list.movie_list = list?.movie_list.filter((movie: IMovie['movie_list'][0]) => movie.id.toString() !== movie_id);

            await list.save();

            return res.status(200).json({
                message: 'Movie removed successfully',
                status: 200,
            })
        } else {
            return res.status(400).json({
                message: 'Movie not found',
                status: 400,
            })
        }
    } catch (error) {
        next(error);
    } finally {
        console.log('영화 좋아요 삭제 완료');
    }
}

export const getLikeMovie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id } = req.query;

        const list = await Movie.findOne({ user_id });

        if (list) {
            const movie_id_list = list?.movie_list.map((movie: IMovie['movie_list'][0]) => movie.id.toString());

            return res.status(200).json({
                data: {
                    movie_list: list?.movie_list,
                    movie_id_list: movie_id_list,
                },
                status: 200,
            })
        } else {
            return res.status(400).json({
                message: 'Movie not found',
                status: 400,
            })
        }

    } catch (error) {
        console.log(error);
        next(error);
    } finally {
        console.log('영화 좋아요 목록 조회 완료');
    }
}