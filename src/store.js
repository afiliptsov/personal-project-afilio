import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import itemReducer from "./ducks/itemReducer";
import getItemReducer from "./ducks/getItemReducer";
import imageReducer from "./ducks/imageReducer";

const combinedReducers = combineReducers({
  user: userReducer,
  items: itemReducer,
  item: getItemReducer,
  images: imageReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;
