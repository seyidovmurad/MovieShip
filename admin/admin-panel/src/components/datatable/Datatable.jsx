import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {instance} from '../../api/axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';



const Datatable = ({table, rows}) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const {currentUser} = useContext(AuthContext);

  const [list, setList] = useState([]);

  const onDelete = (id) => {
    if(window.confirm("Do you want to delete this item")) {

      instance.delete(`${loc.pathname}/${id}`, {headers: {"msh-auth-token": currentUser.token}}).then(() => {

        setList(list.filter(l => l._id != id));
      })
      .catch(err => { 
        alert(err);
      });
      
    }
  }

  useEffect(() =>  {if(list.length == 0) setList(rows)})
 
  const actionColumn = [{field: "action",type: 'actions', headerName: "Action",disableColumnSelector: true, width: 200, renderCell: (proms) => {
    
    return (
        <div className="cellAction">
            <div className="viewBtn" onClick={() => navigate(`${loc.pathname }/${proms.row._id}`)}>View</div>
            <div className="deleteBtn" onClick={() => onDelete(proms.row._id)}>Delete</div>
        </div>
    )
  }}]

  return (
    <div className="datatable">
      <div className="dbTitle">
        Add New User
        <Link to="/users/new" style={{textDecoration: "none"}} className="link">
          Add New
        </Link>
      </div>
         <DataGrid
            className="datagrid"
            rows={list}
            columns={table.concat(actionColumn)}
            pageSize={10}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[10]}
            checkboxSelection
        />
    </div>
  )
}

export default Datatable