import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

// import { thing } from './ex';

const useStyles = makeStyles({
  card: {
    width: '100%',
    padding: '12px 0',
    margin: 3,
    '&:hover': {
      backgroundColor: 'lightgray',
      cursor: 'pointer'
    }
  },
});

function Results({ searchResults, page, handleUpdatePage, toggleDetails }) {
  const classes = useStyles();
  const { items, totalCount, totalPages } = searchResults;

  if (!totalCount) {
    return null
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
      {`Total Results: ${totalCount.toLocaleString()}`}
      <Pagination count={+totalPages} color="primary" page={page} onChange={handleUpdatePage} />
      {items.map((item, index) => {
        return (
          <Card key={index} className={classes.card} variant="outlined" onClick={() => toggleDetails(item)}>
            <Typography variant="body2" component="p">
              {item.name}
            </Typography>
          </Card>
        )
      })}
    </div>
  )
}

export default Results