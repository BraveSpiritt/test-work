import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DataType } from "../../types";
import CancelIcon from "@mui/icons-material/Cancel";
type Props = {
  data: DataType[];
};

const CommonTable: React.FC<Props> = ({ data }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableContainer component={Paper} sx={{ bgcolor: "whitesmoke" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                {(data[0].title && "Title") ||
                  (data[0].description && "Description") ||
                  (data[0].name && "Name")}
              </TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">
                {(data[0].createdAt && "Created") ||
                  (data[0].updatedAt && "Updated")}
              </TableCell>
              {data[0].removedAt || data[0].publishedAt ? (
                <TableCell align="right">
                  {(data[0].removedAt && "Removed") ||
                    (data[0].publishedAt && "Published")}
                </TableCell>
              ) : null}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: DataType) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title || row.description || row.name}
                </TableCell>
                <TableCell align="right">
                  {row.active ? "True" : "False"}
                </TableCell>
                <TableCell align="right">
                  {row.createdAt || row.updatedAt}
                </TableCell>
                {row.removedAt || row.publishedAt ? (
                  <TableCell align="right">
                    {row.removedAt || row.publishedAt}
                  </TableCell>
                ) : null}
                <TableCell align="right">
                  <button onClick={() => setOpen(true)}>edit</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "600px",
              height: "400px",
              borderRadius: "1rem",
              bgcolor: "whitesmoke",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: '30px 40px'
              }}
            >
              <Typography variant="h5" sx={{ color: "black" }}>
                Edit
              </Typography>
              <IconButton onClick={() => setOpen(false)}>
                <CancelIcon />
              </IconButton>
            </Box>

            <TextField
              sx={{ marginTop: "100px", marginLeft: "50px", width: "500px" }}
            ></TextField>
            <Button
              variant="contained"
              color="warning"
              sx={{
                marginTop: "20px",
                marginLeft: "200px",
                width: "200px",
                height: "50px",
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CommonTable;
