/* eslint-disable class-methods-use-this */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import action from "./actions";
import "./App.css";

export class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.fetchYears();
  }

  onChange(e) {
    const { actions } = this.props;
    actions.fetchBudgets(e.target.value);
  }

  onEdit(item) {
    this.props.history.push({
      pathname: "/edit",
      state: {
        item: item
      }
    });
  }

  render() {
    const { years, budgets } = this.props;
    if (years.loading || budgets.loading) {
      return <div>{"Loading...."}</div>;
    }
    return (
      <div>
        {years.data && (
          <select name="year" onChange={this.onChange}>
            {years.data.items.map(item => (
              <option key={item.id} value={item.id}>
                {item.year}
              </option>
            ))}
          </select>
        )}

        {budgets.data && (
          <table>
            <thead>
              <tr>
                <th>Financial Year</th>
                <th>Name</th>
                <th>Description</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.data.items.map(item => (
                <tr key={item.id}>
                  <td>{item.year.year}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.type}</td>
                  <td>
                    <input
                      type="button"
                      value="Edit"
                      onClick={() => this.onEdit(item)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  years: state.years,
  budgets: state.budgets
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(action, dispatch)
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
