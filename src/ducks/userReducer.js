import axios from "axios";
// CONSTANTS
const GET_USER = "GET_USER";
const POST_TOKEN = "POST_TOKEN";
const REDUCE_CREDIT = "REDUCE_CREDIT";

// ACTION CREATORS
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}

export function postToken(token) {
  return {
    type: POST_TOKEN,
    payload: axios.post("/api/stripe", token)
  };
}

export function reduceCredit(id) {
  return {
    type: REDUCE_CREDIT,
    payload: axios.post("/api/usecredit", id)
  };
}

// INITIAL STATE

const initialState = {
  user: {},
  isAuthed: false
};

// REDUCER

export default function userReducer(state = initialState, action) {
  console.log(action.type, action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return { ...state, user: action.payload.data, isAuthed: true };
    case `${GET_USER}_REJECTED`:
      return { ...state, isAuthed: false };
    case `${POST_TOKEN}_PENDING`:
      return { ...state, isLoading: true };
    case `${POST_TOKEN}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, user: action.payload.data, isLoading: false };
    case `${REDUCE_CREDIT}_PENDING`:
      return { ...state, isLoading: true };
    case `${REDUCE_CREDIT}_FULFILLED`:
      console.log(action.payload.data);
      return { ...state, user: action.payload.data, isLoading: false };

    default:
      return state;
  }
}
