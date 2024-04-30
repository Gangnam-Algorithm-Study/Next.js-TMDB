export interface MovieTypes {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number,
    tagline: string,
    genres: GenreTypes[]
}

interface GenreTypes {
    id: number,
    name: string
}

export interface MovieCreditsTypes {
    id: number,
    cast: MovieCreditsCastTypes[],
    crew: MovieCreditsCrewTypes[]
}

// 배우
export interface MovieCreditsCastTypes {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id: number,
    character: string,
    credit_id: string,
    order: number
}

// 스태프
export interface MovieCreditsCrewTypes {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export type DateType = {
    from: string,
    to: string
}

export type GenreType = number[]

export interface FilterParamsTypes {
    sorted: string,
    date: DateType,
    genre: GenreType
}