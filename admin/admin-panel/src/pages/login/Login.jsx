import './login.scss';
import { useEffect } from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login, {isLoading}] = useLoginMutation();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setError('');
  }, [username, password])

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let result = await login({username, password}).unwrap()
      console.log(result);
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
        setError('Access denied');
      else  
        setError("Something went wrong");
      errRef.current?.focus();
    }
  }
  

  return (
    <div className="login">
      {isLoading ? <h1>Loading...</h1> : 
        <form onSubmit={handleSubmit}>
          <h2>Login Admin Panel</h2>
          {error && <span ref={errRef}>{error ?? ""}</span>}
          <input ref={userRef} type="text" name="" placeholder="username" onChange={e => setUser(e.target.value)} />
          <input type="password" name="" placeholder="password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      }
    </div>
  )
}

export default Login;