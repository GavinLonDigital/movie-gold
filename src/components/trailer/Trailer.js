import React,{useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import api from '../../api/movies';
import ReactPlayer from 'react-player'
import './Trailer.css'

const Trailer = () => {
    let params = useParams();
    let movie_id = params.movieId;

    const [key, setKey] = useState();

    const fetchMovieDetails = async () =>{
        const response = await api.get(`/3/movie/${movie_id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
       // https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=<<api_key>>&language=en-US

        setKey(response.data.results[0].key);


    }

    useEffect(()=>{
        fetchMovieDetails();

    },[])

  return (
    <div className="react-player-container">
        {(key!=null)?<ReactPlayer controls = "true" playing={true} url = {`https://www.youtube.com/watch?v=${key}`}
        width='100%' height='100%'
        />  :null}

    </div>
  )
}

export default Trailer


// const Trailer = () => {
    
//     const [movieDetails, setMovieDetails] = userState([]);
    
//     let params = useParams();
//     let movie_id = params.movieId;
//     alert(movie_id);


//   return (
//     <div className="trailer">
//         {movie_id}
//     </div>
//   )
// }

// export default Trailer
