import React,{useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import './SearchResults.css'
import api from '../../api/movies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'

const SearchResults = ({getImagePath}) => {

  const [searchResultItems, setSearchResultItems] = useState([]);

  let params  = useParams();

  let sText = params.searchTerm;

  const fetchSearchResults = async () =>{
    try{

      const response = await api.get(`/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${sText}&page=1`);
    

      setSearchResultItems(response.data.results);

    } catch (err){

    }
  }

  useEffect(()=>{
    fetchSearchResults();
  
  }, [sText])

  return (
    <div className='search-results-layout'>
      <div className="search-results-container">
        {
          searchResultItems.map((movie) =>{
            return (
            <div className="movie-poster">
                <img src={getImagePath('/w200' + movie.poster_path)} alt="" />
                <Link to={`/Trailer/${movie.id}`}>
                  <div className='play-movie-trailer'>
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </div>
                </Link>
            </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default SearchResults
