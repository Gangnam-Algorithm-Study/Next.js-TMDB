"use client";

import { getPopularMovies } from "@/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const MoviePopular = () => {
  const observer = useRef<HTMLDivElement>(null);

  const {
    data: popularMovies,
    fetchNextPage, // 다음 페이지 데이터 호출
    hasNextPage, // 호출할 다음 페이지가 있는지 구분하는 boolean 값
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["popularMovies"],
    queryFn: ({ pageParam = 1 }) => getPopularMovies(pageParam),
    getNextPageParam: (_, allPages) => allPages.length + 1,
    initialPageParam: 1,
  });

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        setTimeout(() => {
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
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <MoviePopularStyle>
      <div className="title">인기 영화 목록</div>
      <div className="itemWrap">
        {popularMovies?.pages.map((v) =>
          v.results.map((result) => (
            <div className="item" key={result.id}>
              <div className="posterContainer">
                <Link href={`/movie/${result.id}`} legacyBehavior>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                    alt="Movie Poster"
                    className="poster"
                  />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      <div ref={observer} className="observer" />
    </MoviePopularStyle>
  );
};

export default MoviePopular;

const MoviePopularStyle = styled.div`
  padding: 0 40px;

  display: flex;
  flex-direction: column;

  background-color: #fff;

  & > .title {
    margin-bottom: 20px;

    margin-right: 20px;

    font-weight: 600;
    font-size: 1.5em;
  }

  & > .itemWrap {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
    grid-gap: 15px;

    & > .item {
      box-sizing: border-box;

      & > .posterContainer {
        cursor: pointer;

        position: relative;
        display: flex;
        overflow: hidden;
        padding-top: 125%;
        background: #0a151f;
        transition: opacity 0.1s ease;
        border-radius: 5px;

        & > .poster {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          border-radius: 10px;

          object-fit: cover;
          object-position: center;
        }
      }
    }
  }
`;
