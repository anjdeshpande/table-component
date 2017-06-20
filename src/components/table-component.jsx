import React, { PropTypes } from "react";
import { FormattedMessage } from "react-intl";
import List from './List';
import ContainerDimensions from 'react-container-dimensions';

import styles from "../../src/styles/table-component.styl";
import messages from "../lang/default-messages";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormattedMessage {...messages.editMe} />
        <List width={this.props.width} height={this.props.height}
              columnTitles={this.props.columnTitles} columnWidths={this.props.columnWidths}
              fixedColumns={this.props.fixedColumns}/>
      </div>
    );
  }
}

TableComponent.displayName = "TableComponent";

TableComponent.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  columnTitles: PropTypes.object,
  columnWidths: PropTypes.object,
  fixedColumns: PropTypes.array
};

TableComponent.defaultProps = {
  width: 800,
  height: 500,
  columnTitles: {
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'city': 'City',
    'sentence': 'Sentence',
    'street': 'Street',
    'companyName': 'Company Name',
    'zipCode': 'Zip Code'
  },
  columnWidths: {
    'firstName': 150,
    'lastName': 150,
    'city': 150,
    'sentence': 240,
    'street': 150,
    'companyName': 200,
    'zipCode': 100
  },
  fixedColumns:[
    'firstName',
    'lastName'
  ]
};
