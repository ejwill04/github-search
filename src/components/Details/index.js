import React from "react";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    padding: "12px 0",
    margin: 3,
  },
  button: {
    marginBottom: 20,
  },
});

function Details({ detailedPage, toggleDetails }) {
  const classes = useStyles();
  const { name, description, stargazers_count, language, owner } = detailedPage;

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        onClick={() => toggleDetails()}
      >
        Back to results
      </Button>
      <Card variant="outlined" className={classes.card}>
        <Typography>Name: {name}</Typography>
        <Typography>Description: {description}</Typography>
        <Typography>Number of stars: {stargazers_count}</Typography>
        <Typography>Language: {language}</Typography>
        <Typography>Owner: {owner.login}</Typography>
      </Card>
    </>
  );
}

export default Details;
