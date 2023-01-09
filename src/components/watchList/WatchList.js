import {useNavigate} from 'react-router-dom'
import './WatchList.css'
import MovieGridDisplay from '../movieGridDisplay/MovieGridDisplay';

const WatchList = ({getImagePath,watchListItems, removeFromWatchList}) => {

  const navigate = useNavigate();

  function reviews(movieId, moviePoster){

      navigate(`/MovieReviews/${movieId}/${moviePoster.substring(moviePoster.lastIndexOf('/') + 1)}`);

}

  return (
    <MovieGridDisplay movies = {watchListItems} includeButton ={[false,true,true]} getImagePath = {getImagePath} watchListItems = {watchListItems} removeFromWatchList = {removeFromWatchList} />

  )
}

export default WatchList
