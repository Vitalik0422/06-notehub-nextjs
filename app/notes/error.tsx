'use client';

import React from 'react';

interface Props {
  error: Error;
}

const Error = ({ error }: Props) => {
  return <p>Could not fetch the list of notes. {error.message}</p>;
};

export default Error;
