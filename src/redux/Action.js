import {
  ADD_ONLIST,
  ALL_DETAILS,
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

export { addTolist, allDetails, removeOne, searchkeyword };
