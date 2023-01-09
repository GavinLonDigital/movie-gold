import {useState, useEffect, useRef} from 'react'
import Container from 'react-bootstrap/Container';
import './Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {axiosAuth} from '../../api/movies';
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from '../../hooks/useAuth';

//https://blog.openreplay.com/user-registration-and-login-with-react-and-axios/

const Login = () => {
    
    const {setAuth} = useAuth();

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();   

    const [user, setUser] = useState('');

    const [pwd, setPwd] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        userRef.current.focus();

    }, [])


    const postLogin = async (e) =>{
        
        e.preventDefault();

        const userName = e.target.username.value;
        const pwd = e.target.pwd.value;

        try
        {
            const resp = await axiosAuth.get('/users');

            const data = resp.data;
    
            const result = data.find(u => u.userName === userName && u.password === pwd);
    
            if (result){
                
                setErrMsg('')
                setUser('');
                setPwd('');
                setAuth({user:result.userName,accessToken:"TEMP"});
                navigate(from, {replace: true});
            }
            else{
                setErrMsg("Your username or password is incorrect")
            }
        }
        catch(err){
          console.log(err);
        }



    }

  return (
    <Container>
      <header>
        <h4>Login</h4>
      </header>
      <main className="login-container">
        <div className="login-layout">
        <Form onSubmit={postLogin}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange = {(e) => setUser(e.target.value)}
                    required
                    value={user}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Password" 
                    id="pwd"
                    autoComplete="off"
                    onChange = {(e) => setPwd(e.target.value)}
                    required
                    value={pwd}

                />
            </Form.Group>

            <Button variant="info" type="submit">
                Submit
            </Button>

        </Form>
        <div className="sign-up" >
            <Link  to="/register">Signup?</Link>
        </div>
        {
            (errMsg)?
                <div className="login-error-message">
                    <p>{errMsg}</p>
                </div>
             :null
        }
        </div>   
      </main>
    </Container>
  )
}

export default Login