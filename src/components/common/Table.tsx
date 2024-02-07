import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
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
import dayjs from "dayjs";
type Props = {
  data: DataType[];
};

const CommonTable: React.FC<Props> = ({ data }) => {
  const [searchedData, setSearchedData] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [statusValue, setStatusValue] = useState<number | string >('');

  const handleSubmit = () => {
    const changingElement = data.find((item) => item.id === currentId);
    if (changingElement) {
      if (changingElement.name) changingElement.name = inputValue;
      if (changingElement.title) changingElement.title = inputValue;
      if (changingElement.description) changingElement.description = inputValue;
    }
    setOpen(false);
  };

  useEffect(() => setSearchedData(data));
  const requestSearch = (searchedVal: string) => {
    const filteredRows = data?.filter((row: DataType) => {
      return (
        row.title?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.description?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.name?.toLowerCase().includes(searchedVal.toLowerCase()) ||
        dayjs(row.createdAt)
          .format("DD.MM.YYYY")
          .includes(searchedVal.toLowerCase()) ||
        dayjs(row.removedAt)
          .format("DD.MM.YYYY")
          .includes(searchedVal.toLowerCase()) ||
        dayjs(row.updatedAt)
          .format("DD.MM.YYYY")
          .includes(searchedVal.toLowerCase()) ||
        dayjs(row.publishedAt)
          .format("DD.MM.YYYY")
          .includes(searchedVal.toLowerCase())
      );
    });

    setSearchedData(filteredRows);
  };

  useEffect(() => {
    const filteredRows = data?.filter((row: DataType) => {
      if (statusValue === 1) return row.active === true;
      if (statusValue === 0) return row.active === false;
    });
    setSearchedData(filteredRows);
  }, [statusValue]);

  return (
    <>
      <Box
        component="form"
        p={1}
        noValidate
        autoComplete="off"
        bgcolor="white"
        sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-between' }}
      >
        <TextField
          id="outlined-search"
          placeholder="Search"
          type="search"
          fullWidth
          onChange={(e) => requestSearch(e.target.value)}
          sx={{ bgcolor: "white", width: "340px" }}
        />
        <Box sx={{ minWidth: 340, ml: "20px" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={statusValue}
              label="Status"
              onChange={(e) => setStatusValue(e.target.value)}
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper} sx={{ bgcolor: "whitesmoke", borderTopLeftRadius: 0,  borderTopRightRadius: 0 }}>
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
            {searchedData?.length ? (
              searchedData.map((row: DataType) => (
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
                    <button
                      onClick={() => {
                        setOpen(true);
                        setCurrentId(row.id);
                      }}
                    >
                      edit
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={12} align="center">
                  No books found
                </TableCell>
              </TableRow>
            )}
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
                padding: "30px 40px",
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
              onChange={(e) => setInputValue(e.target.value)}
              sx={{ marginTop: "100px", marginLeft: "50px", width: "500px" }}
            />
            <Button
              variant="contained"
              color="warning"
              onClick={handleSubmit}
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
