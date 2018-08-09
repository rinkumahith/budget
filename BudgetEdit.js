import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import action from "./actions";

class BudgetEdit extends Component {
  constructor(props) {
    super(props);
    const { item } = props.location.state;
    this.state = {
      name: item.name,
      description: item.description,
      financialYear: item.financialYearId,
      type: item.type
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  save(item) {

    this.setState({ name: item.name, id: item.id });
  }
  cancel(item) {
    console.log(item);
    const { data, Name,description } = this.state;
    this.setState({ data: data.filter(x => x.id !== item.id) });
  }
  onSubmit(e) {
    e.preventDefault();
    const { actions, location } = this.props;
    const { name, description, financialYear, type } = this.state;
    console.log(location.state.item.id);
    actions.putBudget(location.state.item.id, {
      financialYearId: financialYear,
      type: type,
      name: name,
      description: description,
      amount: 0
    });
  }

  render() {
    const { years } = this.props;
    const { name, description, financialYear, type } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              name="description"
              value={description || ""}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label htmlFor="financialYear">Financial Year</label>
            {years.data && (
              <select
                name="financialYear"
                value={financialYear}
                onChange={this.onChange}
              >
                {years.data.items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.year}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <label htmlFor="type">Type</label>
            <select name="type" onChange={this.onChange}>
              <option value="Capex">Capex</option>
              <option value="Opex">Opex</option>
            </select>
          </div>
          <input type="button" value="Cancel" />
          <input type="reset" value="Reset" />
          <input type="submit" value="Save" />
        </form>
      </div>
    );
  }
}

BudgetEdit.propTypes = {};

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
  )(BudgetEdit)
);
