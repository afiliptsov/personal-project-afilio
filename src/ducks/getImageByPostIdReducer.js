import axios from "axios";

const GET_IMAGE = "GET_IMAGE";

export function getImageByPostId(id) {
  return {
    type: GET_IMAGE,
    payload: axios.get("/api/getimage" + `/${id}`)
  };
}

const initialState = {
  storedImage: [],
  isLoading: false
};

export default function getImageByPostIdReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_IMAGE}_PENDING`:
      return { ...state, isLoading: true };
    case `${GET_IMAGE}_FULFILLED`:
      return { ...state, isLoading: false, storedImage: action.payload.data };
    default:
      return state;
  }
}
