import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import List from './pages/list/List';
import New from './pages/new/New';
import './style/dark.scss';
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
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
    title: "Add New Genre",
  }
]

function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <div className={darkMode ? "app dark": "app"}>
     
      <Router>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            
            <Route index 
                  element={
                    <Home />
                  } />

            {list.map((l, index )=> {
              return (
            <Route path={l.path} key={l.path} >

              <Route index key={index}
                    element={
                      <List table={l.table} title={l.title} />
                  } />

              <Route path=":id" 
                     element={
                      <New inputs={l.inputs} title={l.title} />
                    } />
                    
              <Route path="update" 
                     element={
                        <New inputs={l.inputs} title={l.title}/>
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
