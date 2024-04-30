"use client";

import {
  GetFilterMoviesOption,
  getMovieGenres,
  getMovieLanguages,
  getMovieProviders,
} from "@/api";
import RangeSlider from "react-range-slider-input";
import { useQuery } from "@tanstack/react-query";
import { FC, memo, useCallback, useState } from "react";
import styled from "styled-components";
import cx from "classnames";
import Calendar from "rc-calendar";
import Picker from "rc-calendar/lib/Picker";

import "react-range-slider-input/dist/style.css";
import { sortOptions } from "@/utils/constant";
import dayjs from "dayjs";

interface Props {
  onSearch: (option: GetFilterMoviesOption) => void;
}

const MovieFilter: FC<Props> = ({ onSearch }) => {
  const calendar = <Calendar showDateInput={false} />;

  const { data: movieGenres } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: getMovieGenres,
  });

  const { data: languages } = useQuery({
    queryKey: ["languages"],
    queryFn: getMovieLanguages,
  });

  const { data: movieProviders } = useQuery({
    queryKey: ["movieProviders"],
    queryFn: getMovieProviders,
  });

  const krProviders = movieProviders?.results.filter((provider) =>
    provider.display_priorities.hasOwnProperty("KR")
  );

  const [isPriorityCardClicked, setIsPriorityCardClicked] = useState(false);
  const [selectedPriority, setSelectedPriority] =
    useState<string>("popularity.desc");
  const [isProviderCardClicked, setIsProviderCardClicked] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<number[]>([]);

  const [isFilterCardClicked, setIsFilterCardClicked] = useState(false);
  const [fromDate, setFromDate] = useState<dayjs.Dayjs>();
  const [toDate, setToDate] = useState<dayjs.Dayjs>();
  const [runTime, setRunTime] = useState<number[]>([0, 400]);
  const [userScore, setUserScore] = useState<number[]>([0, 10]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const togglePriorityCard = useCallback(() => {
    setIsPriorityCardClicked((prev) => !prev);
  }, []);

  const toggleProviderCard = useCallback(() => {
    setIsProviderCardClicked((prev) => !prev);
  }, []);

  const toggleFilterCard = useCallback(() => {
    setIsFilterCardClicked((prev) => !prev);
  }, []);

  /** 정렬 선택 */
  const handleSelectPriority = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedPriority(e.target.value);
    },
    []
  );

  /** 영화 제공 업체 선택 */
  const handleSelectProviders = useCallback((provider: number | number[]) => {
    if (Array.isArray(provider)) {
      setSelectedProvider(provider);
    } else {
      setSelectedProvider((prev) => {
        const isProviderSelected = prev.includes(provider);
        if (isProviderSelected) {
          return prev.filter((id) => id !== provider);
        } else {
          return [...prev, provider];
        }
      });
    }
  }, []);

  const handleChangeFromDate = useCallback((value: any) => {
    setFromDate(value);
  }, []);

  const handleChangeToDate = useCallback((value: any) => {
    setToDate(value);
  }, []);

  const handleChangeRunTime = useCallback((_runTime: number[]) => {
    setRunTime(_runTime);
  }, []);

  /** 유저 점수 선택 */
  const handleUserScore = useCallback((score: number[]) => {
    setUserScore(score);
  }, []);

  /** 언어 선택 */
  const handleSelectLanguage = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedLanguage(e.target.value);
    },
    []
  );

  /** 장르 선택 */
  const handleSelectGenre = useCallback((genre: number | number[]) => {
    if (Array.isArray(genre)) {
      setSelectedGenres(genre);
    } else {
      setSelectedGenres((prev) => {
        const isGenreSelected = prev.includes(genre);
        if (isGenreSelected) {
          return prev.filter((id) => id !== genre);
        } else {
          return [...prev, genre];
        }
      });
    }
  }, []);

  return (
    <MovieFilterStyle>
      <div
        className={cx("card", {
          active: isPriorityCardClicked,
        })}
        onClick={togglePriorityCard}
      >
        정렬
        <svg
          className={isPriorityCardClicked ? "rotate" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.517582 12.4712C0.231135 12.1827 0.231134 11.7172 0.517581 11.4287L4.91482 7L0.517581 2.57133C0.231134 2.28283 0.231134 1.81726 0.517581 1.52876C0.806928 1.23735 1.27825 1.23735 1.5676 1.52876L6.30042 6.29542C6.68759 6.68536 6.68759 7.31464 6.30042 7.70458L1.5676 12.4712C1.27825 12.7627 0.806929 12.7627 0.517582 12.4712Z"
            fill="#5A5F67"
          />
        </svg>
      </div>
      {isPriorityCardClicked && (
        <div className="priorityContainer">
          <h3>Sort Results By</h3>
          <select
            onChange={handleSelectPriority}
            className="select"
            value={selectedPriority}
          >
            {sortOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      )}
      <div
        className={cx("card", {
          active: isProviderCardClicked,
        })}
        onClick={toggleProviderCard}
      >
        Where To Watch
        <svg
          className={isProviderCardClicked ? "rotate" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.517582 12.4712C0.231135 12.1827 0.231134 11.7172 0.517581 11.4287L4.91482 7L0.517581 2.57133C0.231134 2.28283 0.231134 1.81726 0.517581 1.52876C0.806928 1.23735 1.27825 1.23735 1.5676 1.52876L6.30042 6.29542C6.68759 6.68536 6.68759 7.31464 6.30042 7.70458L1.5676 12.4712C1.27825 12.7627 0.806929 12.7627 0.517582 12.4712Z"
            fill="#5A5F67"
          />
        </svg>
      </div>
      {isProviderCardClicked && (
        <div className="providerContainer">
          {krProviders?.map((provider) => (
            <div className="imgContainer" key={provider.provider_id}>
              <img
                onClick={() => handleSelectProviders(provider.provider_id)}
                className={cx("img", {
                  active: selectedProvider.includes(provider.provider_id),
                })}
                src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                alt=""
              />
              <div className="tooltip">{provider.provider_name}</div>
              <div
                className={cx("click", {
                  active: selectedProvider.includes(provider.provider_id),
                })}
                onClick={() => handleSelectProviders(provider.provider_id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="13"
                  viewBox="0 0 17 13"
                  fill="none"
                >
                  <path
                    d="M2 5.62411L6.89863 10.6775L15 2.32046"
                    stroke="white"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
          <div className="hidden" />
          <div className="hidden" />
        </div>
      )}
      <div
        className={cx("card", {
          active: isFilterCardClicked,
        })}
        onClick={toggleFilterCard}
      >
        필터
        <svg
          className={isFilterCardClicked ? "rotate" : ""}
          xmlns="http://www.w3.org/2000/svg"
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.517582 12.4712C0.231135 12.1827 0.231134 11.7172 0.517581 11.4287L4.91482 7L0.517581 2.57133C0.231134 2.28283 0.231134 1.81726 0.517581 1.52876C0.806928 1.23735 1.27825 1.23735 1.5676 1.52876L6.30042 6.29542C6.68759 6.68536 6.68759 7.31464 6.30042 7.70458L1.5676 12.4712C1.27825 12.7627 0.806929 12.7627 0.517582 12.4712Z"
            fill="#5A5F67"
          />
        </svg>
      </div>
      {isFilterCardClicked && (
        <>
          <div className="releaseContainer">
            <h3>개봉일</h3>
            <div className="calendar">
              <div className="from">From</div>
              <Picker
                value={fromDate}
                disabled={false}
                calendar={calendar}
                onChange={handleChangeFromDate}
              >
                {({ value }) => {
                  return (
                    <input
                      inputMode="none"
                      value={value ? value.format("YYYY-MM-DD") : ""}
                      readOnly
                    />
                  );
                }}
              </Picker>
            </div>
            <div className="calendar">
              <div className="from">To</div>
              <Picker
                value={toDate}
                disabled={false}
                calendar={calendar}
                onChange={handleChangeToDate}
              >
                {({ value }) => {
                  return (
                    <input
                      inputMode="none"
                      value={value ? value.format("YYYY-MM-DD") : ""}
                      readOnly
                    />
                  );
                }}
              </Picker>
            </div>
          </div>
          <div className="runTimeContainer">
            <h3>런타임</h3>
            <RangeSlider
              min={0}
              max={400}
              value={runTime}
              onInput={handleChangeRunTime}
            />
            <div className="runTime">
              상영 시간 :&nbsp;
              <span
                className={cx({
                  active: runTime[0] > 0,
                })}
              >
                {runTime[0]}
              </span>
              &nbsp;-&nbsp;
              <span
                className={cx({
                  active: runTime[1] < 10,
                })}
              >
                {runTime[1]}
              </span>
            </div>
          </div>
          <div className="scoreContainer">
            <h3>유저 점수</h3>
            <RangeSlider
              min={0}
              max={10}
              value={userScore}
              onInput={handleUserScore}
            />
            <div className="score">
              현재 점수 :&nbsp;
              <span
                className={cx({
                  active: userScore[0] > 0,
                })}
              >
                {userScore[0]}
              </span>
              &nbsp;-&nbsp;
              <span
                className={cx({
                  active: userScore[1] < 10,
                })}
              >
                {userScore[1]}
              </span>
            </div>
          </div>
          <div className="languageContainer">
            <h3>언어</h3>
            <select
              onChange={handleSelectLanguage}
              className="select"
              value={selectedLanguage}
            >
              <option value="">선택 안함</option>
              {languages
                ?.filter((language) => language.name.trim() !== "")
                .map((language) => (
                  <option key={language.iso_639_1} value={language.iso_639_1}>
                    {language.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="genreWrapper">
            <h3>장르</h3>
            <div className="genreContainer">
              {movieGenres?.genres.map((_genres) => (
                <div
                  className={cx("genre", {
                    active: selectedGenres.includes(_genres.id),
                  })}
                  key={_genres.id}
                  onClick={() => handleSelectGenre(_genres.id)}
                >
                  {_genres.name}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div
        className={cx("search", {
          active:
            selectedGenres.length > 0 ||
            runTime[0] > 0 ||
            runTime[0] < 400 ||
            userScore[0] > 0 ||
            userScore[1] < 10 ||
            selectedLanguage ||
            selectedPriority !== "popularity.desc" ||
            selectedProvider.length > 0,
        })}
        onClick={() =>
          onSearch({
            with_genres: selectedGenres?.join(","),
            with_runtime_gte: runTime[0],
            with_runtime_lte: runTime[1],
            with_original_language: selectedLanguage,
            vote_average_gte: userScore[0],
            vote_average_lte: userScore[1],
            sort_by: selectedPriority,
            with_watch_providers: selectedProvider?.join("|"),
            watch_region: "KR",
            release_date_gte: fromDate?.format("YYYY-MM-DD"),
            release_date_lte: toDate?.format("YYYY-MM-DD"),
          })
        }
      >
        검색
      </div>
    </MovieFilterStyle>
  );
};

MovieFilter.displayName = "MovieFilter";

export default memo(MovieFilter);

const MovieFilterStyle = styled.div`
  margin-top: 20px;

  & > .card {
    cursor: pointer;

    padding: 14px 16px;
    margin-bottom: 20px;

    min-width: 260px;
    width: 260px;
    height: 52px;

    border: 1px solid #e3e3e3;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;

    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    font-weight: 600;

    &.active {
      background-color: #01b4e4;
      color: #fff;
      border: none;
    }

    &:last-of-type {
      margin-bottom: 0px;
    }

    & > svg {
      transition: transform 0.3s ease-in-out;

      &.rotate {
        transition: transform 0.3s ease-in-out;
        transform: rotate(90deg);
      }
    }
  }

  & > .priorityContainer {
    margin-top: 20px;

    & > .select {
      cursor: pointer;

      margin: 10px 0 20px;
      width: 100%;
      padding: 10px;
      outline: none;

      border: 1px solid #9e9e9e;
      border-radius: 5px;

      &:focus {
        border: none;
        outline: 1px solid #01b4e4;
      }
    }
  }

  & > .providerContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    margin-bottom: 20px;

    padding: 0 16px;

    column-gap: 6px;
    row-gap: 10px;

    & > .imgContainer {
      cursor: pointer;

      position: relative;
      & > .img {
        border-radius: 8px;

        width: 50px;
        height: 100%;
      }

      & > .tooltip {
        z-index: 1;

        visibility: hidden;
        background-color: #032541;
        color: #fff;
        text-align: center;
        padding: 5px 5px;
        border-radius: 6px;
        position: absolute;

        bottom: 110%;
        left: 50%;
        margin-left: -28px;
        opacity: 0;
        transition: opacity 0.3s;
      }

      &:hover .tooltip {
        visibility: visible;
        opacity: 1;
      }

      & > .click {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: none;

        &.active {
          display: flex;
          justify-content: center;
          align-items: center;

          border-radius: 8px;

          background: rgba(1, 180, 228, 0.5);

          & > svg {
            width: 32px;
            height: 32px;
          }
        }
      }
    }

    & > .hidden {
      width: 50px;
      height: 50px;
    }
  }

  & > .releaseContainer {
    display: flex;
    flex-direction: column;

    & > .calendar {
      display: flex;
      align-items: center;

      & > .from {
        flex-basis: 40px;
        margin-right: 10px;
      }
      & input {
        width: 100%;
        flex: 1;

        margin-top: 10px;
        padding: 8px 12px;

        border: none;
        border: 1px solid #9e9e9e;
        border-radius: 5px;

        font-size: 14px;
        line-height: 24px;
        text-align: center;

        color: #5c5c5c;

        box-sizing: border-box;

        cursor: pointer;

        &::placeholder {
          font-size: 14px;
          line-height: 24px;

          color: rgba(0, 0, 0, 0.25);
        }

        &:focus {
          border: none;
          outline: 1px solid #01b4e4;
        }
      }
    }
  }

  & > .runTimeContainer {
    margin-top: 20px;

    & > .range-slider {
      margin-top: 20px;
    }

    & > .runTime {
      margin-top: 15px;
      font-size: 20px;
      font-weight: 600;

      padding-bottom: 10px;
      border-bottom: 1px solid #9e9e9e;
      & > span {
        color: #51adf6;
        font-weight: 700;

        &.active {
          color: #01b4e4;
        }
      }
    }
  }

  & > .scoreContainer {
    margin-top: 20px;

    & > .range-slider {
      margin-top: 20px;
    }

    & > .score {
      margin-top: 15px;
      font-size: 20px;
      font-weight: 600;

      padding-bottom: 10px;
      border-bottom: 1px solid #9e9e9e;

      & > span {
        color: #51adf6;
        font-weight: 700;

        &.active {
          color: #01b4e4;
        }
      }
    }
  }

  & > .languageContainer {
    margin-top: 20px;

    & > .select {
      cursor: pointer;

      margin-top: 10px;
      width: 100%;
      padding: 10px;
      outline: none;

      border: 1px solid #9e9e9e;
      border-radius: 5px;

      &:focus {
        border: none;
        outline: 1px solid #01b4e4;
      }
    }
  }
  & > .genreWrapper {
    margin-top: 20px;

    display: flex;
    flex-direction: column;

    & > .genreContainer {
      margin-top: 15px;

      display: flex;
      flex-wrap: wrap;

      & > .genre {
        cursor: pointer;

        padding: 4px;
        margin: 0 5px 10px 0;
        width: 48%;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center;

        border: 1px solid #9e9e9e;
        border-radius: 14px;

        &:nth-of-type(2n) {
          margin-right: 0px;
        }

        &.active {
          background-color: #01b4e4;
          color: #fff;
        }

        &:hover {
          background-color: #01b4e4;
          color: #fff;
        }
      }
    }
  }

  & > .search {
    cursor: pointer;

    background-color: rgba(228, 228, 228, 0.7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: rgba(0, 0, 0, 0.5);

    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    border-radius: 20px;
    height: 44px;

    font-weight: 600;
    font-size: 20px;

    &.active {
      background-color: #01b4e4;
      color: #fff;

      &:hover {
        background-color: #032541;
      }
    }
  }
`;
