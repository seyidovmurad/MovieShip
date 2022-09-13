import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Single from './pages/single/Single';
import New from './pages/new/New';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';
import { genreTable, movieTable } from './sources/tableSource';
import { genreInputs, movieInputs } from './sources/inputSource';

const list = [
  {
    path: "movie",
    table: movieTable,
    inputs: movieInputs,
    title: "Add New Movie",
  },
  {
    path: "genre",
    table: genreTable,
    inputs: genreInputs,
    title: "Add New genre",
  }
]

function App() {
  const { darkMode } = useContext(DarkModeContext);
  
  const {currentUser} = useContext(AuthContext);
 
  // localStorage.setItem("user", JSON.stringify(currentUser))
  const RequireAuth = ({children}) => {
    return currentUser ? children : <Navigate to="/login" />;
  }
  return (
    <div className={darkMode ? "app dark": "app"}>
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            
            <Route index 
                  element={
                  <RequireAuth>
                    <Home />
                  </RequireAuth>
                  } />

            {list.map((l, index )=> {
              return (<Route path={l.path} >

              <Route index 
                    element={
                    <RequireAuth>
                      <List table={l.table}/>
                    </RequireAuth>
                  } />

              <Route path=":id" 
                     element={
                     <RequireAuth>
                      <New inputs={l.inputs} title={l.title} />
                     </RequireAuth>
                    } />
                    
              <Route path="update" 
                     element={
                      <RequireAuth>
                        <New inputs={l.inputs} title={l.title}/>
                      </RequireAuth>
                    } />

            </Route>)
            })}
            

            
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
