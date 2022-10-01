import "./login.scss";

const Login = () => {
  
  return (
    <div className="login">
      <div className="top">
        <div className="wrapper">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="Netflix_Logo" />
        </div>
      </div>
      <div className="container">
        <form >
          <h1>Sign In</h1>
          <input type="email" placeholder="Email or phone number" />
          <input type="password" placeholder="Password" />
          <button className="loginBtn">Sign In</button>
          <span>New to Movieship? <b>Sign up now.</b></span>
        </form>
      </div>
    </div>
  )
}

export default Login
