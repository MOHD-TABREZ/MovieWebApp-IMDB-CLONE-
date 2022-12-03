import './App.css';
import Header from './components/Header/Header';
import SimpleBottomNavigation from "./components/MainNav";
import Trending from './Pages/Trending/Trending.js'
import Movies from './Pages/Movies/Movies.js'
import Search from './Pages/Search/Search.js'
import Series from './Pages/Series/Series.js'


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Container } from '@mui/system';



function App() {
  return (
    <BrowserRouter>
        <Header/>
          <div className="App">
              <Container>
                  <Routes>
                      <Route path="/" element={<Trending/>}></Route>
                      <Route path="/movies" element={<Movies/>}></Route>
                      <Route path="/series" element={<Series/>}></Route>
                      <Route path="/search" element={<Search/>}></Route>
                  </Routes>
              </Container>
          </div>
          <SimpleBottomNavigation/>
    </BrowserRouter>
  );
}

export default App;
