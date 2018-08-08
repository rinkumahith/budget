import {
  LOAD_YEAR,
  LOAD_YEAR_SUCCESS,
  LOAD_YEAR_ERROR,
  LOAD_BUDGETS,
  LOAD_BUDGETS_SUCCESS,
  LOAD_BUDGETS_ERROR
} from "../constants/actionTypes";

const url =
  "http://documentracker.tymecoach-development-ase.p.azurewebsites.net/api/";

const action = (type, payload = null) => ({
  type,
  payload
});

export function getYears() {
  return dispatch => {
    dispatch(action(LOAD_YEAR));
    fetch(`${url}/Budgets/financialyears`)
      .then(res => res.json())
      .then(json => dispatch(action(LOAD_YEAR_SUCCESS, json)))
      .catch(err => dispatch(action(LOAD_YEAR_ERROR, err)));
  };
}

export function getBudgets(year) {
  return dispatch => {
    dispatch(action(LOAD_BUDGETS));
    fetch(`${url}/Budgets`)
      .then(res => res.json())
      .then(json => dispatch(action(LOAD_BUDGETS_SUCCESS, json)))
      .catch(err => dispatch(action(LOAD_BUDGETS_ERROR, err)));
  };
}

// export function postAuthor(data) {
// return (dispatch) => {
// dispatch(action(POST_AUTHOR));
// fetch('http://localhost:3000/author', {
// method: 'post',
// headers: {
// Accept: 'application/json',
// 'Content-Type': 'application/json',
// },
// body: JSON.stringify(data),
// })
// .then(res => res.json())
// .then(json => dispatch(action(POST_AUTHOR_SUCCESS, json)))
// .catch(err => dispatch(action(POST_AUTHOR_ERROR, err)));
// };
// }
