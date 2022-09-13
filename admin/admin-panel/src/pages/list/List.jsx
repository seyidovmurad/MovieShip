import { Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import useFetch from '../../api/useFetch';
import Datatable from '../../components/datatable/Datatable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.scss';

const List = ({table}) => {
  const location = useLocation();
  const {data, loading, error} = useFetch(location.pathname);
  console.log("reset");
  if(error != null ) {
    return <h1>error</h1>
  }
  else 
  return (
    <div className="list" >
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {( loading || data == null ) ? <h1>Loading...</h1> : 
          <Datatable  table={table} rows={data.list}/>
        }
        {/* <Datatable  table={table} rows={data.list}/> */}
      </div>
    </div>
  )
}

export default List