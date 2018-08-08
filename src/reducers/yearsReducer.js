import {
  LOAD_YEAR,
  LOAD_YEAR_SUCCESS,
  LOAD_YEAR_ERROR
} from "../constants/actionTypes";

const initialState = {
  loading: false,
  data: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_YEAR:
      return { ...state, loading: true };

    case LOAD_YEAR_SUCCESS:
      return { ...state, loading: false, data: action.payload };

    case LOAD_YEAR_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
