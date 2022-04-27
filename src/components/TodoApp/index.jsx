import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import React from 'react';
import './todoApp.scss';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function TodoApp() {
    return (
        <div className='todo-app'>
            <Grid container >
                <Grid item xs={12}>
            <h4>Welcome to my TodoAPP</h4>
            <div className='input-search'>
            <Search>
            <StyledInputBase
              placeholder="Type here to search ..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
            </div>
            <Grid container >
                <Grid item xs={12}>
                    <Item>
                <div className='list-items'>
                <ul style={{listStyle: 'none'}}>
                    <li> <CampaignOutlinedIcon /> 
                    Hello
                    <span style={{float: 'right'}}> <ClearOutlinedIcon /> </span>
                    </li>
                    <li> <CampaignOutlinedIcon /> Hello
                    <span style={{float: 'right'}}> <ClearOutlinedIcon /> </span>
                    </li>  
                    <li> <CampaignOutlinedIcon /> Hello
                    <span style={{float: 'right'}}> <ClearOutlinedIcon /> </span>
                    </li>  
                    <li> <CampaignOutlinedIcon /> Hello
                    <span style={{float: 'right'}}> <ClearOutlinedIcon /> </span>
                    </li>  
                    <li> <CampaignOutlinedIcon /> Hello
                    <span style={{float: 'right'}}> <ClearOutlinedIcon /> </span>
                    </li>                  
                </ul>
                </div> 
                </Item>                   
                </Grid>
            </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default TodoApp;