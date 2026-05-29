import css from './ErrorMessage.module.css';
import React from 'react';

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <span className={css.error}>{children}</span>;
};

export default ErrorMessage;
