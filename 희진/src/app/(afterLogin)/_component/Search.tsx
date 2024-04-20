import { FC } from "react";
import { styled } from "styled-components";

type Props = {
  search: string;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeMovieSearch: () => void;
};

const Search: FC<Props> = ({ search, onChangeSearch, onChangeMovieSearch }) => {
  return (
    <SearchStyle>
      <input
        type="text"
        placeholder="영화,TV프로그램, 인물 검색..."
        value={search}
        onChange={onChangeSearch}
      />
      <div className="button" onClick={onChangeMovieSearch}>
        Search
      </div>
    </SearchStyle>
  );
};

export default Search;

const SearchStyle = styled.form`
  position: relative;

  width: 100%;

  & > input {
    width: 100%;

    padding: 10px 20px;

    font-size: 1.1em;
    color: rgba(0, 0, 0, 0.5);
    border: 0;
    border-radius: 30px;

    &:focus {
      outline: none;
    }
  }

  & > .button {
    cursor: pointer;

    height: 100%;

    padding: 10px 26px;
    border: 0;
    background: #23b9d4;
    border-radius: 30px;
    position: absolute;
    top: 0;
    right: -1px;
    color: #fff;

    font-weight: 700;

    &:hover {
      color: #000;
    }
  }
`;
