import React, { useEffect, useState } from "react";
import styles from "./campaignlist.module.css";
import { Box, Container, TextField } from "@mui/material";
import Campaigntable from "./Capaigntable";
import { useDispatch } from "react-redux";
import { addTolist, searchkeyword } from "../redux/Action";
import campaign from "../data.json";

export default function Campaignlist() {
  const [campignPerTable] = useState(10);

  const dispatch = useDispatch();

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

          <Campaigntable campignPerTable={campignPerTable} />
        </Box>
      </Container>
    </div>
  );
}
