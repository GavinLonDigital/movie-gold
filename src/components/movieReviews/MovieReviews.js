import './MovieReviews.css';
import {useState, useEffect, useRef} from 'react';
import { axiosAuth } from '../../api/movies';
import {useParams} from 'react-router-dom'
import { Container, Row, Col, Form, Button} from 'react-bootstrap';
import ReviewForm from '../reviewForm/ReviewForm';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';


const MovieReviews = ({getImagePath}) => {
    
    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [reviews, setReviews] = useState([]);
    const [userReview,setUserReview] = useState();

    const [editMode,setEditMode] = useState(false);

    const revText = useRef();

    //Get posterPath and movieId from params
    let params  = useParams();
    let movieId = params.movieId;
    let moviePath = params.moviePath;

    useEffect(()=>{
      getReviews();

    },[])


    const getReviews = async () => {

      try
      {
        const resp = await axiosPrivate.get("/movieReviews");;

        let data = resp.data.filter(m => m.movieId === movieId);
        
        const uReview = data.find(r => r.userName === auth?.user);
  
        setReviews(data.filter(r => r.userName != auth?.user));
  
        setUserReview(uReview);
      }
      catch(err){
        console.error(err);
      }


    }
    
    const editReview = async (e) =>{
      e.preventDefault();
      const id = userReview.id;

      const rev = revText.current;

      try{
        const resp = await axiosPrivate.put(`/movieReviews/${id}`,{...userReview, review:rev.value})

        setUserReview({...userReview, review:rev.value});
        
        setEditMode(false);
      }
      catch(err){
        console.error();
      }
    }
    const addReview = async (e) =>{
      e.preventDefault();

      const rev = revText.current;   
      try
      {
        const resp = await axiosPrivate.post("/movieReviews",{userName:auth?.user,movieId:movieId,title:"Review",review:rev.value})         
        setUserReview(resp.data);
      }
      catch(err)
      {
        console.error(err);
      }


    }
    const deleteReview = async (id) => {
     
     try
     {
      const resp = await axiosPrivate.delete(`/movieReviews/${id}`)
      
      const reviewUpdate = reviews.filter(r => r.id != id)
     
      setReviews(reviewUpdate);

      setUserReview(null);
      
     }
     catch(err)
     {
      console.error(err);
     }


    }
    
  return (
    <Container style={{color:"white"}}>
      <Row className="mt-2">
        <Col><h3>Reviews</h3></Col>
      </Row>
      <Row className="mt-2">
        <Col>
         <img src={getImagePath('/w300/' + moviePath)} alt="" />
        </Col>
        <Col xs ="8">
          {
            (userReview)?
             (!editMode)?
              <>
                <Row className="mt-2" style={{color:"gold"}}>
                    <Col><h5>{userReview.userName}</h5></Col>
                </Row>
                <Row style={{color:"gold"}}>
                    <Col>{userReview.review}</Col>
                </Row>
                <Row className="mt-2">
                    <Col>
                      <Button variant = "outline-info" onClick={() => setEditMode(true)}>Edit Review</Button>
                    </Col>
                    <Col>
                      <Button variant = "outline-danger" onClick={() => deleteReview(userReview.id)}>Delete Review</Button>
                    </Col>
                </Row>
              </>
              :
              <ReviewForm handleSubmit={editReview} revText={revText} labelText="Edit your Review?" defaultValue={userReview.review} />       
            :
            <ReviewForm handleSubmit={addReview} revText={revText} labelText="Write a Review?" />
          }
          {
            
              reviews.map((r) => {
                  return(
                    <>
                      <Row className="mt-2">
                          <Col><h5>{r.userName}</h5></Col>
                      </Row>
                      <Row>
                          <Col>{r.review}</Col>
                      </Row>
                    </>
                  )
              })
          }
        </Col>
      </Row>
      <Row>
        <Col>
          <hr/>
        </Col>
      </Row>
    </Container>

  )
}

export default MovieReviews
