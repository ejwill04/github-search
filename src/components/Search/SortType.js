import React from 'react'

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

export default function SortType({ sort, setSort }) {
  return (
    <>
      <InputLabel id="select-lang-label">Sort Order</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="simple-select"
        value={sort}
        style={{ width: 200 }}
        onChange={e => setSort(e.target.value)}
      >
        <MenuItem value='bestMatch'>Best Match (default)</MenuItem>
        <MenuItem value='stars'>Stars</MenuItem>
      </Select>
    </>
  )
}