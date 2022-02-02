import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTolist, bulkupdate, removeOne } from "../redux/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import "./Capaigntable.css";
import Editrow from "./Editrow";
import style from "./campaigntable.module.css";
import Bulkupdate from "./Bulkupdate";

export default function Campaigntable({ campignPerTable }) {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [show, setShow] = useState(false);
  const [currentlist, setCurrentlist] = useState([]);
  const [page, setPage] = useState(1);
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    company: "",
  });
  const [popup, setPopup] = useState(false);
  const [editCampaignId, setEditCampaignId] = useState(null);

  const dispatch = useDispatch();
  const list = useSelector((state) => state.list);
  const search = useSelector((state) => state.search);
  const bulk = useSelector((state) => state.bulkupdate);

  useEffect(() => {
    let key = search.toUpperCase();
    let ans = list.filter(
      (e) =>
        e.name.includes(key) || e.type.includes(key) || e.company.includes()
    );
    setCurrentlist(ans);
  }, [search, list]);
  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    setShow(false);
    event.preventDefault();

    const editedcampaign = {
      _id: editCampaignId,
      name: editFormData.name,
      type: editFormData.type,
      company: editFormData.company,
    };

    const newCampaigns = [...list];

    const index = list.findIndex((el) => el._id === editCampaignId);

    newCampaigns[index] = editedcampaign;

    dispatch(addTolist(newCampaigns));

    setEditCampaignId(null);
  };

  const handleEditClick = (event, campaign) => {
    event.preventDefault();
    setShow(!show);
    setEditCampaignId(campaign._id);

    const formValues = {
      name: campaign.name,
      type: campaign.type,
      company: campaign.company,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setShow(!show);
    setEditCampaignId(null);
  };

  let navigate = useNavigate();
  const handelredirect = (id) => () => {
    navigate(`/campaignlist/${id}`);
  };

  const handelcheckboxchange = (e, item) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      let arr = checkedBoxes;
      arr.push(item._id);

      setCheckedBoxes(arr);
    } else {
      let items = checkedBoxes.splice(checkedBoxes.indexOf(item._id), 1);

      setCheckedBoxes(items);
    }
  };

  const deleteBulk = () => {
    let newlist = [...list];

    for (let i = 0; i < checkedBoxes.length; i++) {
      newlist = newlist.filter((el) => el._id !== checkedBoxes[i]);
    }
    dispatch(addTolist(newlist));
  };
  const handelremove = (e) => () => {
    dispatch(removeOne(e._id));
  };

  const indexOfLastCampaign = page * campignPerTable;
  const indexOfFirstCampaign = indexOfLastCampaign - campignPerTable;
  const currentCampaign = currentlist.slice(
    indexOfFirstCampaign,
    indexOfLastCampaign
  );
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handelbulkupdate = () => {
    const updatebulk = [];
    for (let i = 0; i < checkedBoxes.length; i++) {
      list.map((el) => {
        if (el._id === checkedBoxes[i]) {
          updatebulk.push({ ...el });
        }
      });

      dispatch(bulkupdate(updatebulk));
      setPopup(!popup);
    }
  };

  const handeleditbulkchange = (event) => {
    event.preventDefault();

    const id = event.target.getAttribute("id");
    const fieldName1 = event.target.getAttribute("name");
    const fieldValue1 = event.target.value;

    const newupdated = [...bulk];
    newupdated.map((el) => {
      if (el._id === id) {
        el[fieldName1] = fieldValue1;
      }
    });

    dispatch(bulkupdate(newupdated));
  };
  const bulkupdatesave = () => {
    const new1 = [...list];

    bulk.map((el) => {
      let index = list.findIndex((e) => e._id === el._id);
      new1[index] = el;
    });

    dispatch(addTolist(new1));
    setPopup(!popup);
    setCheckedBoxes([]);
  };
  const handelcancel = () => {
    setPopup(!popup);
  };

  return (
    <div style={{ marginTop: "15px" }}>
      <div className="container">
        <>
          <div className={`${popup ? style.edit1 : style.edit2}`}>
            <div className="popup">
              <div className="inner-popup">
                {bulk.map((el) => (
                  <Bulkupdate
                    el={el}
                    key={el._id}
                    handeleditbulkchange={handeleditbulkchange}
                    className="innerdiv"
                  />
                ))}
                <button onClick={bulkupdatesave}>save changes</button>
                <button onClick={handelcancel}>cancel</button>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleEditFormSubmit}
            className={`${show ? style.edit1 : style.edit2}`}
          >
            <Editrow
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
            />
          </form>
          <button onClick={deleteBulk}>Delete selected</button>
          <button onClick={handelbulkupdate}>Update selected</button>
          <p>total no of rows:{currentlist.length}</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCampaign.map((el) => (
                <tr key={el._id}>
                  <td>
                    <input
                      type="checkbox"
                      id={el.id}
                      checked={checkedBoxes.find((p) => p._id === el._id)}
                      onChange={(e) => handelcheckboxchange(e, el)}
                    />
                  </td>
                  <td onClick={handelredirect(el._id)}>{el.name}</td>
                  <td onClick={handelredirect(el._id)}>{el.type}</td>
                  <td onClick={handelredirect(el._id)}>{el.company}</td>
                  <td className="Action">
                    <DeleteIcon onClick={handelremove(el)} />
                    <button onClick={(event) => handleEditClick(event, el)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Box style={{ marginTop: "15px" }}>
            <Stack spacing={2}>
              <Pagination
                count={Math.ceil(currentlist.length / 10)}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          </Box>
        </>
      </div>
    </div>
  );
}
