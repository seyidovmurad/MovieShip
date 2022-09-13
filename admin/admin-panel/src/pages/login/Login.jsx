import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import {instance} from '../../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const [error, setError] = useState(false);
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username, 
      password
    }
    instance
      .post("/auth/login", data)
      .then(res => {
        const user = res.data.user;
        dispatch({type:"LOGIN", payload: user})
        navigate("/");
      })
      .catch(err => {
        setError(true);
      })
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="text" name="" placeholder="username" onChange={e => setUser(e.target.value)} />
        <input type="password" name="" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <span>Wrong email or password</span>}
      </form>
    </div>
  )
}

export default Login;