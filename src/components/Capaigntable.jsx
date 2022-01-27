import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allDetails, removeOne } from "../redux/Action";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Campaigntable() {
  const list = useSelector((state) => state.list);
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const handelredirect = (id) => () => {
    dispatch(allDetails(id));
    navigate(`/campaignlist/${id}`);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <TableHead>
            <TableRow key={1}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Company</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((row) => (
              <TableRow key={row._id}>
                <TableCell
                  component="th"
                  scope="row"
                  onClick={handelredirect(row._id)}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right" onClick={handelredirect(row._id)}>
                  {row.type}{" "}
                </TableCell>
                <TableCell align="right" onClick={handelredirect(row._id)}>
                  {row.company}{" "}
                </TableCell>
                <TableCell align="right">
                  {" "}
                  <DeleteIcon onClick={() => dispatch(removeOne(row._id))} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
