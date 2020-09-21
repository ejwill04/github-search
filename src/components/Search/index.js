import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import ResultsBar from './ResultsBar';
import Details from '../Details'
import LanguageFilter from './LanguageFilter'
import SortType from './SortType'

import { requestGitHubRepos } from '../../api'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),

    },
  },
}));

function Search() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchingResults, setfetchingResults] = useState(false);
  const [searchResults, setSearchResults] = useState({ items: [] });
  const [page, setPage] = useState(1);
  const [detailedPage, setDetailedPage] = useState(null);
  const [sort, setSort] = useState('bestMatch');
  const [languages, setLanguages] = useState([])

  useEffect(() => {
    if (fetchingResults) {
      async function fetchMyApi() {
        const results = await requestGitHubRepos({ searchTerm, page, sort, languages });
        setSearchResults(results)
        setfetchingResults(false)
      }
      fetchMyApi()
    }
  }, [fetchingResults, searchTerm, page, languages, sort])

  const handleSearchChange = e => {
    setSearchTerm(e.target.value)
  }

  const handleSearchSubmit = e => {
    setfetchingResults(true);
    e.preventDefault();
  }

  const handleUpdatePage = (e, value) => {
    setPage(value)
    setfetchingResults(true)
  }

  const toggleDetails = (a) => {
    setDetailedPage(a)
  }

  const handlelanguages = e => {
    setLanguages(e.target.value)
  }
 
  return (
    <div>
      <h2>Search For GitHub Repos</h2>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSearchSubmit}>
        <TextField 
          id="outlined-basic" 
          label="Search For Repos" 
          variant="outlined" 
          onChange={handleSearchChange} />
        <IconButton aria-label="search" type="submit" value="Submit" disabled={!searchTerm.trim()}>
          <SearchIcon />
        </IconButton>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SortType sort={sort} setSort={setSort} />
          <LanguageFilter languages={languages} handlelanguages={handlelanguages} />
        </div>
      </form>
      {detailedPage ?
        <Details detailedPage={detailedPage} toggleDetails={toggleDetails} /> :
        <ResultsBar searchResults={searchResults} page={page} handleUpdatePage={handleUpdatePage} toggleDetails={toggleDetails} />
      }
    </div>
  )
}

export default Search;