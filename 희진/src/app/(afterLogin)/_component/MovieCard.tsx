"use client";

import { MovieResult } from "@/@types";
import dayjs from "dayjs";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";

type Props = {
  movie: MovieResult;
};

const MovieCard: FC<Props> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} legacyBehavior>
      <MovieCardStyle>
        <div className="posterContainer">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt="Movie Poster"
            className="poster"
          />
        </div>
        <div className="textContainer">
          <div className="name">{movie.title}</div>
          <div className="releaseDate">
            {dayjs(movie.release_date).format("MM월 DD, YYYY")}
          </div>
        </div>
      </MovieCardStyle>
    </Link>
  );
};

export default MovieCard;

const MovieCardStyle = styled.div`
  cursor: pointer;

  box-sizing: border-box;
  border: 1px solid #e3e3e3;

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;

  & > .posterContainer {
    position: relative;
    display: flex;
    overflow: hidden;
    padding-top: 150%;
    background: #0a151f;
    transition: opacity 0.1s ease;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;

    & > .poster {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      border-top-right-radius: 5px;
      border-top-left-radius: 5px;

      object-fit: cover;
      object-position: center;
    }
  }

  & > .textContainer {
    padding: 10px;

    & > .name {
      margin-top: 10px;
      font-size: 15px;
      font-weight: 600;
    }

    & > .releaseDate {
      margin-top: 5px;

      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
    }
  }
`;
