"use client";

import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import Search from "../../_component/Search";
import { getNowplayingMoviesMorePage, getMovieSearch } from "@/api";
import Link from "next/link";

import MovieTrend from "./MovieTrend";
import MoviePopular from "./MoviePopular";
import { useQuery } from "@tanstack/react-query";
import { MovieResult } from "@/@types";
import dayjs from "dayjs";

const Main = () => {
  const { data: nowplayingMoviesInMorePage } = useQuery({
    queryKey: ["nowplayingMoviesInMorePage"],
    queryFn: () => getNowplayingMoviesMorePage(5),
  });

  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState<MovieResult[]>([]);
  const [searchBackgroundUrl, setSearchBackgroundUrl] = useState<string | null>(
    null
  );

  console.log(searchMovies);

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    []
  );

  const handleMovieSearch = useCallback(async () => {
    if (search?.length) {
      const res = await getMovieSearch(search);
      setSearchMovies(res.results);
    }
  }, [search]);

  // 랜덤한 배경 이미지 가져오기
  useEffect(() => {
    if (nowplayingMoviesInMorePage) {
      const randomIndex = Math.floor(
        Math.random() * nowplayingMoviesInMorePage.length
      );
      setSearchBackgroundUrl(
        `url(https://image.tmdb.org/t/p/original${nowplayingMoviesInMorePage[randomIndex]?.backdrop_path})`
      );
    }
  }, [nowplayingMoviesInMorePage]);

  return (
    <MainStyle>
      <main id="main">
        <div className="searchWrap">
          {!searchBackgroundUrl ? (
            <div className="background">로딩중</div>
          ) : (
            <img
              className="background"
              src={`https://image.tmdb.org/t/p/original${searchBackgroundUrl}`}
              alt=""
            />
          )}
          <div className="title">
            <h2>Welcome.</h2>
            <h3>
              Millions of movies, TV shows and people to discover. Explore now.
            </h3>
          </div>
          <div className="searchContainer">
            <Search
              search={search}
              onChangeSearch={handleChangeSearch}
              onChangeMovieSearch={handleMovieSearch}
            />
            {searchMovies.length > 0 && (
              <div className="autoSearchContainer">
                <div className="searchList">
                  {searchMovies.map((searchMovie) => (
                    <Link
                      href={`/movie/${searchMovie?.id}`}
                      key={searchMovie?.id}
                      legacyBehavior
                    >
                      <div className="searchItem">
                        <img
                          className="backGround"
                          src={`https://image.tmdb.org/t/p/w500${searchMovie?.poster_path}`}
                        />
                        <div className="text">
                          <div className="title">{searchMovie?.title}</div>
                          <div className="date">
                            {dayjs(searchMovie?.release_date).format(
                              "YYYY/MM/DD"
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <MovieTrend />
        <MoviePopular />
      </main>
    </MainStyle>
  );
};

export default Main;

const MainStyle = styled.div`
  padding-top: 67px;

  background-color: #032541;

  & > #main {
    height: calc(100% - 67px);

    & > .searchWrap {
      position: relative;
      width: 100%;
      background-color: #000;

      padding: 0 40px;
      height: 360px;

      display: flex;
      flex-direction: column;
      justify-content: center;

      & > .background {
        position: absolute;

        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
        opacity: 0.8;
      }
      & > .title {
        z-index: 100;
        margin-bottom: 50px;

        & > h2 {
          font-size: 3em;
          font-weight: 700;
          line-height: 1;

          color: #fff;
        }

        & > h3 {
          font-size: 2em;
          font-weight: 600;
          margin: 0;

          color: #fff;
        }
      }

      & > .searchContainer {
        position: relative;

        & > .autoSearchContainer {
          z-index: 10000;
          max-height: auto;
          width: 100%;
          background-color: white;
          position: absolute;
          top: 60px;
          left: 0;

          overflow: hidden;

          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
          border-radius: 8px;

          & > .searchList {
            background-color: #10161d;

            width: 100%;

            padding: 10px 8px;

            & > .searchItem {
              cursor: pointer;

              margin-bottom: 10px;

              display: flex;
              align-items: center;

              width: 100%;
              height: 150px;

              font-size: 35px;
              font-weight: bold;

              border-radius: 10px;

              z-index: 4;

              &:hover {
                background-color: #1c252f;
              }

              & > .backGround {
                height: 150px;
                object-fit: contain;
              }

              & > .text {
                margin-left: 10px;
                & > .title {
                  font-size: 20px;
                  color: #fff;
                }

                & > .date {
                  font-size: 15px;
                  color: #9096a4;
                }
              }
            }
          }
        }
      }
    }

    & > .searchMovieWrap {
      padding: 30px 40px;

      display: flex;
      flex-direction: column;

      & > .title {
        font-weight: 600;
        font-size: 1.5em;
      }

      & > .movieWrap {
        display: flex;
        flex-wrap: wrap;
        margin: 20px -4px 0 -4px;

        box-sizing: border-box;
        & > .movieItem {
          box-sizing: border-box;

          width: 33.3%;

          padding: 0 4px;
        }
      }
    }
  }
`;
