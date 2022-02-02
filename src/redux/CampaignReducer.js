import {
  ADD_ONLIST,
  BULK_UPDATE,
  REMOVE_ONE,
  SEARCH_KEYWORD,
} from "./ActionType";
import _ from "lodash";

const initialstate = {
  list: [],
  alldetail: [],
  search: "",
  bulkupdate: [],
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
    case SEARCH_KEYWORD:
      return {
        ...state,
        search: action.payload,
      };

    case BULK_UPDATE:
      return {
        ...state,
        bulkupdate: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default CampaignReducer;
