import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import Checkbox from './Checkbox';

export class TblColumns extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      cols: props.cols,
      showColArea: false
    }

    this.selectedCheckboxes = new Set();
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.toggleColumnArea = this.toggleColumnArea.bind(this);

    let setCheckbox = this.selectedCheckboxes;
    let fields = Object.keys(this.props.cols);
    fields.map(function(keyName, keyIndex) {
      setCheckbox.add(keyName);
    });
  }

  toggleCheckbox(label) {
    let newColumnOrder = [];
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      newColumnOrder = this.props.colOrder.filter((column) => column !== label);
    } else {
      this.selectedCheckboxes.add(label);
    }
    this.props.onChange(this.selectedCheckboxes);
  }

  toggleColumnArea() {
    this.setState ({
      showColArea: !this.state.showColArea
    });
  }

  //componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
  //  if (prevProps.colOrder !== this.props.colOrder) {
  //    var removeList = prevProps.colOrder.filter((item) => {
  //      return this.props.colOrder.indexOf(item) == -1;
  //    });
  //    if (removeList.length > 0) {
  //      this.toggleCheckbox(removeList[0]);
  //    }
  //  }
  //}

  render() {
    let keyNames = Object.keys(this.props.cols);
    let fields = Object.values(this.props.cols);
    let colOrder = this.props.colOrder;
    let toggleCheckbox = this.toggleCheckbox;
    return (
      <div>
        <div onClick={this.toggleColumnArea}> Show/Hide Columns </div>
        { this.state.showColArea && keyNames.map(function(keyName, keyIndex) {
            return (
              <Checkbox
                    name={keyName}
                    label={fields[keyIndex]}
                    checked={colOrder.indexOf(keyName) != -1}
                    handleCheckboxChange={toggleCheckbox}
                    key={keyIndex}
                />
            );
          })
        }
      </div>
    )
  }
}

TblColumns.propTypes = {
  cols: PropTypes.object.isRequired,
  colOrder: PropTypes.array,
  onChange: PropTypes.func
}
