import React from 'react'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';

import { langSubset } from './languages'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    maxWidth: 600,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function LanguageFilter({ languages, handlelanguages }) {  
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-lang-label">Language Filter</InputLabel>
      <Select
        labelId="select-lang"
        id="select-id"
        multiple
        value={languages}
        onChange={handlelanguages}
        input={<Input />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {langSubset.map(lang => (
          <MenuItem key={lang.name} value={lang.name}>
            {lang.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}