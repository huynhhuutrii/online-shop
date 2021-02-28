import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import appReducer from "./reducers/app.reducer";

const appStore = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(ReduxThunk))
)
export { appStore };
