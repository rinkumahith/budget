import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";

const enhancers = [];

let middleware = [thunk];
// let middlewareApply;

if (process.env.NODE_ENV === "development") {
  const { devToolsExtension } = window;
  middleware = [...middleware, logger];

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

export default function configureStore(initialState = {}) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  return store;
}
