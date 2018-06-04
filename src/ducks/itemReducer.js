import axios from "axios";

const GET_ITEMS = "GET_ITEMS";

export function getItems() {
  return {
    type: GET_ITEMS,
    payload: axios.get("/api/item")
  };
}

const initialState = {
  items: [],
  isLoading: false
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEMS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ITEMS}_FULFILLED`:
      return { ...state, isLoading: false, items: action.payload.data };
    default:
      return state;
  }
}
