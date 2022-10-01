import './style/dark.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from './pages/home/Home';
import New from './pages/new/New';
import Login from './pages/login/Login';
import List from './pages/list/List';
import Layout from "./components/Layout";
import RequireAuth from "./features/auth/RequireAuth";
import { genreTable, movieTable } from './sources/tableSource';
import { genreInputs, movieInputs } from './sources/inputSource';
import { selectMode } from './features/darkMode/darkModeSlice';

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
  const darkMode = useSelector(selectMode);
  return (
    <div className={darkMode ? "app dark": "app"}>
      
        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* Public Routes */}
            <Route path="login" element={<Login />} />


            {/* Protected Routes */}
            <Route element={<RequireAuth />}>
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
             {/* Catch all - replace with 404 component if you want */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
