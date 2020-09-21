import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    width: '100%',
    padding: '12px 0',
    marginTop: 20,
  },
});


function Details({ detailedPage, toggleDetails }) {
  const classes = useStyles();
  const {
    name,
    description,
    stargazers_count,
    language,
    owner
  } = detailedPage

  return (
    <>
      <Button variant="contained" onClick={() => toggleDetails()} >Back to results</Button>
      <Card variant="outlined" className={classes.card} >
        <Typography>Name: {name}</Typography>
        <Typography>Description: {description}</Typography>
        <Typography>Number of stars: {stargazers_count}</Typography>
        <Typography>Language: {language}</Typography>
        <Typography>Owner: {owner.login}</Typography>
      </Card>
    </>
  )
}

export default Details;