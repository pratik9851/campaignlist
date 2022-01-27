import { ADD_ONLIST, REMOVE_ONE } from "./ActionType";
import _ from "lodash";

const initialstate = {
  list: [],
  alldetail: [],
};

const CampaignReducer = (state = initialstate, action) => {
  switch (action.type) {
    case ADD_ONLIST:
      return {
        ...state,
        list: action.payload,
      };
    case REMOVE_ONE:
      return {
        ...state,
        list: _.filter(state.list, (el) => el._id !== action.payload),
      };
    default:
      return {
        ...state,
      };
  }
};

export default CampaignReducer;
