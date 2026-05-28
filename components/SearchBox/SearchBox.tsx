import type { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  searchValue?: string;
  handleSearchNoteInput?: (query: ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

const SearchBox = ({ searchValue, handleSearchNoteInput }: SearchBoxProps) => {
  return (
    <div className={css.formWrapper}>
      <input
        value={searchValue}
        className={css.input}
        type="text"
        placeholder="Search notes"
        onChange={handleSearchNoteInput}
      />
    </div>
  );
};

export default SearchBox;
