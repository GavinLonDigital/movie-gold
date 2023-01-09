import {useState,useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../api/movies';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import MovieGridDisplay from '../movieGridDisplay/MovieGridDisplay';

const SearchResults = ({getImagePath,watchListItems, addToWatchList}) => {

  const [searchResultItems, setSearchResultItems] = useState([]);

  const axiosPrivate = useAxiosPrivate();

  let params  = useParams();

  let sText = params.searchTerm;

  const navigate = useNavigate();

  const fetchSearchResults = async () =>{
    try{

      const response = await api.get(`/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${sText}&page=1`);

      const movies = response.data.results.map((mov) => {
        return {...mov,movieId:mov.id}
      })

      setSearchResultItems(movies);

    } catch (err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchSearchResults();
  
  }, [sText])


  return (
    <MovieGridDisplay movies = {searchResultItems} includeButton ={[true,false,true]} getImagePath = {getImagePath} watchListItems = {watchListItems} addToWatchList = {addToWatchList} />

  )
}

export default SearchResults

