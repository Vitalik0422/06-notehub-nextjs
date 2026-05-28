'use client';
import css from './Error.module.css';
interface Props {
  error: Error;
  reset: () => void;
}

const Error = ({ error, reset }: Props) => {
  return (
    <>
      <p>Could not fetch the list of notes. {error.message}</p>
      <button className={css.errorBtn} onClick={reset}>
        Try again
      </button>
    </>
  );
};

export default Error;
