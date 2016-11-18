import React from 'react';

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
      Object.keys (this.props.currPathData.data).map ((file, idx) => [
        Object.assign ({ name: file }, this.props.currPathData.data[file])
      ])
    );

    return {
      currPathData: __currPathData,
      filesSize: this.sumSize (__currPathData)
    };
  },
  render () {
    let files = this.state.currPathData.map ((file, idx) => {
      if ( file.type == 'dir' )
        return (
          <tr>
            <td className={this.props.style.folder_view.name}>{file.name}</td>
            <td className={this.props.style.folder_view.type}>{file.type}</td>
            <td className={this.props.style.folder_view.size}></td>
            <td className={this.props.style.folder_view.date}></td>
          </tr>
        );
      return (
        <tr>
          <td className={this.props.style.folder_view.name}>{file.name}</td>
          <td className={this.props.style.folder_view.type}>{file.type}</td>
          <td className={this.props.style.folder_view.size}>{file.size}</td>
          <td className={this.props.style.folder_view.date}>{file.date}</td>
        </tr>
      );
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
            <td colspan="4">
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
  },
  sumSize (data) {
    let size = 0;

    for ( let idx in data )
      if ( data[idx].type == 'file' )
        size += data[idx].size;

    return size;
  }
});

export default FolderView;
