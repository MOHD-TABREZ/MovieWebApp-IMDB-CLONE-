import Chip from '@mui/material/Chip';
import axios from "axios";
import { useEffect} from "react";

const Genres = ({
  selectedGenres,
  setSelectedGenres,
  genres,
  setGenres,
  type,
  setPage,
}) => {
  
  const handleAdd=(genre)=>{
    setSelectedGenres([...selectedGenres,genre])
    setGenres(genres.filter((g)=>(
        genre.id!==g.id
    )))
    setPage(1)
  }

  const handleRemove=(genre)=>{
    setSelectedGenres(
      selectedGenres.filter((selected)=>selected.id!==genre.id)
    )
    setGenres([...genres,genre])
    setPage(1)
  }
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  useEffect(() => {
    fetchGenres();

    return () => {
      setGenres([]); // unmounting
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div>

      {selectedGenres && selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2 ,padding:'15px 15px'}}
          label={genre.name}
          key={genre.id}
          clickable
          color="primary"
          size="small"
          onDelete={()=>handleRemove(genre)}
        />
      ))}

      {genres && genres.map((genre) => (
        <Chip
          style={{ margin: 2,padding:'15px 15px'}}
          label={genre.name}
          key={genre.id}
          clickable
          color='secondary'
          size="small"
          onClick={()=>handleAdd(genre)}
          
        />
      ))}

    </div>
  );
};

export default Genres;