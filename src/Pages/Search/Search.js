import { Button, Tabs, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Tab from '@mui/material/Tab';
import axios from 'axios';
import SingleContent from '../../components/SingleContent/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SearchIcon from '@mui/icons-material/Search';

function Search() {

  const [type,setType]=useState(0)
  const [searchText,setSearchText]=useState("");
  const [page,setPage]=useState(1)
  const [content,setContent]=useState([]);
  const [numOfPages,setNumOfPages]=useState()

  const fecthSearch=async()=>{
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      
      // console.log(data);
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(()=>{
    window.scroll(0,0)
    fecthSearch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[type,page])

  return (
    <div>
      <span className='pageTitle'>Search</span>
      <div style={{display:'flex',margin:'15px 0'}}>
        <TextField  style={{flex:1,color: '#fff'}} className="searchBox" label="Search" variant="filled" 
          onChange={(e)=>setSearchText(e.target.value)}
        />
        <Button 
        variant='contained' 
         style={{marginLeft:'10px',backgroundColor: "#21b6ae",}}
         onClick={fecthSearch}
         ><SearchIcon/></Button>
      </div>
      <Tabs value={type} indicatorColor='primary' textColor="primary"
          onChange={(event,newValue)=>{
            setType(newValue);
            setPage(1);
          }}
      >
          <Tab style={{width:'50%'}} label="Search Movies"/>
          <Tab style={{width:'50%'}} label="Search TV Series"/>
      </Tabs>

      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages>1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
      )}
    </div>
      
  )
}

export default Search