import Hero from '../hero/Hero'

const Home = ({watchListItems,addToWatchList,nowPlayingMovies, getImagePath}) => {

  return (
      <Hero watchListItems = {watchListItems} addToWatchList = {addToWatchList} nowPlayingMovies ={nowPlayingMovies} getImagePath={getImagePath} />
  )
}

export default Home
