import React from 'react';

const Collection = ({ coll }) => (
  coll.map(({ id, title }) => (
    <p key={id}>{title}</p>
  ))
);

export default Collection;
