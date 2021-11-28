import { Delete, Edit } from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles((theme) => ({
  editButton: {
    "&:hover": {
      color: "blue",
      cursor: "pointer"
    },
  },
  deleteButton: {
    "&:hover": {
      color: "red",
      cursor: "pointer"
    }
  }
}))

const DataTable = ({ colunms, data, onDeleteDevice, onEditClick }) => {

  const classes = useStyle();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky simple table">
        <TableHead>
          <TableRow>
            {colunms.map(({ id, align, column }) => <TableCell key={id} align={align}>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">{row.type}</TableCell>
              <TableCell align="right">{row.system_name}</TableCell>
              <TableCell align="right">{row.hdd_capacity} GB</TableCell>
              <TableCell align="right"><Edit className={classes.editButton} onClick={() => onEditClick(row.id)} /></TableCell>
              <TableCell align="right"><Delete className={classes.deleteButton} onClick={() => onDeleteDevice(row.id)} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable;