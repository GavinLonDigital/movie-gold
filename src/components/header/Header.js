import React,{useRef} from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideoSlash } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

//https://react-bootstrap.github.io/components/navbar/

const Header = () => {

  const {auth, setAuth} = useAuth();

  const searchText = useRef();

  const navigate = useNavigate();

  const handleNav = (path) =>{
    navigate(path);

  }

  const performSearch = () =>{
    const st = searchText.current;

    navigate("/SearchResults/" + st.value);
    
  }


  function logOut(){
    setAuth(null);
    handleNav("/");

  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" className="menu-link" style={{ "color": 'gold'}}><FontAwesomeIcon icon={faVideoSlash}/>Gold</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px'}}
            navbarScroll>
            <NavLink className="nav-link" to = "/">Home</NavLink>
            <NavLink className="nav-link" to = "/watchList">Watch List</NavLink>
          </Nav>
          {auth?.user?
          <>
          <Form className="d-flex  mb-2 mt-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref = {searchText}
            />
            <Button variant="outline-info" onClick={performSearch} className="me-2" >Search</Button>
          </Form>

            <Button variant="info" className="mb-2 mt-2" onClick ={logOut}>Logout</Button>

          </>
          :
          <>
               <Button variant="outline-info" onClick={() => handleNav("/Login")} className="me-2">Login</Button>
               <Button variant="outline-info" onClick={() => handleNav("/Register")}>Register</Button>
          </>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
