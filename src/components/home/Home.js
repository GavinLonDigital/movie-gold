import Hero from '../hero/Hero'

const Home = ({nowPlayingMovies, getImagePath}) => {
  return (
    <>
      <Hero nowPlayingMovies ={nowPlayingMovies} getImagePath={getImagePath} />
    </>
  )
}

export default Home
