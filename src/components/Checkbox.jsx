import React, { Component, PropTypes } from 'react';

class Checkbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isChecked: this.props.checked
    }
    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
  }

  toggleCheckboxChange() {
    const { handleCheckboxChange, name } = this.props;

    this.setState(({ isChecked }) => ({
      isChecked: !isChecked
    }));

    handleCheckboxChange(name);
  }

  render() {
    const { name, label, checked } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
        <label>
          <input
              type="checkbox"
              value={name}
              checked={isChecked}
              onChange={this.toggleCheckboxChange}
          />
          <span className="checkName"> {label} </span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
};

export default Checkbox;
