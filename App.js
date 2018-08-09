import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import BudgetList from "./BudgetList";
import BudgetEdit from "./BudgetEdit";

const App = () => {
  return (
    <Router>
      <div>
        <Route exact path="/" component={BudgetList} />
        <Route path="/edit" component={BudgetEdit} />
      </div>
    </Router>
  );
};

App.propTypes = {};

export default App;
