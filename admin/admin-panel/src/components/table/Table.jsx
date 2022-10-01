import './table.scss';
import * as React from 'react';
import Table  from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const List = () => {
  return (
    <TableContainer component={Paper} className="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell className="tableCell" align="right">Calories</TableCell>
                <TableCell className="tableCell" align="right">Fat&nbsp;(g)</TableCell>
                <TableCell className="tableCell" align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell className="tableCell" align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell className="tableCell" component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell className="tableCell" align="right">{row.calories}</TableCell>
                <TableCell className="tableCell" align="right">
                    <div className="cellWrapper">
                        <img src="https://www.foodiesfeed.com/wp-content/uploads/2021/01/hot-shakshuka-819x1024.jpg" alt="tablefakephoto" className="image"/>
                        {row.fat}
                    </div>
                </TableCell>
                <TableCell className="tableCell" align="right">{row.carbs}</TableCell>
                <TableCell className="tableCell" align="right">{row.protein}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default List