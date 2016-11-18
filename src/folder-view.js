import React from 'react';
import { File, Folder } from './folder-view-component';

const FolderView = React.createClass ({
  getInitialState () {
    let orderAttr = 'type';
    if ( 'orderAttr' in this.props )
         orderAttr = this.props.orderAttr;

    let orderType = 'asc';
    if ( 'orderType' in this.props )
         orderType = this.props.orderType;

    let __currPathData = this.orderData (
      orderAttr,
      orderType,
      Object.keys (this.props.currPathData.data).map ((file, idx) =>
        Object.assign ({ name: file }, this.props.currPathData.data[file])
      )
    );

    return {
      currPathData: __currPathData,
      filesSize: __currPathData.reduce ((prev, curr) => {
        return (curr.type == 'dir') ? prev : prev + parseInt (curr.size);
      }, 0)
    };
  },
  render () {
    let files = this.state.currPathData.map ((file, idx) => {
      if ( file.type == 'dir' )
        return <Folder key={idx} {...file}
                 onClick={this.props.nextPath} style={this.props.style} />;

      return <File key={idx} {...file} style={this.props.style} />;
    });

    return (
      <table className={this.props.style.folder_view.table}>
        <thead>
          <tr>
            <th className={this.props.style.folder_view.name}>Name</th>
            <th className={this.props.style.folder_view.type}>Type</th>
            <th className={this.props.style.folder_view.size}>Size</th>
            <th className={this.props.style.folder_view.date}>Date</th>
          </tr>
        </thead>
        <tbody>
          {files}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <strong>File:</strong>
              {this.state.currPathData.length}
              {' - '}
              <strong>Size:</strong>
              {this.state.filesSize}
            </td>
          </tr>
        </tfoot>
      </table>
    );
  },
  orderData (attr, sort_type, data) {
    return data.sort ((a, b) => {
      let val = (sort_type == 'asc' ) ? 1 : -1;

      if ( a[attr] < b[attr] ) return -1 * val;
      if ( a[attr] > b[attr] ) return +1 * val;

      return 0;
    });
  }
});

export default FolderView;