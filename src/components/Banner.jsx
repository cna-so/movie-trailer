/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import { TiStarHalfOutline } from "react-icons/ti";
import { MdAdd, MdPlayArrow } from "react-icons/md";

import axios from "api/axios";
import requests from "api/requests";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState();

  useEffect(() => fetchBannerSliderData(), []);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  const fetchBannerSliderData = async () => {
    try {
      const { data } = await axios.get(requests.fetchNetflixOriginals);
      setMovies(data.results.slice(4, 9));
      return data;
    } catch (err) {}
  };

  const opts = {
    autoPlay: 1,
    height: "390",
    width: "100%",
  };

  const youtubeHandler = (name) => {
    console.log(movies)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Carousel {...settings}>
        {movies.map((movie) => (
          <Wrap key={movie.id}>
            <div />
            <a>
              <div
                style={{
                  backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                }}
              ></div>
            </a>
            <Content>
              <div>
                <h3>
                  <TiStarHalfOutline /> {movie.vote_average}
                  <span>
                    {movie.original_language} | {movie.origin_country[0]}
                  </span>
                </h3>
                <h1>{movie.name}</h1>
                <p>{movie?.overview}</p>
                <div>
                  <WatchBtn onClick={() => youtubeHandler(movie?.name)}>
                    <MdPlayArrow /> WATCH
                  </WatchBtn>
                  <AddBtn disabled={true}>
                    <MdAdd /> ADD
                  </AddBtn>
                </div>
              </div>
            </Content>
          </Wrap>
        ))}
      </Carousel>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </>
  );
};

const Carousel = styled(Slider)`
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
  }

  .slick-next {
    right: -75px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  & > div {
    position: absolute;
    left: 0;
    top: 0;
    inset: 0px;
    background: rgba(0, 0, 0, 0.3);
  }
  a {
    z-index: -1;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;

    div {
      width: 100%;
      height: 60vh;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 10%;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  & > div {
    width: 50%;

    & > div {
      display: flex;
    }
  }
  h3 {
    display: flex;
    align-items: center;
    & svg {
      color: yellow;
    }
    span {
      font-size: 15px;
      font-weight: 100;
      padding-left: 25px;
    }
    p {
      font-weight: bolder;
    }
  }

  @media screen and (max-width: 768px) {
    p {
      display: none;
    }
  }
`;
const WatchBtn = styled.button`
  background: #ff0d1f;
  padding: 0.8rem 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const AddBtn = styled.button`
  background: #000;
  padding: 0.8rem 2.5rem;
  border-radius: 1rem;
  margin-left: 25px;
  display: flex;
  align-items: center;
  cursor: not-allowed;

  @media screen and (max-width: 768px) {
    padding: 0.8rem 2.5rem;
  }
`;

export default Banner;
