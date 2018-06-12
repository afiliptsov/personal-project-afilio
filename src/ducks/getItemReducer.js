import axios from "axios";

const GET_ITEM = "GET_ITEM";

export function getItem(id) {
  return {
    type: GET_ITEM,
    payload: axios.get("/api/item" + `/${id}`)
  };
}

const initialState = {
  item: [],
  isLoading: false
};

export default function getItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEM}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ITEM}_FULFILLED`:
      return { ...state, isLoading: false, item: action.payload.data };
    default:
      return state;
  }
}
