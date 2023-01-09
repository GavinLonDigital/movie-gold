import './App.css';
import {useEffect, useState} from 'react';
import api,{axiosAuth} from './api/movies';
import Header from './components/header/Header'
import SearchResults from './components/searchResults/SearchResults'
import Trailer from './components/trailer/Trailer'
import WatchList from './components/watchList/WatchList'
import Home from './components/home/Home'
import Register from './components/register/Register'
import Login from './components/login/Login'
import MovieReviews from './components/movieReviews/MovieReviews';
import NotFound from './components/notFound/NotFound';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import useAuth from './hooks/useAuth';
import useAxiosPrivate from './hooks/useAxiosPrivate';

function App() {


  const {auth} = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [watchListItems, setWatchListItems] = useState([]);

 const getImagePath = (imgPath) =>{
  return process.env.REACT_APP_TMDB_IMAGE_BASE_PATH + imgPath;
 }
 const fetchNowPlayingMovies = async () =>{
  try{

    const response = await api.get(`/3/movie/now_playing?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`);

    setNowPlayingMovies(response.data.results);


  } catch (err){
    console.log(err);
  }
}
const fetchWatchListMovies = async () => {
  try{
   
    const responseWatchList = await axiosPrivate.get("/watchList/");

    setWatchListItems(responseWatchList.data.filter(m => m.userName === auth?.user));

  } catch (err){
    console.log(err);
  }
}
const addToWatchList = async (movie) =>{
  try
  {
      const responsePostWatchList = await axiosPrivate.post("/watchList", movie);
      setWatchListItems([...watchListItems, responsePostWatchList.data]);

  }
  catch(err){
    console.log(err);
  }

}
const removeFromWatchList = async (id) =>{
  try
  {
    const responsePostWatchList = await axiosPrivate.delete(`/watchList/${id}`);
   
    setWatchListItems([...watchListItems].filter(m => m.id != id));

  }
  catch(err){
    console.log(err);
  }

}

  useEffect(() => {

    fetchNowPlayingMovies();

  },[]);

  useEffect(() => {
    if(auth?.user)
    {
      fetchWatchListMovies();

    }
    else{
      setWatchListItems(null);
    }

  },[auth?.user]);

  return (
    <div className='App'>

        <Header />
        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* Pubic */}
            <Route path="/Register" element={<Register />}></Route>
            <Route path="/Login" element={<Login/>}></Route>
            <Route path="/" element={<Home watchListItems = {watchListItems} addToWatchList ={addToWatchList} nowPlayingMovies={nowPlayingMovies} getImagePath={getImagePath} />}></Route>
            <Route path="/Trailer/:movieId" element={<Trailer />}></Route>    

            {/*Protected Routes */}
            <Route element ={<RequireAuth/>}>           
              <Route path="/WatchList" element={<WatchList getImagePath={getImagePath} watchListItems ={watchListItems} removeFromWatchList ={removeFromWatchList} />}></Route>         
              <Route path="/SearchResults/:searchTerm" element={<SearchResults getImagePath={getImagePath} watchListItems = {watchListItems} addToWatchList ={addToWatchList} />}></Route>
              <Route path="/MovieReviews/:movieId/:moviePath" element={<MovieReviews getImagePath={getImagePath} />}></Route>       
            </Route>
 
            {/*Catch All*/}          
            <Route path="*" element={<NotFound />}></Route>   

          </Route>

        </Routes>

    </div>
  );
}

export default App;
