import {
  LOAD_BUDGETS,
  LOAD_BUDGETS_SUCCESS,
  LOAD_BUDGETS_ERROR
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BUDGETS:
      return { ...state, loading: true };

    case LOAD_BUDGETS_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case LOAD_BUDGETS_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
