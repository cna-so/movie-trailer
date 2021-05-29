import React, { useEffect, useState } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import axios from "api/axios";

import MovieListItem from "./MovieListItem";

const baseURL = "https://image.tmdb.org/t/p/w185/";

const MovieList = ({ sectionTitle, fetchUrl }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const { data } = await axios.get(fetchUrl);
    setMovies(data.results);
    return data;
  };

  const opts = {
    autoPlay: 1,
    height: "390",
    width: "100%",
  };

  const youtubeHandler = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h1 style={{ marginLeft: "1rem" }}>{sectionTitle}</h1>
      <Container>
        {movies?.map((movie) => (
          <div onClick={() => youtubeHandler(movie)}>
            <MovieListItem
              key={movie.id}
              secName="Action Movies"
              title={movie.title}
              rating={movie.vote_average}
              date={new Date(movie.release_date)}
              image={`${baseURL}${movie?.poster_path}`}
            />
          </div>
        ))}
      </Container>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </>
  );
};

const Container = styled.div`
  display: flex;
  /* overflow-y: hidden; */
  overflow-x: scroll;
  margin: 20px;
`;

export default MovieList;
