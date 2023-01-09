import {useState, useRef} from 'react'
import Container from 'react-bootstrap/Container';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react';
import {axiosAuth} from '../../api/movies';


const Register = () => {
    const userRef = useRef();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    //username is 8-20 characters long
    //no _ or . at the beginning
    //no __ or _. or ._ or .. inside
    //allowed characters
    //no _ or . at the end
    const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    //Minimum eight characters, at least one letter, one number and one special character:
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    const [submitSuccess, setSubmitSuccess] = useState("");

    useEffect(()=>{
        userRef.current.focus();

    }, [])

    useEffect(()=>{
        const result = USER_REGEX.test(user);

        setValidName(result);

    },[user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    const postData = async (e) =>
    {
      e.preventDefault();
      try{
        const userReg = {userName: e.target.username.value, password: e.target.pwd.value};
        const resp = await axiosAuth.post('/users', userReg);
        setSubmitSuccess("You have registered successfully");
        
      } 
      catch(error)
      {
        console.log(error);
        setSubmitSuccess("You have not registered successfully " + error);
      } 

    
    }
    
  return (
    <Container>
      <header>
        <h4>Register</h4>
      </header>
      <main className ="register-container">
        <div className="register-layout">
        <Form onSubmit = {postData}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label className="me-2">Username: 
                    <span className = {validName?"valid":"hide"}>
                        <FontAwesomeIcon icon ={faCheck} className="valid-icon" />
                    </span>
                    <span className = {validName || !user ? "hide" : "valid"}>
                        <FontAwesomeIcon icon ={faTimes} className="invalid-icon" />
                    </span>

                </Form.Label>
                <Form.Control type="text" placeholder="Enter Username" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange = {(e) => setUser(e.target.value)}
                    required

                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:
                     <span className = {validPwd?"valid":"hide"}>
                        <FontAwesomeIcon icon ={faCheck} className="valid-icon" />
                    </span>
                    <span className = {validPwd || !pwd ? "hide" : "valid"}>
                        <FontAwesomeIcon icon ={faTimes} className="invalid-icon" />
                    </span>
                </Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    id="pwd"
                    autoComplete="off"
                    onChange = {(e) => setPwd(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password:
                    <span className = {validMatch && matchPwd ?"valid":"hide"}>
                        <FontAwesomeIcon icon ={faCheck} className="valid-icon" />
                    </span>
                    <span className = {validMatch || !matchPwd ? "hide" : "valid"}>
                        <FontAwesomeIcon icon ={faTimes} className="invalid-icon" />
                    </span>
                </Form.Label>
                <Form.Control type="password" placeholder="Confirm Password"
                    id="confirm_pwd"
                    autoComplete="off"
                    onChange = {(e) => setMatchPwd(e.target.value)}
                    required
                />
            </Form.Group>

            <Button disabled={!validName || !validPwd || !validMatch ? true : false } variant="info" type="submit">
                Submit
            </Button>
        </Form>
            {(submitSuccess)?
            <section className="register-message">
                {submitSuccess}
            </section>
        :null}
        </div>
      </main>

      
    </Container>
  )
}

export default Register
