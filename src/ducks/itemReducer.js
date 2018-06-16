import axios from "axios";

const GET_ITEMS = "GET_ITEMS";
const POST_ITEM = "POST_ITEM";
const POST_CHANGE_PRIORITY = "POST_CHANGE_PRIORITY";

export function getItems() {
  return {
    type: GET_ITEMS,
    payload: axios.get("/api/item")
  };
}

export function changeItemPriority(item_id) {
  return {
    type: POST_CHANGE_PRIORITY,
    payload: axios.post("/api/changepriority", item_id)
  };
}

export function postItem(
  user_id,
  item_category,
  item_title,
  item_price,
  item_description,
  item_location,
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
      item_lat,
      item_lng
    })
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
    case `${POST_CHANGE_PRIORITY}_PENDING`:
      return { ...state, isLoading: true };
    case `${POST_CHANGE_PRIORITY}_FULFILLED`:
      return { ...state, user: action.payload.data, isLoading: false };
    case `${POST_ITEM}_PENDING`:
      return { ...state, isLoading: true };
    case `${POST_ITEM}_FULFILLED`:
      return { ...state, isLoading: true };

    default:
      return state;
  }
}
