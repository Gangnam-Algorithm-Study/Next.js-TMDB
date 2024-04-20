// "use client";

import { ReactNode } from "react";
import { styled } from "styled-components";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default Layout;

// const LayoutStyle = styled.div`
//   display: flex;
//   flex-direction: column;
//   background-color: rgb(var(--background-end-rgb));
//   width: 100dvw;
//   min-height: 100%;
// `;
