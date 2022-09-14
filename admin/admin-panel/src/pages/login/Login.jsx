import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { useEffect } from 'react';

const Login = () => {
  const [error, setError] = useState("");
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const {currentUser, dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username, 
      password
    }
    
    
  }
  
  useEffect(() => {
    if(currentUser)
      navigate("/")
  })

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input type="text" name="" placeholder="username" onChange={e => setUser(e.target.value)} />
        <input type="password" name="" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {error && <span>{error ?? ""}</span>}
      </form>
    </div>
  )
}

export default Login;