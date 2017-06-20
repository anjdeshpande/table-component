import React, { PropTypes } from 'react';
import FixedDataTable from 'fixed-data-table-2';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import ExampleImage from './helpers/ExampleImage';
import {TblColumns} from './TblColumns';

const {Table, Column, Cell} = FixedDataTable;
const { ColoredTextCell, RemovableHeaderCell, TextCell } = require('./helpers/cells');

const ImageCell = ({rowIndex, data, col, ...props}) => (
  <ExampleImage
    src={data.getObjectAt(rowIndex)[col]}
  />
);

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data.getObjectAt(
      this._indexMap[index],
    );
  }
}

export default class List extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._dataList = new FakeObjectDataListStore(2000);
    this.state = {
      filteredDataList: this._dataList,
      columnWidths: this.props.columnWidths,
      columnOrder: Object.keys(this.props.columnTitles)
    };

    this._onFilterChange = this._onFilterChange.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._handleColumnHide = this._handleColumnHide.bind(this);
    this._resetColumns= this._resetColumns.bind(this);
    this._onColumnReorderEndCallback = this._onColumnReorderEndCallback.bind(this);
    this._onChangeCols= this._onChangeCols.bind(this);
    this._resetColumn = this._resetColumn.bind(this);
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  _onFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList,
      });
    }

    var filterBy = e.target.value.toLowerCase();
    var size = this._dataList.getSize();
    var filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      var obj = this._dataList.getObjectAt(index);
      var filteredItem = this.state.columnOrder.filter((item) => {
        return obj[item].toLowerCase().indexOf(filterBy) !== -1;
      });
      if (filteredItem.length > 0)
        filteredIndexes.push(index);
    }

    this.setState({
      filteredDataList: new DataListWrapper(filteredIndexes, this._dataList),
    });
  }

  _handleColumnHide(columnKey) {
    let newColumnOrder = this.state.columnOrder.filter((column) => column !== columnKey);
    this.setState({
      columnOrder: newColumnOrder
    });
  }

  _resetColumns() {
    this.setState({
      columnOrder: Object.keys(this.props.columnTitles)
    });
  }

  _resetColumn(colName) {
    let cols = Object.keys(this.props.columnTitles);
    let colIdx = cols.indexOf(colName);
    this.state.columnOrder.splice(colIdx, 0, colName);
    let newColumnOrder = this.state.columnOrder;
    this.setState({
      columnOrder: newColumnOrder
    });
  }

  _onColumnReorderEndCallback(event) {
    console.log(event);
    var columnOrder = this.state.columnOrder.filter((columnKey) => {
      return columnKey !== event.reorderColumn;
    });

    if (event.columnAfter) {
      var index = columnOrder.indexOf(event.columnAfter);
      columnOrder.splice(index, 0, event.reorderColumn);
    } else {
      if (fixedColumns.indexOf(event.reorderColumn) !== -1) {
        columnOrder.splice(fixedColumns.length - 1, 0, event.reorderColumn)
      } else {
        columnOrder.push(event.reorderColumn);
      }
    }
    this.setState({
      columnOrder: columnOrder
    });
  }

  _onChangeCols(cols) {
    let columns = this.state.columnOrder;
    let updCols = Array.from(cols);
    let removeList = columns.filter((item) => {
      return updCols.indexOf(item) == -1;
    });

    let addList = updCols.filter((item) => {
      return columns.indexOf(item) == -1;
    });

    if (removeList.length > 0) {
      this._handleColumnHide(removeList[0]);
    }

    if (addList.length > 0) {
      this._resetColumn(addList[0]);
    }
  }

  updateState(columns) {
    this.setState({
      columnOrder: columns
    });
  }
  render() {
    let {filteredDataList, columnWidths} = this.state;
    let handleColumnHide = this._handleColumnHide;
    let columnTitles = this.props.columnTitles;
    let colWidths = this.props.columnWidths;

    return (
      <div className="listData">
        <div className="tblActions">
          <input
            className="filter" placeholder="Filter records" width={500}
            onChange={this._onFilterChange}/>
          <button className="resetCols" onClick={this._resetColumns}>Reset Columns</button>
        </div>

        <TblColumns cols={columnTitles} colOrder={this.state.columnOrder}
                onChange={this._onChangeCols}/>
        <Table
          rowHeight={50}
          rowsCount={filteredDataList.getSize()}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          onColumnReorderEndCallback={this._onColumnReorderEndCallback}
          isColumnResizing={false}
          isColumnReordering={false}
          headerHeight={50}
          width={this.props.width-50}
          height={500}
          >
          {this.state.columnOrder.map(function (columnKey, i) {
            return <Column
              columnKey={columnKey}
              key={i}
              header={<Cell>{columnTitles[columnKey]}</Cell>}
              cell={<TextCell data={filteredDataList} />}
              fixed={i === 0}
              isReorderable={true}
              isResizable={true}
              width={colWidths[columnKey]}
            />;
          })}

        </Table>
      </div>
    );
  }

}

List.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  columnTitles: PropTypes.object,
  columnWidths: PropTypes.object,
  fixedColumns: PropTypes.array
}
