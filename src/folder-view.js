import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from './nenav-store';
import { File, Folder } from './folder-view-component';

const FolderViewComponent = React.createClass ({
  render () {
    let files = this.props.data.map ((file, idx) => {
      if ( file.type == 'dir' )
        return <Folder key={idx} {...file} style={this.props.style}
                  onClick={() => this.props.dispatch ({
                    type: 'NEXT_DIR', dir: file.name
                  })}/>;

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
              File: {this.props.data.length} - Size: {
                this.props.data.reduce (
                  (prev, curr) => (prev + parseInt (curr.size)), 0
                )
              }
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
});

const FolderView = connect (mapStateToProps)(FolderViewComponent);

export default FolderView;
