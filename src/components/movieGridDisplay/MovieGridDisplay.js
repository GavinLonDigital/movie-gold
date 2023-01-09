import './MovieGridDisplay.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const MovieGridDisplay = ({movies, includeButton, getImagePath,watchListItems, addToWatchList, removeFromWatchList}) => {

    const includeAddToWatchListButton = includeButton[0];
    const includeRemoveFromWatchListButton = includeButton[1];
    const includeAddReviewButton = includeButton[2];

    const {auth} = useAuth();
    
    const navigate = useNavigate();

    function reviews(movieId, moviePoster){

           navigate(`/MovieReviews/${movieId}/${moviePoster.substring(moviePoster.indexOf('/') + 1)}`);        

    }
    

  return (
    <div className="movies-layout">
      <div className="movies-container">
        {
          movies?.map((movie) =>{
            return (
            <div className="movie-poster">
                <img src={getImagePath('/w200' + movie.poster_path)} alt="" />
                <Link to={`/Trailer/${movie.movieId}`}>
                  <div className='play-button-icon-container-poster'>
                    <FontAwesomeIcon icon={faCirclePlay} />
                  </div>
                </Link>
               {
                    (includeAddToWatchListButton) ?
                        (watchListItems?.find(m => m.movieId === movie.movieId))?null:<Button className="add-watch-list-button-poster" variant="outline-info" onClick={()=>addToWatchList({userName:auth?.user,name:"test",movieId:movie.movieId,poster_path:movie.poster_path})} ><FontAwesomeIcon icon ={faPlus}/></Button>
                    : null
                
                }
                {
                 (includeRemoveFromWatchListButton)?
                     <Button className="remove-watch-list-button-poster" variant="danger" onClick={()=>removeFromWatchList(movie.id)}><FontAwesomeIcon icon ={faTimes} className="remove-icon" /></Button>                   
                 :null        
                } 
               {
                    (includeAddReviewButton) ?
                        <Button className="add-review-button-poster" variant="info" onClick = {()=>reviews(movie.movieId,movie.poster_path)} >Reviews</Button>
                     : null
               }
           </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MovieGridDisplay
