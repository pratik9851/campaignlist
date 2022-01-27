import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./campaignlist.module.css";
import { Box, Container, TextField } from "@mui/material";
import Campaigntable from "./Capaigntable";
import { useDispatch } from "react-redux";
import { addTolist } from "../redux/Action";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Campaignlist() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  async function getResult() {
    const data = await axios.get("http://localhost:3000/campaigns", {
      params: {
        _page: page,
        limit: 30,
      },
    });
    dispatch(addTolist(data.data));
    setData(data.data);
  }

  useEffect(() => {
    getResult();
  }, [page]);

  const handelchange = (e) => {
    let { value } = e.target;

    if (value === "") {
      return;
    } else {
      value = value.toUpperCase();
      let ans = data.filter(
        (e) =>
          e.name.includes(value) ||
          e.type.includes(value) ||
          e.company.includes(value)
      );
      dispatch(addTolist(ans));
    }
  };

  function debounce(delay, callback) {
    let temp;

    return function (e) {
      temp && clearTimeout(temp);
      temp = setTimeout(function () {
        console.log(e);
        callback(e);
      }, delay);
    };
  }

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <h1>This is campaignlist page</h1>
      <Container
        sx={{
          width: "900px",
        }}
      >
        <Box
          sx={{
            height: "100vh",
            // backgroundColor: "primary.dark",
          }}
          className={styles.box}
        >
          <div className={styles.inputTagDiv}>
            <TextField
              sx={{ width: "95%" }}
              id="outlined-basic"
              label="Search campaignlist"
              variant="outlined"
              onChange={debounce(500, handelchange)}
              className={styles.inputTag}
            />
          </div>

          <Campaigntable />
          <Box style={{ marginTop: "15px" }}>
            <Stack spacing={2}>
              <Pagination count={10} page={page} onChange={handleChange} />
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
