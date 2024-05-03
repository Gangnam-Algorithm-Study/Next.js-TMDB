import {
  IMovie,
  IMovieCreditItem,
  IMovieGenre,
  IMovieGrade,
  IMovieItem,
  IMovieLanguage,
  IMovieNowplayingItem,
  IMovieProvider,
  MovieResult,
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

export interface GetFilterMoviesOption {
  with_genres?: string;
  with_runtime_gte?: number;
  with_runtime_lte?: number;
  with_original_language?: string;
  vote_average_gte?: number;
  vote_average_lte?: number;
  sort_by?: string;
  with_watch_providers?: string;
  watch_region?: string;
  release_date_gte?: string;
  release_date_lte?: string;
}

/** 필터된 영화 조회 */
export const getFilterMovies = async (
  pageParam: number,
  option: GetFilterMoviesOption
) => {
  const response = await axios.get<IMovieItem>(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      language: "ko-kr",
      certifications: "KR",
      page: pageParam,
      with_genres: option?.with_genres,
      "with_runtime.gte": option?.with_runtime_gte,
      "with_runtime.lte": option?.with_runtime_lte,
      with_original_language: option?.with_original_language,
      "vote_average.gte": option?.vote_average_gte,
      "vote_average.lte": option?.vote_average_lte,
      sort_by: option?.sort_by,
      with_watch_providers: option?.with_watch_providers,
      watch_region: "KR",
      "primary_release_date.gte": option?.release_date_gte,
      "primary_release_date.lte": option?.release_date_lte,
    },
  });
  return response.data;
};

/** 영화 장르 조회 */
export const getMovieGenres = async () => {
  const response = await axios.get<IMovieGenre>(
    `${BASE_URL}/genre/movie/list`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        certifications: "KR",
      },
    }
  );
  return response.data;
};

/** 언어 */
export const getMovieLanguages = async () => {
  const response = await axios.get<IMovieLanguage[]>(
    `${BASE_URL}/configuration/languages`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        certifications: "KR",
      },
    }
  );
  return response.data;
};

/** 영화 제공 업체 조회 */
export const getMovieProviders = async () => {
  const response = await axios.get<IMovieProvider>(
    `${BASE_URL}/watch/providers/movie`,
    {
      params: {
        api_key: API_KEY,
        language: "ko-kr",
        certifications: "KR",
      },
    }
  );
  return response.data;
};
