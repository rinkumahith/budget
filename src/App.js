/* eslint-disable class-methods-use-this */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import action from "./actions";
import "./App.css";

export class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      year: ""
    };
    this.onChangeValue = this.onChangeValue.bind(this);
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.getYears();
  }

  onChangeValue(e) {
    const { actions } = this.props;
    this.setState({ [e.target.name]: e.target.value });
    actions.getBudgets(e.target.value);
  }

  render() {
    const { years, budgets } = this.props;
    console.log(years);
    if (years.loading || budgets.loading) {
      return <div>{"Loading...."}</div>;
    }
    return (
      <div>
        {years.data && (
          <select name="year" onChange={this.onChangeValue}>
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
                    <input type="button" value="Edit" />
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
