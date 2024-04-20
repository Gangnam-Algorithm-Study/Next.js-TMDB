import {
  IMovie,
  IMovieCreditItem,
  IMovieGrade,
  IMovieItem,
  IMovieNowplayingItem,
} from "@/@types";
import axios from "axios";

const API_KEY = "938a523e3ba20ec3fc35ad541e60c577";
const BASE_URL = "https://api.themoviedb.org/3";

/** 트렌드 영화 조회 */
export const getTrendingMovies = async (period: "day" | "week") => {
  const response = await axios.get<IMovieItem>(
    `${BASE_URL}/trending/movie/${period}`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        page: 1,
      },
    }
  );
  return response.data;
};

/** 영화 상세 조회 */
export const getDetailMovie = async (movieId: number) => {
  const response = await axios.get<IMovie>(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      language: "ko-kr",
      page: 1,
    },
  });
  return response.data;
};

/** 영화 출연진 조회 */
export const getMovieCredits = async (movieId: number) => {
  const response = await axios.get<IMovieCreditItem>(
    `${BASE_URL}/movie/${movieId}/credits`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        page: 1,
      },
    }
  );
  return response.data;
};

/** 인기 영화 조회 */
export const getPopularMovies = async (pageParam: number) => {
  const response = await axios.get<IMovieNowplayingItem>(
    `${BASE_URL}/movie/popular`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        page: pageParam,
      },
    }
  );
  return response.data;
};

export const getNowplayingMoviesMorePage = async (pageCount: number) => {
  const arr = new Array(pageCount).fill(null);

  const response = await Promise.all(
    arr.map((v, i) => getNowplayingMovies(i + 1))
  );

  return response.map((v) => v.results).flat() || [];
};

/** 상영중인 영화 조회 */
export const getNowplayingMovies = async (pageParam = 1) => {
  const response = await axios.get<IMovieItem>(
    `${BASE_URL}/movie/now_playing`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        page: pageParam,
      },
    }
  );
  return response.data;
};

/** 영화 검색 */
export const getMovieSearch = async (query: string) => {
  const response = await axios.get<IMovieItem>(`${BASE_URL}/search/movie`, {
    params: {
      query,
      api_key: API_KEY,
      language: "ko-kr",
      page: 1,
    },
  });
  return response.data;
};

/** 영화 등급 조회 */
export const getMovieGrades = async () => {
  const response = await axios.get<IMovieGrade[]>(
    `${BASE_URL}/certification/movie/list`,
    {
      params: {
        api_key: API_KEY,
        certifications: "KR",
      },
    }
  );
  return response.data;
};
