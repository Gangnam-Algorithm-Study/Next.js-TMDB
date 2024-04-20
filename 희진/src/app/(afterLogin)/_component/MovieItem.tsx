"use client";

import { MovieResult } from "@/@types";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";
import { styled } from "styled-components";

import "dayjs/locale/ko";

dayjs.locale("ko");

type Props = {
  movie: MovieResult;
};

const MovieItem: FC<Props> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie?.id}`}>
      <MovieItemStyle>
        <div className="posterContainer">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
            alt="Movie Poster"
            className="poster"
          />
        </div>
        <div className="content">
          <div className="title">{movie?.title}</div>
          <div className="date">
            {dayjs(movie.release_date).format("MM월 DD, YYYY")}
          </div>
        </div>
      </MovieItemStyle>
    </Link>
  );
};

export default MovieItem;

const MovieItemStyle = styled.div`
  cursor: pointer;
  & > .posterContainer {
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

  & > .content {
    padding: 26px 10px 0;

    & > .title {
      font-size: 1em;
    }

    & > .date {
      font-size: 1em;

      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
