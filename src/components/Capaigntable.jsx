import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeOne } from "../redux/Action";
import DeleteIcon from "@mui/icons-material/Delete";
import  "./Capaigntable.css"

export default function Campaigntable({ list }) {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const handelredirect = (id) => () => {
    navigate(`/campaignlist/${id}`);
  };

  return (
    <div style={{ marginTop: "15px" }}>
     

    
    <div className="container">

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
                {list.map((el)=>(
                    <tr key={el._id}>
                        <td onClick={handelredirect(el._id)}>{el.name}</td>
                        <td onClick={handelredirect(el._id)}>{el.type}</td>
                        <td onClick={handelredirect(el._id)}>{el.company}</td>
                        <td><DeleteIcon onClick={() => dispatch(removeOne(el._id))} /></td>
                    </tr>

                ))}
            </tbody>
      </table>
      </div>
    </div>
  );
}
