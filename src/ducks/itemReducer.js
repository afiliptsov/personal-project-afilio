import axios from "axios";

const GET_ITEMS = "GET_ITEMS";
const GET_ITEM = "GET_ITEM";
const POST_ITEM = "POST_ITEM";

export function getItems() {
  return {
    type: GET_ITEMS,
    payload: axios.get("/api/item")
  };
}

export function getItem(id) {
  return {
    type: GET_ITEM,
    payload: axios.get("/api/item" + `/${id}`)
  };
}

export function postItem(
  user_id,
  item_category,
  item_title,
  item_price,
  item_description,
  item_location,
  item_picture,
  item_lat,
  item_lng
) {
  return {
    type: POST_ITEM,
    payload: axios.post("/api/additem", {
      user_id,
      item_category,
      item_title,
      item_price,
      item_description,
      item_location,
      item_picture,
      item_lat,
      item_lng
    })
  };
}
const initialState = {
  items: [],
  isLoading: false,
  item: []
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_ITEMS}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ITEMS}_FULFILLED`:
      return { ...state, isLoading: false, items: action.payload.data };
    case `${GET_ITEM}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_ITEM}_FULFILLED`:
      return { ...state, isLoading: false, items: action.payload.data };
    case `${POST_ITEM}_PENDING`:
      return { ...state, isLoading: true };
    case `${POST_ITEM}_FULFILLED`:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
