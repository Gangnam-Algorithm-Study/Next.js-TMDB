"use client";

import { FC } from "react";
import { styled } from "styled-components";
import Header from "../../_component/Header";
import Main from "./Main";

const HomeTemplate: FC = () => {
  return (
    <HomeStyle>
      <Header />
      <Main />
    </HomeStyle>
  );
};

export default HomeTemplate;

const HomeStyle = styled.div`
  height: 100%;

  padding-bottom: 50px;
`;
