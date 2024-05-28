"use client";

import { FC } from "react";
import { styled } from "styled-components";

import { useCallback, useState } from "react";
import cx from "classnames";
import { useQuery } from "@tanstack/react-query";
import { getDetailMovie, getMovieCredits, getMovieVideos } from "@/api";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import Header from "@/app/(afterLogin)/_component/Header";
import { useSession } from "next-auth/react";

type Menu = "outline" | "media" | "fandom" | "share";

const MovieDetailTemplate: FC = () => {
  const parms = useParams();

  const movieId = parms.id;
  const { data: user } = useSession();

  const { data: movie } = useQuery({
    queryKey: ["movie", +movieId],
    queryFn: movieId ? () => getDetailMovie(+movieId) : undefined,
  });

  const { data: movieCredits } = useQuery({
    queryKey: ["movieCredits", +movieId],
    queryFn: movieId ? () => getMovieCredits(+movieId) : undefined,
  });

  const { data: movieVideos } = useQuery({
    queryKey: ["movieVideos", +movieId],
    queryFn: movieId ? () => getMovieVideos(+movieId) : undefined,
  });

  const videoKey = movieVideos?.results[0]?.key;

  const directorName = movieCredits?.crew?.find(
    (crewMember) => crewMember?.job === "Director"
  )?.name;

  const [isClick, setIsClick] = useState<Menu>("outline");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users")!)
      : [];
    for (let userId in users) {
      const favorites = users[userId].favorites || [];

      if (favorites.includes(movieId)) {
        return true;
      }
    }

    return false;
  });

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleIsClick = useCallback((item: Menu) => {
    setIsClick(item);
  }, []);

  /** 즐겨찾기 버튼 클릭 */
  const handleHeartClick = useCallback(() => {
    setIsFavorite((prev) => !prev);

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    for (let userId in users) {
      const favorites = users[userId].favorites || [];

      if (favorites.includes(movieId)) {
        users[userId].favorites = favorites.filter(
          (id: string) => id !== movieId
        );
      } else {
        users[userId].favorites = [...favorites, movieId];
      }
    }

    localStorage.setItem("users", JSON.stringify(users));
  }, [movieId]);

  const handleChangeMovieRuntime = useCallback((runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  }, []);

  return (
    <MovieDetailTemplateStyle isModalOpen={isModalOpen}>
      <div className="backdrop" onClick={handleModalClose} />
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
                <div className="heart" onClick={handleHeartClick}>
                  <svg
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.4875 9.88755L7.13438 15.1594C7.36875 15.3782 7.67812 15.5 8 15.5C8.32187 15.5 8.63125 15.3782 8.86563 15.1594L14.5125 9.88755C15.4625 9.00317 16 7.76255 16 6.46567V6.28442C16 4.10005 14.4219 2.23755 12.2688 1.87817C10.8438 1.64067 9.39375 2.1063 8.375 3.12505L8 3.50005L7.625 3.12505C6.60625 2.1063 5.15625 1.64067 3.73125 1.87817C1.57812 2.23755 0 4.10005 0 6.28442V6.46567C0 7.76255 0.5375 9.00317 1.4875 9.88755Z"
                      fill={isFavorite ? "#FF4A4A" : "#fff"}
                    />
                  </svg>
                </div>
              </div>
              <div className="info">
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
                <div className="trailer" onClick={handleModalOpen}>
                  예고편 재생
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
        {isModalOpen && (
          <Modal>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Modal>
        )}
      </div>
    </MovieDetailTemplateStyle>
  );
};

export default MovieDetailTemplate;

interface MovieDetailTemplateStyleProps {
  isModalOpen?: boolean;
}

const MovieDetailTemplateStyle = styled.div<MovieDetailTemplateStyleProps>`
  height: 100vh;
  position: relative;

  & > .backdrop {
    display: ${(props) => (props.isModalOpen ? "block" : "none")};
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    width: 100%;
    height: 100%;
    z-index: 999;

    background-color: rgba(0, 0, 0, 0.6);

    cursor: pointer;
  }
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
            display: flex;
            align-items: center;

            font-weight: 700;
            color: #fff;

            font-size: 2.2rem;

            & > span {
              opacity: 0.8;
              font-weight: 400;
            }

            & > .heart {
              cursor: pointer;
              margin-left: 20px;
              & > svg {
                width: 25px;
                height: 25px;
              }
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

            & > .trailer {
              cursor: pointer;

              padding: 5px 10px;

              border: 1px solid #fff;
              border-radius: 10px;

              margin-left: 20px;
              color: #fff;

              &:hover {
                border: 1px solid #b49d99;
                color: #b49d99;
              }
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
`;

const Modal = styled.div`
  position: fixed;

  z-index: 1000;
  top: 50%;
  left: 50%;

  width: 80%;
  height: 80%;

  background: rgba(0, 0, 0, 0.8);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
`;
