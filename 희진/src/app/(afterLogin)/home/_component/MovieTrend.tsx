"use client";

import { styled } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import cx from "classnames";

import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { IMovieItem } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies } from "@/api";
import { useCallback, useState } from "react";
import MovieItem from "../../_component/MovieItem";

type Tab = "today" | "week";

const MovieTrend = () => {
  const { data: trendingMoviesDay } = useQuery<IMovieItem>({
    queryKey: ["trendingMovie", "day"],
    queryFn: () => getTrendingMovies("day"),
  });

  const { data: trendingMoviesWeek } = useQuery<IMovieItem>({
    queryKey: ["trendingMovie", "week"],
    queryFn: () => getTrendingMovies("week"),
  });

  const [isClick, setIsClick] = useState<Tab>("today");

  /** 트렌딩 탭 클릭 */
  const handleIsClick = useCallback((item: Tab) => {
    setIsClick(item);
  }, []);

  return (
    <MovieTrendStyle>
      <div className="top">
        <div className="title">트렌딩 영화</div>
        <div className="tab">
          <div
            className={cx("item", { active: isClick === "today" })}
            onClick={() => handleIsClick("today")}
          >
            오늘
          </div>
          <div
            className={cx("item", { active: isClick === "week" })}
            onClick={() => handleIsClick("week")}
          >
            이번 주
          </div>
        </div>
      </div>
      <div className="movieContainer">
        <Swiper
          modules={[Pagination]}
          className="imgSwiper"
          pagination={{ renderBullet: () => "" }}
          spaceBetween={15}
          slidesOffsetBefore={0}
          slidesOffsetAfter={20}
          slidesPerView={7.5}
        >
          {(isClick === "today"
            ? trendingMoviesDay
            : trendingMoviesWeek
          )?.results?.map((movie) => (
            <SwiperSlide key={movie?.id}>
              <MovieItem movie={movie} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MovieTrendStyle>
  );
};

export default MovieTrend;

const MovieTrendStyle = styled.div`
  background-color: #fff;

  padding: 30px 40px 0;

  display: flex;
  flex-direction: column;

  & > .top {
    display: flex;
    align-items: center;

    & > .title {
      margin-right: 20px;

      font-weight: 600;
      font-size: 1.5em;
    }

    & > .tab {
      position: relative;

      width: 190px;
      border: 1px solid #000;
      border-radius: 30px;

      display: flex;
      align-items: center;
      & > .item {
        z-index: 100;

        text-align: center;
        padding: 4px 20px;

        flex: 1;
        cursor: pointer;

        font-weight: 600;
        font-size: 1em;

        &.active {
          border-radius: 30px;

          color: #389888;

          background-color: #032541;
        }
      }
    }
  }

  & > .movieContainer {
    padding: 20px 0;

    display: flex;

    & .swiper-wrapper {
      display: flex;
    }
  }
`;
