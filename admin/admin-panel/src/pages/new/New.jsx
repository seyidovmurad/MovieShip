import './new.scss';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Select from 'react-select';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useAddTableMutation } from '../../features/table/tableApiSlice';

const New = ({inputs, title}) => {
  const loc = useLocation();

  const table = loc.pathname.split('/')[1];

  const [error, setError] = useState([]);
  const navigate = useNavigate();

  
  const [addDoc, {isLoading, isSuccess}] = useAddTableMutation();

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const entries = Object.fromEntries(data.entries());
    console.log(entries);
    if(Object.values(entries).filter(Boolean).length > 0) {
      try {
        const result = await addDoc({path: `/${table}`, data: entries}).unwrap();
        navigate(-1);
      } catch (err) {
        console.log(err);
        setError(err?.data?.message ?? "Check all inputs");
      }
    }
    else {
      console.log("err");
      setError("Fill all inputs")
    }
  }

  return (
        <div className="new">
          <Sidebar />
          <div className="newContainer">
            <Navbar />
            <div className="top">
              <h1>{title}</h1>
              <button onClick={() => navigate(-1)}>Back to list</button>
            </div>
            <div className="bottom">
              <div className="right">
                <form onSubmit={handleSubmit}>
                  {/* <span>{error}</span> */}
                  {inputs.map((input, index) => (
                    <div className={input.element !== "textarea" ? "formInput" : "formTxt"} key={index}>
                      <label >{input.label}</label>
                      <InputSource  input={input} handleInput={() => {}}  /> 
                    </div>
                  ))}
                  <button disabled={isLoading} >Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
}
function getDatesInRange(startDate) {
  const endDate = new Date().getFullYear()

  const dates = [];
  let date = startDate;
  while (date <= endDate) {
    dates.push({label: date, value: date});
    date++;
  }

  return dates;
}
const InputSource = ({className, input, handleInput,  value}) => {
  const [opt, setOpt] = useState([]);
  useEffect(() => {
    if(input.type === "table") 
      axios.get(`http://localhost:5000/api/${input.id}`).then(res => {
        setOpt(res.data.map(m => {
          return {
            value: m._id,
            label: m.name
          }
        }));
      })
    if(input.type === "year") {
      setOpt(getDatesInRange(1950))
    }
  }, [setOpt,  input])
  let element;
  switch(input.element) {
    case "input": 
       element = <input 
                id={input.id} 
                name={input.id}
                className={className}
                type={input.type} 
                value={value}
                placeholder={input.placeholder}
                onChange={handleInput} />
      
      break;
    case "textarea":
      element = <textarea
                    id={input.id} 
                    value={value}
                    placeholder={input.placeholder}
                    onChange={handleInput} 
                  ></textarea>
    
    break;
    case "select": 
      if(Array.isArray(value))
      element = <Select
          id={input.id}
          name={input.id}
          defaultValue={value.map(v => ({value: v._id, label: v.name}))}
          isMulti={input.multiple}
          closeMenuOnSelect={false}
          options={opt}
          className="basic-multi-select"
          classNamePrefix="select"
      />
      else 
      element = <Select
          id={input.id}
          name={input.id}
          defaultInputValue={value}
          isMulti={input.multiple}
          options={opt}
          className="basic-multi-select"
          classNamePrefix="select"
      />
    break;
    default: element = <input type="text" />
  }

  return element
}



export default New