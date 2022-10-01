import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Watch from './pages/watch/Watch';

function App() {

  
  
  return (
    <div className="app" >
      <Routes>
        <Route path="/" >
          {/* Public Routes */}
          <Route path='home' element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path='movie/:id' element={<Watch />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
