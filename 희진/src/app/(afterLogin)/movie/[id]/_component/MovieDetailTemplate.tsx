"use client";

import { FC } from "react";
import { styled } from "styled-components";

import { useCallback, useRef, useState } from "react";
import cx from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getDetailMovie, getMovieCredits, getMovieGrades } from "@/api";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import Header from "@/app/(afterLogin)/_component/Header";

type Menu = "outline" | "media" | "fandom" | "share";

const MovieDetailTemplate: FC = () => {
  const parms = useParams();

  const movieId = parms.id;

  const { data: movie } = useQuery({
    queryKey: ["movie", +movieId],
    queryFn: movieId ? () => getDetailMovie(+movieId) : undefined,
  });

  const { data: movieCredits } = useQuery({
    queryKey: ["movieCredits", +movieId],
    queryFn: movieId ? () => getMovieCredits(+movieId) : undefined,
  });

  const { data: movieGrades } = useQuery({
    queryKey: ["movieCredits"],
    queryFn: getMovieGrades,
  });

  console.log(movieGrades);

  const directorName = movieCredits?.crew?.find(
    (crewMember) => crewMember?.job === "Director"
  )?.name;

  const [isClick, setIsClick] = useState<Menu>("outline");

  const handleIsClick = useCallback((item: Menu) => {
    setIsClick(item);
  }, []);

  const handleChangeMovieRuntime = useCallback((runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }, []);

  return (
    <MovieDetailTemplateStyle>
      <Header />
      <ul className="menu">
        <li
          className={cx("item", { active: isClick === "outline" })}
          onClick={() => handleIsClick("outline")}
        >
          개요
        </li>
        <li
          className={cx("item", { active: isClick === "media" })}
          onClick={() => handleIsClick("media")}
        >
          미디어
        </li>
        <li
          className={cx("item", { active: isClick === "fandom" })}
          onClick={() => handleIsClick("fandom")}
        >
          팬덤
        </li>
        <li
          className={cx("item", { active: isClick === "share" })}
          onClick={() => handleIsClick("share")}
        >
          공유
        </li>
      </ul>
      <div className="infoWrap">
        <div
          className="backGround"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          }}
        >
          <div className="infoContainer">
            <div className="left">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt="Movie Poster"
                className="poster"
              />
            </div>
            <div className="right">
              <div className="title">
                {movie?.title} <span>({movie?.release_date?.slice(0, 4)})</span>
              </div>
              <div className="info">
                <div className="age">All</div>
                <div className="date">
                  {dayjs(movie?.release_date).format("YYYY/MM/DD")} (
                  {movie?.original_language.toUpperCase()})
                </div>
                {movie?.genres.map((genre) => (
                  <div className="field" key={genre.id}>
                    {genre?.name}
                  </div>
                ))}

                <div className="time">
                  {handleChangeMovieRuntime(movie!.runtime)}
                </div>
              </div>
              <div className="contentContainer">
                <div className="tagLine">{movie?.tagline}</div>
                <div className="title">개요</div>
                <p className="content">{movie?.overview}</p>
              </div>
              <div className="jobContainer">
                <div className="director">
                  <div className="name">{directorName}</div>
                  <div className="job">director</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="creditWrap">
        <Swiper
          modules={[Pagination]}
          className="imgSwiper"
          pagination={{ renderBullet: () => "" }}
          spaceBetween={15}
          slidesOffsetBefore={0}
          slidesOffsetAfter={20}
          slidesPerView={7.5}
        >
          {movieCredits?.cast?.map(
            (credit) =>
              credit?.profile_path && (
                <SwiperSlide key={credit?.id}>
                  <div className="posterContainer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`}
                      alt="Movie Poster"
                      className="poster"
                    />
                  </div>
                  <div className="name">{credit.name}</div>
                  <div className="character">{credit.character}</div>
                </SwiperSlide>
              )
          )}
        </Swiper>
      </div>
    </MovieDetailTemplateStyle>
  );
};

export default MovieDetailTemplate;

const MovieDetailTemplateStyle = styled.div`
  & > .menu {
    display: flex;

    justify-content: center;

    & > .item {
      cursor: pointer;
      list-style: none;

      margin-right: 40px;
      padding: 6px 0px;

      flex-basis: 50px;

      &:last-of-type {
        margin-right: 0px;
      }

      &.active {
        border-bottom: 4px solid #01b4e4;
      }
    }
  }

  & > .infoWrap {
    height: 450px;

    & > .backGround {
      height: 100%;

      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;

      & > .infoContainer {
        height: 100%;

        display: flex;
        align-items: center;
        padding: 30px 40px;

        background: linear-gradient(
          to right,
          rgba(52.5, 10.5, 10.5, 1) calc((50vw - 170px) - 340px),
          rgba(52.5, 10.5, 10.5, 0.84) 50%,
          rgba(52.5, 10.5, 10.5, 0.84) 100%
        );

        & > .left {
          height: 100%;

          & > img {
            height: 100%;
          }
        }
        & > .right {
          flex: 1;

          padding-left: 40px;

          & > .title {
            font-weight: 700;
            color: #fff;

            font-size: 2.2rem;

            & > span {
              opacity: 0.8;
              font-weight: 400;
            }
          }

          & > .info {
            display: flex;
            align-items: center;

            & > .age {
              padding: 0.06em 4px 0.15em !important;

              border: 1px solid rgba(0, 0, 0, 0.6);
              color: rgba(0, 0, 0, 0.6);
              line-height: 1;
              border-radius: 2px;
              margin-right: 7px;
            }

            & > .date {
              font-size: 1em;

              color: #fff;
            }

            & > .field {
              margin-left: 20px;

              color: #fff;
            }

            & > .time {
              margin-left: 20px;
              color: #fff;
            }
          }

          & > .contentContainer {
            margin-top: 20px;

            & > .tagLine {
              margin-bottom: 20px;

              color: #fff;

              font-size: 1.1em;
              font-weight: 400;
              font-style: italic;
              opacity: 0.7;
            }

            & > .title {
              color: #fff;

              font-weight: 600;
              font-size: 1.3em;
            }

            & > .content {
              margin-top: 10px;

              color: #fff;
              font-size: 1em;
            }
          }

          & > .jobContainer {
            margin-top: 10px;

            display: flex;
            align-items: center;

            & > .director {
              margin-right: 30px;
              display: flex;
              flex-direction: column;

              & > .name {
                font-weight: 700;
                color: #fff;
              }

              & > .job {
                font-weight: 400;
                color: #fff;
              }
            }

            & > .writer {
              display: flex;
              flex-direction: column;

              & > .name {
                font-weight: 700;
                color: #fff;
              }

              & > .job {
                font-weight: 400;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }

  & > .creditWrap {
    margin-top: 20px;

    padding: 0 20px;

    text-align: center;

    & .posterContainer {
      position: relative;

      padding-top: 125%;

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

    & .name {
      font-weight: 700;
      color: #000;
    }

    & .character {
      font-size: 0.9em;
    }
  }
  /* & > .creditWrap {
    & > .creditContainer {
      display: flex;
      flex-wrap: wrap;

      & > .creditItem {
        width: 33.3%;
        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 4px 3px;

        & > .item {
          width: 300px;
          border-radius: 10px;

          border: 1px solid #e3e3e3;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

          text-align: center;

          & > img {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            width: 100%;
            height: 200px;
            object-fit: contain;

            vertical-align: middle;
          }

          & > .name {
            font-weight: 700;
            color: #000;
          }

          & > .character {
            font-size: 0.9em;
          }
        }
      }
    }
  } */
`;
