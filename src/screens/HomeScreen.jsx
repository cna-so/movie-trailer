import React, { useEffect, useState } from "react";
import styled from "styled-components";

import requests from "api/requests";

import Nav from "components/Nav";
import Banner from "components/Banner";
import Viewvers from "components/Viewvers";
import MovieList from "components/MovieList";

const HomeScreen = () => {
  return (
    <Home>
      <BgContainer>
        <Nav />
        <Banner />
      </BgContainer>
      <Container>
        <Viewvers />
      </Container>
      <MovieList
        sectionTitle="Action Movies"
        fetchUrl={requests.fetchActionMovies}
      />
      <MovieList
        sectionTitle="ComedyMovies"
        fetchUrl={requests.fetchComedyMovies}
      />
      <MovieList
        sectionTitle="Trend Movies"
        fetchUrl={requests.fetchTrending}
      />
      <MovieList
        sectionTitle="Top Rated Movies"
        fetchUrl={requests.fetchTopRated}
      />
      <MovieList
        sectionTitle="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
      />
      <MovieList
        sectionTitle="RomanceMovies"
        fetchUrl={requests.fetchRomanceMovies}
      />
      <MovieList
        sectionTitle="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
      />
    </Home>
  );
};

const Home = styled.section`
  padding: 0 0 4rem 0;
`;

const Container = styled.main`
  position: relative;
  padding: 0 calc(3.5vw + 5px);
  overflow-x: hidden;
  overflow-y: auto;
`;

const BgContainer = styled.main`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  display: block;
  padding: 0;
  padding-bottom: 4rem;

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;
export default HomeScreen;
