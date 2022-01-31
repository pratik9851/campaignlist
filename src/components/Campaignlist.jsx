import React, { useEffect, useState } from "react";
import styles from "./campaignlist.module.css";
import { Box, Container, TextField } from "@mui/material";
import Campaigntable from "./Capaigntable";
import { useDispatch, useSelector } from "react-redux";
import { addTolist, searchkeyword } from "../redux/Action";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import campaign from "../data.json";

export default function Campaignlist() {
  const [page, setPage] = useState(1);
  const [campignPerTable] = useState(10);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(addTolist(campaign));
  }, [dispatch]);

  const handelchange = (e) => {
    var { value } = e.target;

    dispatch(searchkeyword(value));
  };

  function debounce(delay, callback) {
    let temp;

    return function (e) {
      temp && clearTimeout(temp);
      temp = setTimeout(function () {
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

          <Campaigntable page={page} campignPerTable={campignPerTable} />
          <Box style={{ marginTop: "15px" }}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(list.length / 10)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
