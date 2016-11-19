import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './nenav-store';
import { File, Folder } from './folder-view-component';

const FolderViewComponent = React.createClass ({
  render () {
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
          {/* files */}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <strong>File:</strong>
              {/* this.state.currPathData.length */}
              {' - '}
              <strong>Size:</strong>
              {/* this.state.filesSize */}
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

const FolderView = connect (mapStateToProps)(FolderViewComponent);

export default FolderView;
