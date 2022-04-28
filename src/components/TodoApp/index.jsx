import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
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
    const [list, setList] = useState([]);
    function handleFetchData(url) {
      fetch(url)
      .then( response =>{
        return response.json( );
      })
      .then( data =>{
        setList(data)
      });   
    }
    useEffect(()=>{
        async function fetchList() {
          try {
            const url = 'https://626a10a353916a0fbdf4db6d.mockapi.io/reactTodo';
            handleFetchData(url)
          } catch (error) {
            console.log('Faild to fetch ', error.message);
          }
        }
        fetchList();
    },[])
    async function handleDelete(id) {
      const url = 'https://626a10a353916a0fbdf4db6d.mockapi.io/reactTodo';
     await fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response =>{
      return response.json()
    })
    .then(data => 
        console.log(data) 
    );
    // refetch data before delete
      handleFetchData(url);
    }
    return (
        <div className='todo-app'>
            <Grid container >
                <Grid item xs={12}>
            <h4>Welcome to my TodoAPP</h4>
            <Grid container >
              <Grid item xs={12} md={6}>
              <div className='input-search'>
              <Search>
              <p style={{fontSize:'1.25rem', marginLeft:'2.188rem', fontWeight:'bolder'}}>Search</p>
              <StyledInputBase
                placeholder="Type here to search ..."
                inputProps={{ 'aria-label': 'search' }}
              />
              </Search>
            </div>
              </Grid>
              <Grid item xs={12} md={6}>
              <div className='input-search'>
              <Search>
              <p style={{fontSize:'1.25rem', marginLeft:'2.188rem', fontWeight:'bolder'}}>Add a new todo</p>
              <StyledInputBase
                inputProps={{ 'aria-label': 'search' }}
              />
              <span style={{marginLeft: '1rem'}}><Button variant="contained">Add</Button></span>
              </Search>
            </div>
              </Grid>
            </Grid>
            <Grid container >
                <Grid item xs={12}>
                    <Item>
                <div className='list-items'>
                <ul style={{listStyle: 'none'}}>
                  {list.map(x=>(
                    <li key={x.id}> 
                    {x.title}
                    <span style={{float: 'right'}} onClick={()=>{handleDelete(x.id)}}> <ClearOutlinedIcon /> </span>
                    </li> 
                  ))}               
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