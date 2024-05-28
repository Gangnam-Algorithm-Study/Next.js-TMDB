"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
const jwt = require("jsonwebtoken");

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const { data: session } = useSession();

  const localJwt = localStorage.getItem("JWT");

  const decoded = localJwt ? jwt.decode(localJwt) : null;

  const handleLogout = useCallback(async () => {
    await signOut();
  }, []);

  useEffect(() => {
    const handleScrollHide = () => {
      setIsHidden(window.scrollY > 5);
    };

    window.addEventListener("scroll", handleScrollHide);

    return () => {
      window.removeEventListener("scroll", handleScrollHide);
    };
  }, []);

  return (
    <HeaderStyle className={isHidden ? "hidden" : ""}>
      <div className="headerBackground" />

      <div className="headerContainer">
        <div className="headerLeft">
          <Link href="/home">
            <span>TMDB</span>
          </Link>
          <Link href="/movie">
            <strong>영화</strong>
          </Link>
          <Link href="/tv">
            <strong>TV 프로그램</strong>
          </Link>
          <Link href="/peoples">
            <strong>인물</strong>
          </Link>
          <Link href="/more">
            <strong>More</strong>
          </Link>
          {/* {decoded?.profile && (
            <div>
              <img src={decoded?.profile} alt="Profile" />
            </div>
          )} */}
        </div>
        <div className="headerRight">
          {!session ? (
            <>
              <Link href="/SignIn">
                <strong>로그인</strong>
              </Link>
              <Link href="/SignUp">
                <strong>회원가입</strong>
              </Link>
            </>
          ) : (
            <>
              <strong onClick={handleLogout}>로그아웃</strong>
              <Link href="/movie/favorite">
                <strong>즐겨찾기</strong>
              </Link>
            </>
          )}
        </div>
      </div>
    </HeaderStyle>
  );
};
export default Header;

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  background: #032541;

  &.hidden {
    opacity: 0;

    background: #032541;
  }

  & .headerContainer {
    padding: 20px 150px;
    background: #032541;

    display: flex;
    justify-content: space-between;
    align-items: center;

    & .headerLeft {
      color: #fff;
      display: flex;
      align-items: center;
      & span {
        color: #23b9d4;
        font-weight: bold;
        font-size: 20px;
        margin-right: 20px;
        cursor: pointer;
      }

      & strong {
        font-size: 15px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    & .headerRight {
      color: #fff;
      display: flex;
      align-items: center;

      & strong {
        font-size: 15px;
        margin-right: 10px;
        cursor: pointer;
      }
    }
  }
`;
