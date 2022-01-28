import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTolist, removeOne } from "../redux/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Capaigntable.css";
import Editrow from "./Editrow";
import style from "./campaigntable.module.css";
import campaign from "../data.json";

export default function Campaigntable({ list }) {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [editFormData, setEditFormData] = useState({
    name: "",
    type: "",
    company: "",
  });

  const [editCampaignId, setEditCampaignId] = useState(null);

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

    const newCampaigns = [...campaign];

    const index = campaign.findIndex((el) => el._id === editCampaignId);

    newCampaigns[index] = editedcampaign;

    dispatch(addTolist(newCampaigns));
    // setcampaigns(newcampaigns);
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

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((el) => (
                <tr key={el._id}>
                  <td onClick={handelredirect(el._id)}>{el.name}</td>
                  <td onClick={handelredirect(el._id)}>{el.type}</td>
                  <td onClick={handelredirect(el._id)}>{el.company}</td>
                  <td className="Action">
                    <DeleteIcon onClick={() => dispatch(removeOne(el._id))} />{" "}
                    <button onClick={(event) => handleEditClick(event, el)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>
    </div>
  );
}
