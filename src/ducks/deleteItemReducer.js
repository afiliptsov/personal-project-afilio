import axios from "axios";

const DELETE_ITEM = "DELETE_ITEM";

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    payload: axios.delete("/api/deleteItem" + `/${id}`)
  };
}

const initialState = {
  items: [],
  isLoading: false
};

export default function deleteItemReducer(state = initialState, action) {
  switch (action.type) {
    case `${DELETE_ITEM}_PENDING`:
      return { ...state, isLoading: true };
    case `${DELETE_ITEM}_FULFILLED`:
      return { ...state, isLoading: false, items: action.payload.data };
    default:
      return state;
  }
}
