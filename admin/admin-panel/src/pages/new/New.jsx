import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useFetch from '../../api/useFetch';

const New = ({inputs, title}) => {
  const [data, setData] = useState({});
  const loc = useLocation();

  console.log(loc);

  const {data: doc, loading, error} = useFetch(loc.pathname);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    setData({ ...data, [id]: value });
  };
  
  if(error || loading || doc == null) 
  return <h1>Loading...</h1>
  else
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          {/* {  <div className="left">
            <img src="https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193046541?k=20&m=1193046541&s=612x612&w=0&h=XTXTZG9mJPnczJf_U_k2hJqIxu2kc-eRJ0nW1HiV7-8=" alt="noimage" />
          </div>} */}
          <div className="right">
            <form >
            {/* { <div className="formInput">
                <label htmlFor="file">
                  Image <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" style={{display: "none"}}/>
              </div> } */}
              {inputs.map((input, index) => (
                <div className="formInput" key={index}>
                  <label >{input.label}</label>
                  <input 
                      type={input.type} 
                      placeholder={input.placeholder}
                      onChange={handleInput} value={doc?.doc[input.id] ?? ""}/>
                </div>
              ))}
            </form>
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New