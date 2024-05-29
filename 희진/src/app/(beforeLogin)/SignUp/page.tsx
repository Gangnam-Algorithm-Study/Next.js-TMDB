"use client";

import Header from "@/app/(afterLogin)/_component/Header";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import styled from "styled-components";

const SignUpTemplate = () => {
  const router = useRouter();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleChangeId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    },
    []
  );

  const handleChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value);
    },
    []
  );

  const handleSignUp = useCallback(() => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      router.replace("/SignIn");
      const user = { id, password, favorites: [] };

      const users = localStorage.getItem("users")
        ? (JSON.parse(localStorage.getItem("users")!) as any[])
        : [];

      localStorage.setItem("users", JSON.stringify([...users, user]));
    }
  }, [id, password, passwordConfirm, router]);

  return (
    <SignUpTemplateStyle>
      <Header />
      <div className="loginContainer">
        <h2 className="title">회원가입</h2>
        <div className="inputWrap">
          <label htmlFor="username">
            아이디
            <input
              type="text"
              id="username"
              onChange={handleChangeId}
              value={id}
            />
          </label>
          <label htmlFor="password">
            비밀번호
            <input
              type="password"
              id="password"
              onChange={handleChangePassword}
              value={password}
            />
          </label>
          <label htmlFor="password">
            비밀번호 확인
            <input
              type="password"
              id="password"
              onChange={handleChangePasswordConfirm}
              value={passwordConfirm}
            />
          </label>
        </div>
        <div className="button" onClick={handleSignUp}>
          회원가입
        </div>
      </div>
    </SignUpTemplateStyle>
  );
};

export default SignUpTemplate;

const SignUpTemplateStyle = styled.div`
  padding-top: 67px;

  & > .loginContainer {
    margin: 0 auto;
    padding: 30px 40px;

    max-width: 1300px;

    & > .inputWrap {
      margin-top: 20px;

      display: flex;
      flex-direction: column;

      & > label {
        margin-bottom: 10px;

        cursor: pointer;

        display: flex;
        flex-direction: column;

        & > input {
          margin-top: 5px;

          width: 100%;

          padding: 6px 12px;
          outline: none;

          border: 1px solid #9e9e9e;
          border-radius: 5px;

          font-size: 1em;
          &:focus {
            border: none;
            outline: 1px solid #01b4e4;
          }
        }
      }
    }

    & > .button {
      margin-top: 20px;

      cursor: pointer;

      background-color: #01b4e4;
      color: #fff;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);

      width: 90px;

      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      border-radius: 10px;
      height: 36px;

      font-weight: 600;
      font-size: 20px;

      &:hover {
        background-color: #032541;
      }
    }
  }
`;
