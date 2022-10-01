import { Route, Routes } from 'react-router-dom';
import './app.scss';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import NotFound from './pages/notfound/NotFound';
import Watch from './pages/watch/Watch';

function App() {

  return (
    <div className="app" >
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path='movie/:id' element={<Watch />} />
          <Route path="register" element={<Register />} />


          {/* Error Pages */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
