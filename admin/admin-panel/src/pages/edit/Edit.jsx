
const New = ({inputs, title}) => {
    const loc = useLocation();
  
    
    const {data: doc, isSuccess} = useGetTableByIdQuery(loc.pathname);
    const [data, setData] = useState({});
  
    const onChange = (e) => {
      const id = e.target.id;
      const value = e.target.value;
      setData({...data, [id]: value})
      console.log(data);
    }
  
  
    useEffect(() => {
      setData({doc});
    },[doc]);
    return (
          <div className="new">
            <Sidebar />
            <div className="newContainer">
              <Navbar />
              <div className="top">
                <h1>{title}</h1>
              </div>
              <div className="bottom">
                <div className="right">
                  <form >
                    {inputs.map((input, index) => (
                      <div className={input.element !== "textarea" ? "formInput" : "formTxt"} key={index}>
                        <label >{input.label}</label>
                        {isSuccess &&
                        <InputSource input={input} handleInput={onChange} value={data[input.id] ?? ""} />
                        }
                      </div>
                    ))}
                  </form>
                  <button>Save</button>
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
  const InputSource = ({input, handleInput,  value}) => {
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
            defaultValue={value.map(v => ({value: v._id, label: v.name}))}
            isMulti={input.multiple}
            options={opt}
            className="basic-multi-select"
            classNamePrefix="select"
        />
        else 
        element = <Select
            id={input.id}
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
  
  
// const NewDoc = ({inputs, title}) => {
//   const [data, setData] = useState({});
//   const handleInput = (e) => {
//     const id = e.target.id;
//     const value = e.target.value;

//     setData({ ...data, [id]: value });
//     console.log(data);
//   };

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="right">
//             <form >
//               {inputs.map((input, index) => (
//                 <div className="formInput" key={index}>
//                   <label >{input.label}</label>
//                   <input 
//                       id={input.id}
//                       type={input.type} 
//                       placeholder={input.placeholder}
//                       onChange={handleInput} />
//                 </div>
//               ))}
//             </form>
//             <button>Save</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// const Update = ({inputs, title}) => {
//   const [data, setData] = useState({});
//   const loc = useLocation();

  
//   const { data: doc, loading, error } = useFetch(loc.pathname);

//   const handleInput = (e) => {
//     const id = e.target.id;
//     const value = e.target.value;

//     setData({ ...data, [id]: value });
//   };

//   if(error) 
//     return <h1>Error</h1>
//   else
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         {loading || doc == null ? <h1 >Loading...</h1> : ( 
//           <>
//         <div className="top">
//           <h1>{title}</h1>
//         </div>
//         <div className="bottom">
//           <div className="right">
//             <form >
//               {inputs.map((input, index) => (
//                 <div className="formInput" key={index}>
//                   <label >{input.label}</label>
//                   <input 
//                       id={input.id}
//                       type={input.type} 
//                       placeholder={input.placeholder}
//                       onChange={handleInput} value={doc?.doc[input.id] ?? ""}/>
//                 </div>
//               ))}
//             </form>
//             <button>Save</button>
//           </div>
//         </div>
//         </>
//         )}
//       </div>
//     </div>
//   )
// }
