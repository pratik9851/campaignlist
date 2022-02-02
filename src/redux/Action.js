import {
  ADD_ONLIST,
  ALL_DETAILS,
  BULK_UPDATE,
  REMOVE_ONE,
  SEARCH_KEYWORD,
} from "./ActionType";

const addTolist = (data) => {
  return {
    type: ADD_ONLIST,
    payload: data,
  };
};

const allDetails = (data) => {
  return {
    type: ALL_DETAILS,
    payload: data,
  };
};

const removeOne = (data) => {
  return {
    type: REMOVE_ONE,
    payload: data,
  };
};
const searchkeyword = (data) => {
  return {
    type: SEARCH_KEYWORD,
    payload: data,
  };
};

const bulkupdate=(data)=>{
  return{
    type:BULK_UPDATE,
    payload:data,
  }
}

export { addTolist, allDetails, removeOne, searchkeyword,bulkupdate };
