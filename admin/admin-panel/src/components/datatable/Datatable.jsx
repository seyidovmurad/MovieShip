import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDeleteTableMutation, useGetTableQuery } from '../../features/table/tableApiSlice';



const Datatable = ({table, title}) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const {
    data: list,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetTableQuery(path);

  const [deletTable, {isLoading: loading}] = useDeleteTableMutation();

  const onDelete = async(id) => {
    if(window.confirm("Do you want to delete this item " + `${path}/${id}`)) {
      try {
        const result = await deletTable(`${path}/${id}`).unwrap();
        alert(result.message)
      }
      catch(error) {
        alert(error.message)
      }
    }
  }

  
  
  const actionColumn = [{field: "action",type: 'actions', headerName: "Action",disableColumnSelector: true, width: 200, renderCell: (proms) => {
    
    return (
        <div className="cellAction">
            <div className="viewBtn" onClick={() => navigate(`${path }/${proms.row._id}`)}>View</div>
            <div className="deleteBtn" onClick={() => onDelete(proms.row._id)}>Delete</div>
        </div>
    )
  }}]
  
  let content;
  if(isLoading || loading) {
    content = <h1>Loading...</h1>
  }
  else if(isError) {
    console.log(error);
    content = <h1>{error}</h1>
  }
  else if(isSuccess) {
    
    content =  <DataGrid
         key={path}
         className="datagrid"
         rows={list}
         columns={table.concat(actionColumn)}
         pageSize={10}
         getRowId={(row) => row._id}
         rowsPerPageOptions={[10]}
        //  checkboxSelection
     />
    
  }


  return (
    <div className="datatable">
      <div className="dbTitle">
        {title}
        <Link to={path + "/new"} style={{textDecoration: "none"}} className="link">
          Add New
        </Link>
      </div>
     {content}
    </div>
  )
}

export default Datatable