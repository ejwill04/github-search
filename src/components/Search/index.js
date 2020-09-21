import React, { useState, useEffect } from 'react';

import { Octokit } from '@octokit/rest';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import ResultsBar from './ResultsBar';
import Details from '../Details'

const octokit = new Octokit();

const requestGitHubRepos = async ({ searchTerm, page, sort, languages }) => {
  const terms = searchTerm.replace(' ', '+')
  let q = `${terms}`
  const language = languages.reduce((arr, lang) => {
    if (lang.checked) {
      arr.push(lang.name)
    }
    return arr
  }, [])
  if (language.length) {
    q = `${q}+language:${language.join('+')}`;
  }
  try {
    const res = await octokit.search
      .repos({  
        q,
        per_page: 30,
        page,
        sort
      })

    const totalPages = res.headers.link.split(' ')[2].match('&page=(.*)>')[1].split(/[&]/)[0]
    const { items, total_count } = res.data
    const languages = [...new Set(items.map(obj => obj.language))].filter(Boolean)
    return {
      totalPages,
      totalCount: total_count,
      items,
      languages
    }
  } catch(err) {
    console.log(err)
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),

    },
  },
}));

const LanguageFilter = ({ languages, handlelanguages }) => {
  if (!languages.length) {
    return null
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Filter by language</FormLabel>
      <FormGroup>
        {languages.map(lang => (<FormControlLabel
          control={<Checkbox checked={lang.checked} onChange={handlelanguages} name={lang.name} />}
          key={lang.name}
          label={lang.name}
        />))}
      </FormGroup>
      <FormHelperText>Leave blank to search for all</FormHelperText>
    </FormControl>
  )
}

const SortType = ({ sort, setSort }) => {
  return (
    <Select
      labelId="demo-simple-select-label"
      id="simple-select"
      value={sort}
      onChange={e => setSort(e.target.value)}
    >
      <MenuItem value='bestMatch'>Best Match</MenuItem>
      <MenuItem value='stars'>Stars</MenuItem>
    </Select>
  )
}

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
        debugger
        setSearchResults(results)
        setLanguages(results.languages.map(lang => ({ name: lang, checked: false })))
        setfetchingResults(false)
      }
      fetchMyApi()
    }
  }, [fetchingResults, searchTerm, page])

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

  const handlelanguages = (e, checked) => {
    const arr = [...languages].map(lang => lang.name === e.target.name ? { name: lang.name, checked } : lang)
    setLanguages(arr)
  }
 
  return (
    <div>
      Search
      <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSearchSubmit}>
        <TextField 
          id="outlined-basic" 
          label="Search For Repos" 
          variant="outlined" 
          onChange={handleSearchChange} />
        <IconButton aria-label="search" type="submit" value="Submit">
          <SearchIcon />
        </IconButton>
        <SortType sort={sort} setSort={setSort} />
        <LanguageFilter languages={languages} handlelanguages={handlelanguages} />
      </form>
      {detailedPage ?
        <Details detailedPage={detailedPage} toggleDetails={toggleDetails} /> :
        <ResultsBar searchResults={searchResults} page={page} handleUpdatePage={handleUpdatePage} toggleDetails={toggleDetails} />
      }
    </div>
  )
}

export default Search;