import { Schema, model } from "mongoose";
import { Movie as IMovie } from "../@types/SchemaTypes";

const movieSchema = new Schema<IMovie>({
    user_id: { type: String, required: true },
    movie_list: [
        {
            adult: Boolean,
            backdrop_path: String,
            genre_ids: [Number],
            id: Number,
            original_language: String,
            original_title: String,
            overview: String,
            popularity: Number,
            poster_path: String,
            release_date: String,
            title: String,
            video: Boolean,
            vote_average: Number,
            vote_count: Number,
            tagline: String,
            genres: [
                {
                    id: Number,
                    name: String
                }
            ]
        }
    ]
})

const Movie = model<IMovie>('Liked_Movie', movieSchema);

export { Movie };