import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import SearchIcon from '@mui/icons-material/Search';
import TagIcon from '@mui/icons-material/Tag';
import MovieIcon from '@mui/icons-material/Movie';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useNavigate } from 'react-router-dom';



export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useNavigate();
  React.useEffect(()=>{
    if(value===0){
      history('/');
    }else if(value===1){
      history('/movies');
    }else if(value===2){
      history('/series');
    }else if(value===3){
      history('/search');
    }
  },[history, value])

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          width: "100%",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#122436;",
          zIndex: 100,
        }}
      >
        {/* <BottomNavigationAction label="Trending" icon={<TrendingUpIcon/>} /> */}
        <BottomNavigationAction sx={{color:"white"}} label="Trending" icon={<TagIcon />} />
        <BottomNavigationAction  sx={{color:"white"}} label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction  sx={{color:"white"}} label="Series" icon={<LiveTvIcon />} />
        <BottomNavigationAction  sx={{color:"white"}} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );

}
