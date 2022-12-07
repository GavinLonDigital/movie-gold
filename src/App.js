import './App.css';
import {useEffect, useState} from 'react';
import api from './api/movies';
import ReactPlayer from 'react-player'
import Header from './components/header/Header'
import SearchResults from './components/searchResults/SearchResults'
import Trailer from './components/trailer/Trailer'
import Home from './components/home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  var [nowPlayingMovies, setNowPlayingMovies] = useState([]);

 const getImagePath = (imgPath) =>{
  return process.env.REACT_APP_TMDB_IMAGE_BASE_PATH + imgPath;
 }

  useEffect(() => {
    const fetchNowPlayingMovies = async () =>{
      try{

        const response = await api.get(`/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);
        
        setNowPlayingMovies(response.data.results);

      } catch (err){

      }
    }

    fetchNowPlayingMovies();

  },[]);

  return (
    <div className='App'>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home nowPlayingMovies={nowPlayingMovies} getImagePath={getImagePath} />}></Route>
          <Route path="/SearchResults/:searchTerm" element={<SearchResults getImagePath={getImagePath} />}></Route>
          <Route path="/Trailer/:movieId" element={<Trailer />}></Route>       
        </Routes>
      </Router>
    </div>
  );
}

export default App;
