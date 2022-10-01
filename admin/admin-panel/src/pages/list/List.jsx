import './list.scss';
import Datatable from '../../components/datatable/Datatable';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const List = ({table, title}) => {
 
  return (
    <div className="list" >
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        {
          <Datatable  table={table} title={title} />
        }
        {/* <Datatable  table={table} rows={data.list}/> */} 
      </div>
    </div>
  )
}

export default List