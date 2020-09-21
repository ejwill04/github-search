import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

function Details({ detailedPage, toggleDetails }) {
  const {
    name,
    description,
    stargazers_count,
    language,
    owner
  } = detailedPage

  return (
    <>
      <button onClick={() => toggleDetails()}>Go Back</button>
      <Card variant="outlined">
        <Typography>{name}</Typography>
        <Typography>{description}</Typography>
        <Typography>{stargazers_count}</Typography>
        <Typography>{language}</Typography>
        <Typography>{owner.login}</Typography>
      </Card>
    </>
  )
}

export default Details;