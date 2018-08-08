import { combineReducers } from "redux";
import years from "./yearsReducer";
import budgets from "./budgetsReducer";

const rootReducer = combineReducers({
  years,
  budgets
});

export default rootReducer;
