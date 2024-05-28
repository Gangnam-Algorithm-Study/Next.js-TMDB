"use client";

import styled from "styled-components";
import Header from "../../_component/Header";
import MovieCard from "../../_component/MovieCard";
import { useEffect, useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { getDetailMovie } from "@/api";

const MovieFavoriteTemplate = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const currentUser = users[0];
    const userFavorites = currentUser ? currentUser.favorites || [] : [];
    setFavorites(userFavorites);
  }, []);

  const movieQueries = favorites.map((movieId) => ({
    queryKey: ["movie", movieId],
    queryFn: () => getDetailMovie(movieId),
  }));

  const movieResults = useQueries({ queries: movieQueries });

  const movies = movieResults
    ? movieResults.map((queryResult) => queryResult.data)
    : [];

  return (
    <MovieFavoriteTemplateStyle>
      <Header />
      <div className="movieWrap">
        <h2>즐겨찾기 목록</h2>
        <div className="movieContainer">
          {movies.map((movie) =>
            movie ? <MovieCard key={movie.id} movie={movie} /> : null
          )}
        </div>
      </div>
    </MovieFavoriteTemplateStyle>
  );
};

export default MovieFavoriteTemplate;

const MovieFavoriteTemplateStyle = styled.div`
  padding-top: 67px;

  & > .movieWrap {
    padding: 30px 40px;

    & > h2 {
      margin-bottom: 30px;
    }
    & > .movieContainer {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
      grid-gap: 15px;
    }
  }
`;
