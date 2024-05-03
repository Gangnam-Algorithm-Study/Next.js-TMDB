"use client";

import styled from "styled-components";
import Header from "../_component/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetFilterMoviesOption, getFilterMovies } from "@/api";
import MovieFilter from "./_component/MovieFilter";
import MovieCard from "../_component/MovieCard";

const MovieTamplete = () => {
  const observer = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [queryKey, setQuery] = useState<GetFilterMoviesOption>({
    with_genres: undefined,
    with_runtime_gte: undefined,
    with_runtime_lte: undefined,
    with_original_language: undefined,
    vote_average_gte: undefined,
    vote_average_lte: undefined,
    sort_by: undefined,
    with_watch_providers: undefined,
    watch_region: undefined,
    release_date_gte: undefined,
    release_date_lte: undefined,
  });

  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  const {
    data: filterMovies,
    fetchNextPage, // 다음 페이지 데이터 호출
    hasNextPage, // 호출할 다음 페이지가 있는지 구분하는 boolean 값
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["filteredMovies", queryKey],
    queryFn: ({ pageParam = 1 }) => getFilterMovies(pageParam, queryKey),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });

  const isEnd =
    filterMovies?.pages?.[filterMovies?.pages?.length - 1]?.total_results ===
    filterMovies?.pages?.map((v) => v.results).flat()?.length;

  useEffect(() => {
    if (loadMoreClicked) {
      const options = {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      };

      const observerCallback: IntersectionObserverCallback = (entries) => {
        if (
          !isEnd &&
          entries[0].isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          timeoutRef.current = setTimeout(() => {
            fetchNextPage();
          }, 500); // 1초 후에 다음 페이지 로딩
        }
      };

      const io = new IntersectionObserver(observerCallback, options);
      if (observer.current) {
        io.observe(observer.current);
      }

      return () => {
        if (observer.current) {
          io.unobserve(observer.current);
        }
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, loadMoreClicked, isEnd]);

  /** 검색 하기 */
  const handleSearch = useCallback((option: GetFilterMoviesOption) => {
    setQuery(option);
    setLoadMoreClicked(false);
  }, []);

  return (
    <MovieTemplateStyle>
      <Header />
      <div className="movieWrap">
        <div className="title">인기 영화</div>
        <div className="movieContainer">
          <div className="left">
            <MovieFilter onSearch={handleSearch} />
          </div>

          <div className="right">
            <div className="itemWrap">
              {filterMovies?.pages.map((page) =>
                page.results
                  .filter((result) => result.poster_path !== null)
                  .map((movie) => <MovieCard key={movie.id} movie={movie} />)
              )}
            </div>
            {!isEnd && (
              <div
                className="loadButton"
                onClick={() => setLoadMoreClicked(true)}
              >
                더 불러오기
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={observer} className="observer" />
    </MovieTemplateStyle>
  );
};

export default MovieTamplete;

const MovieTemplateStyle = styled.div`
  padding-top: 67px;

  & > .movieWrap {
    padding: 30px 40px;
    max-width: 1300px;
    margin: 0 auto;

    & > .title {
      font-size: 25px;
      font-weight: 600;
    }

    & > .movieContainer {
      display: flex;

      & > .left {
        width: 260px;
      }

      & > .right {
        flex: 1;
        margin-left: 20px;

        & > .itemWrap {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          grid-gap: 15px;
        }

        & > .loadButton {
          cursor: pointer;

          padding: 10px 0;
          margin-top: 20px;
          width: 100%;
          text-align: center;

          border-radius: 20px;

          background-color: #01b4e4;
          color: #fff;

          font-weight: 600;
          font-size: 20px;
        }
      }
    }
  }
`;
