import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons'
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import './Hero.css';
import { Link } from 'react-router-dom';
const Hero = ({nowPlayingMovies, getImagePath}) => {
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
                              <Link to={`/Trailer/${movie.id}`}>
                                <div className='play-trailer'>
                                  <FontAwesomeIcon icon={faCirclePlay} />
                                </div>
                              </Link> 
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
