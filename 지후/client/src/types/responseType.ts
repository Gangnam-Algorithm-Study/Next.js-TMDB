import { MovieTypes } from "./movie";

export interface MovieResponse {
    page: number,
    results: MovieTypes[],
    total_pages: number,
    total_results: number
}

export interface ServerResponse {
    status: number,
    message?: string,
    data?: any
}