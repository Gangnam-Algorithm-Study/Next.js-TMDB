export interface User {
    _id?: string;
    nickname: string;
    id: string;
    password?: string;
}

export interface Movie {
    _id?: string;
    user_id: string;
    movie_list: {
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
    }[]
}