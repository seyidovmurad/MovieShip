import { useLocation } from 'react-router-dom';
import Datatable from '../../components/datatable/Datatable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.scss';

const List = ({table, title}) => {
  const location = useLocation();
  
  
  return (
    <div className="list" >
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {
          <Datatable  table={table} title={title} rows={[]}/>
        }
        {/* <Datatable  table={table} rows={data.list}/> */} 
      </div>
    </div>
  )
}

export default List