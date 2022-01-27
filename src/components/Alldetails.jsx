import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function Alldetails() {
  const list = useSelector((state) => state.list);
  let { id } = useParams();

  const [detail] = _.filter(list, (el) => el._id === id);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Campaign list details
          </Typography>
          <Typography variant="h5" component="div">
            Campaign name is: {detail.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Company name is: {detail.company}
          </Typography>
          <Typography variant="body2">
            Campaign type is:{detail.type}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
