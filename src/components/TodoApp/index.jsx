import CheckIcon from '@mui/icons-material/Check';
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
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')

    const url = 'https://626a10a353916a0fbdf4db6d.mockapi.io/reactTodo';
    function handleFetchData(url, search) {
      fetch(url)
      .then( response =>{
        return response.json( );
      })
      .then(data =>{
      setList(data.filter(x=>x.title.toLowerCase().includes(search.toLowerCase())))
      });   
    }
    useEffect(()=>{
        async function fetchList() {
          try {
            handleFetchData(url, search)
          } catch (error) {
            console.log('Faild to fetch ', error.message);
          }
        }
        fetchList();
    },[search])
    async function handleDelete(id) {
     await fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response =>{
      handleFetchData(url); //refetch data before delete
      return response.json()
    })
    .then(data => 
        console.log(data) 
    );
    }
    function handleValueChange(e) {
      setValue(e.target.value)
    }
    function handleUpdateStatus(id) {
      const myDataObject = { status : true};
      fetch(url+'/'+id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(myDataObject)
      })
      .then(response => {
          handleFetchData(url); //refetch data before update status
          return response.json( )
      })
      .then(data => 
          // this is the data we get after putting our data, do whatever you want with this data
          console.log(data) 
      );
    }
    function handleAdd(e) {
      e.preventDefault();
      const myDataObject = {title : value, status : false};
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myDataObject)
      })
      .then(response => {
        handleFetchData(url); //refetch data before add
        setValue('')
          return response.json( )
      })
      .then(data => 
          console.log(data) 
      );
    }
    function handleSearch(e) {
      setSearch(e.target.value)
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
                value={search}
                onChange={handleSearch}
              />
              </Search>
            </div>
              </Grid>
              <Grid item xs={12} md={6}>
              <div className='input-search'>
              <Search>
              <p style={{fontSize:'1.25rem', marginLeft:'2.188rem', fontWeight:'bolder'}}>Add a new todo</p>
            <form>
            <StyledInputBase
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={handleValueChange}
              />
              <span style={{marginLeft: '1rem'}}>
              <Button 
              variant="contained"
              onClick={handleAdd}
              >Add</Button></span>
               </form>
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
                    <li key={x.id} style={{backgroundColor: x.status===true?'#26de81':'#273c75' }}> 
                    {x.title}
                    <span style={{float: 'right'}} onClick={()=>{handleDelete(x.id)}}> <ClearOutlinedIcon /> </span>
                    <span style={{float:'right'}} onClick={()=>{handleUpdateStatus(x.id)}}> <CheckIcon /> </span>
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