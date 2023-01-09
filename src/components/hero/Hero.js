import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay,faPlus } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import './Hero.css';
import { Link,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import useAuth from '../../hooks/useAuth';

const Hero = ({ watchListItems,addToWatchList, nowPlayingMovies, getImagePath}) => {
  
  const navigate = useNavigate();
  const {auth} = useAuth();

  function addToWatchListFromHome(item)
  {
        addToWatchList(item);
        navigate("/watchList");

  }
  function reviews(movieId, moviePoster)
  {
      navigate(`/MovieReviews/${movieId}/${moviePoster.substring(1)}`);

  }
  
  return (
      <div className='movie-carousel-container'>
        <Carousel>
          { 
              nowPlayingMovies.map((movie) =>{
                return (
                  <Paper>
                    <div className="movie-card-container">
                        <div className="movie-card" style={{ 
                          "--img": `url(${getImagePath('/w500' + movie.backdrop_path)})` 
                        }}>
                          
                          <div className="movie-detail">
                              <div className="movie-poster">
                                <img src={getImagePath('/w200' + movie.poster_path)} alt="" />
                              </div>
                              <div className="movie-title">
                                  <h4>{movie.original_title}</h4>
                              </div>
                              <div className = "movie-buttons-container">
                                <Link to={`/Trailer/${movie.id}`}>
                                    <div className='play-button-icon-container'>
                                    <FontAwesomeIcon className="play-button-icon" icon={faCirclePlay} />
                                  </div>
                                </Link>
                                <div className="movie-watch-list-add-button-container">
                                      {(watchListItems?.find(m => m.movieId === movie.id))?null:<Button variant="outline-info" className="movie-watch-list-add-button" onClick={()=>addToWatchListFromHome({userName:auth?.user,name:"test",movieId:movie.id,poster_path:movie.poster_path})} ><FontAwesomeIcon icon ={faPlus}/></Button>} 
                                </div>
                                <div className="movie-review-button-container">
                                  <Button variant="info" onClick = {()=>reviews(movie.id,movie.poster_path)} >Reviews</Button>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                  </Paper>
                );
              })
          }
          </Carousel>
        </div>
  )
}

export default Hero
