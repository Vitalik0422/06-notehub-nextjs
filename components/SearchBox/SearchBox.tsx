import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';
import { RotatingLines } from 'react-loader-spinner';

interface SearchBoxProps {
  searchValue: string;
  handleSearchNoteInput: (query: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}

const SearchBox = ({
  searchValue,
  handleSearchNoteInput,
  isLoading,
}: SearchBoxProps) => {
  return (
    <div className={css.formWrapper}>
      <input
        value={searchValue}
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={handleSearchNoteInput}
      />
      <RotatingLines
        visible={isLoading}
        height="24"
        width="24"
        color="#0d6efd"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default SearchBox;
