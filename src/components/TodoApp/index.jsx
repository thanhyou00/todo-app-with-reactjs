import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Slide from '@mui/material/Slide';
import { alpha, styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useRef, useState } from 'react';
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
   
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function TodoApp() {
    const [list, setList] = useState([]);
    const [value, setValue] = useState('')
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('')
    const [valueUpdate, setValueUpdate] = useState({
      id : '',
      title : '',
      status : ''
    })
    const typeingTimeoutRef = useRef(null)
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClickOpen = (id) => {
      setOpen(true);
      fetch(url+'/'+id)
      .then( response =>{
        return response.json( );
      })
      .then(data =>{
      setValueUpdate(data)
      }); 
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const url = 'https://626a10a353916a0fbdf4db6d.mockapi.io/reactTodo';
    function handleFetchData(url, search) {
      fetch(url)
      .then( response =>{
        return response.json( );
      })
      .then(data =>{
      setList(data.filter(x=>x.title.includes(search)))
      });   
    }
    useEffect(()=>{
        async function fetchList() {
          try {
            handleFetchData(url, filter)
          } catch (error) {
            console.log('Faild to fetch ', error.message);
          }
        }
        fetchList();
    },[filter])
    async function handleDelete(id) {
     await fetch(url+'/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    .then(response =>{
      handleFetchData(url, search); //refetch data before delete
      return response.json()
    })
    .then(data => 
        console.log(data) 
    );
    }
    function handleValueChange(e) {
      setValue(e.target.value)
    }
    function handleUpdateChange(e) {
      setValueUpdate({
        ...valueUpdate,
        title : e.target.value
      })
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
          handleFetchData(url, search); //refetch data before update status
          return response.json( )
      })
      .then(data => 
          // this is the data we get after putting our data, do whatever you want with this data
          console.log(data) 
      );
    }
    function handleUpdateTitle(id, title) {
      const myDataObject = { title : title};
      fetch(url+'/'+id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(myDataObject)
      })
      .then(response => {
          handleFetchData(url, search); //refetch data before update status
          handleClose()
          return response.json()
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
        handleFetchData(url, search); //refetch data before add
        setValue('')
          return response.json( )
      })
      .then(data => 
          console.log(data) 
      );
    }
    function handleSearch(e) {
    setSearch(e.target.value)
    if(typeingTimeoutRef.current) {
        clearTimeout(typeingTimeoutRef.current)
    }
    // using debounce
    typeingTimeoutRef.current = setTimeout(() => {
      setFilter(e.target.value)
    }, 1000);
    }

    return (
        <div className='todo-app'>
            <Grid container >
                <Grid item xs={12} >
            <h4>Welcome to my TodoAPP</h4>
            <Grid container >
              <Grid item xs={12} md={6}>
              <div className='input-search'>
              <Search>
              <p style={{fontSize:'1.25rem', marginLeft:'2.188rem', fontWeight:'bolder'}}>Search</p>
              <input type="text" 
              className='input-search-debounce'                
              value={search}
              onChange={handleSearch} />
              </Search>
            </div>
              </Grid>
              <Grid item xs={12} md={6}>
              <div className='input-search'>
              <Search>
              <p style={{fontSize:'1.25rem', marginLeft:'2.188rem', fontWeight:'bolder'}}>Add a new todo</p>
            <form>
            <input
                className='input-add'
                value={value}
                onChange={handleValueChange}
              />
              <span style={{marginLeft: '2.5rem'}}>
              <Button 
              variant="contained"
              onClick={handleAdd}
              >Add</Button></span>
               </form>
              </Search>
            </div>
              </Grid>
            </Grid>
            <br />
            <Grid container >
                <Grid item xs={12}>
                <Item>
                <div className='list-items'>
                  <ul style={{listStyle: 'none'}}>
                    {list.map(x=>(
                      <li key={x.id} style={{backgroundColor: x.status===true?'#26de81':'#273c75'}}
                      > 
                      <span style={{cursor:'pointer'}} onClick={()=>handleClickOpen(x.id)}> {x.title} </span>
                      <span style={{float: 'right'}} onClick={()=>{handleDelete(x.id)}}> <ClearOutlinedIcon /> </span>           
                      </li>     
                    ))}               
                  </ul>         
                </div> 
                </Item>                   
                </Grid>
                <Dialog
                  fullScreen={fullScreen}
                  open={open}
                  TransitionComponent={Transition}
                  onClose={handleClose}
                  aria-labelledby="responsive-dialog-title"
                >
                  <DialogTitle id={valueUpdate.id}>
                    {"Update a todo"}
                    {
                      !valueUpdate.status &&
                      <>
                      <span style={
                        {float:'right', backgroundColor:'#26de81',color:'#ffff', padding: '0.3rem',borderRadius:'0.5rem',cursor:'pointer'}
                        } onClick={()=>{handleUpdateStatus(valueUpdate.id)}}> <CheckIcon /> 
                      Done
                      </span> 
                      </>
                    }
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText component={'span'} variant={'body2'}>
                      <input type="text" 
                        className='input-update'
                        value={valueUpdate.title} 
                        onChange={handleUpdateChange}
                      />
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button autoFocus onClick={()=>{handleUpdateTitle(valueUpdate.id, valueUpdate.title)}}>
                      Update
                    </Button>
                  </DialogActions>
                </Dialog> 
            </Grid>
            </Grid>
            </Grid>
        </div>
    );
}

export default TodoApp;