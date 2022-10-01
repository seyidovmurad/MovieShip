import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, {isLoading}] = useLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [username, password]);


  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let result = await login({username, password}).unwrap()
      console.log(result)
      dispatch(setCredentials({...result}));
      setUser('');
      setPassword('');
      navigate('/');
    }
    catch(err) {
      console.log(err);
      if(err?.response) 
        setError('Server no response.')
      else if(err?.status === 400 )
        setError('Missing username or password');
      else if(err?.status === 401)
        setError('Wrong username or password');
      else if(err?.status === 403)
        setError('Access denied');
      else if(err?.status === 502)
        setError('Server internal error');
      else  
        setError("Something went wrong");
      errRef.current?.focus();
    }
  }

  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix_Logo" />
        </div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {error && <span ref={errRef}>{error ?? ""}</span>}
          <input  ref={userRef} type="text" placeholder="Username" onChange={e => setUser(e.target.value)}/>
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          <button className="loginBtn">Sign In</button>
          <span>New to Movieship? <b><Link className="link" to="/register">Sign up now.</Link></b></span>
        </form>
      </div>
    </div>
  )
}

export default Login
