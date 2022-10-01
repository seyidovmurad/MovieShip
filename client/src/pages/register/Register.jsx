import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRegisterMutation } from "../../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";

const Register = () => {
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, {isLoading}] = useRegisterMutation();

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = {...Object.fromEntries(data.entries())};
    try {
      const result = await register(entries).unwrap();
      console.log(result);
      dispatch(setCredentials(result))
      navigate('/');
    } catch (err) {
      console.log(err)
      setError(err.data?.message)
      
    }
  }
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix_Logo" />
        </div>
      </div>
      <div className="content">
        <form onSubmit={handleSubmit} >
          <h1>Sign Up</h1>
          {error && <span>{error ?? ""}</span>}
          <input type="text"  required name="fullname" placeholder="Full name" />
          <input type="email" required name="email" placeholder="Email" />
          <input type="text" required name="username" placeholder="Username" />
          <input type="password" required autoFocus={false} name="password" placeholder="Password" />
          <button className="loginBtn">Sign Up</button>
          <span>Already have account? <b><Link className="link" to="/login">Sign in now.</Link></b></span>
        </form>
      </div>
    </div>
  )
}

export default Register
