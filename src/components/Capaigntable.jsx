import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTolist, removeOne } from "../redux/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import "./Capaigntable.css";
import Editrow from "./Editrow";
import style from "./campaigntable.module.css";

export default function Campaigntable({ campignPerTable }) {
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  const [show, setShow] = useState(false);
  const [currentlist, setCurrentlist] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    company: "",
  });

  const [editCampaignId, setEditCampaignId] = useState(null);

  const list = useSelector((state) => state.list);

  const search = useSelector((state) => state.search);

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
    //console.log()

    const index = list.findIndex((el) => el._id === editCampaignId);

    newCampaigns[index] = editedcampaign;

    dispatch(addTolist(newCampaigns));

    // console.log(list)
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

  return (
    <div style={{ marginTop: "15px" }}>
      <div className="container">
        <>
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
          <button>Update selected</button>
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
