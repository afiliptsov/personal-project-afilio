import axios from "axios";

const POST_IMAGE = "POST_IMAGE";

export function postImage(post_id, image_url) {
  return {
    type: POST_IMAGE,
    payload: axios.post("/api/addimage", {
      post_id,
      image_url
    })
  };
}

const initialState = {
  images: [],
  isLoading: false
};

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case `${POST_IMAGE}_PENDING`:
      return { ...state, isLoading: true };
    case `${POST_IMAGE}_FULFILLED`:
      return { ...state, isLoading: false, images: action.payload.data };
    default:
      return state;
  }
}
