/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import React,{useEffect, useState} from 'react'
import SingleContent from '../../components/SingleContent/SingleContent.js'
import CustomPagination from '../../components/Pagination/CustomPagination.js'
import Genres from '../../components/Genres.js'
import useGenres from '../../hooks/useGenre.js'


function Series() {
  const [page,setPage]=useState(1);
  const [content,setContent]=useState([])

  const [numOfPages,setNumOfPages]=useState(0);

  const [selectedGenres,setSelectedGenres]=useState([])
  const [genres,setGenres]=useState([])
  const genreforURL=useGenres(selectedGenres);


  const fetchMovies=async()=>{
    const {data}=await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
    setContent(data.results);
    setNumOfPages(data.total_pages);
  }

  useEffect(()=>{
      fetchMovies();
  },[page,genreforURL])

  return (
    <div>
        <span className='pageTitle'>TV-Series</span>
        <Genres type='tv' selectedGenres={selectedGenres} genres={genres} setSelectedGenres={setSelectedGenres} setGenres={setGenres} setPage={setPage}/>
        <div className='trending'>
        {
          content && content.map((c)=>(
             <SingleContent 
             key={c.id} 
             id={c.id} 
             poster={c.poster_path} 
             title={c.title || c.name} 
             date={c.first_air_date || c.release_date} 
             media_type='tv'
             vote_average={c.vote_average}/>
          ))
        }
      </div>
      <CustomPagination setPage={setPage} numOfPages={numOfPages}/>
    </div>
  )
}

export default Series