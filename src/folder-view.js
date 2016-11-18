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
      this.props.currPathData.data
    );

    return {
      currPathData: __currPathData,
      filesSize: this.sumSize (__currPathData);
    };
  },
  render () {
    console.log (this.state.currPathData);

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
        </tbody>
        <tfoot>
        </tfoot>
      </table>
    );
  },
  orderData (attr, sort_type, data) {
    let indexData = Object.keys (data).map ((file, idx) => [idx, data[file]]);

    return indexData.sort ((a, b) => {
      let val = (sort_type == 'asc' ) ? 1 : -1;

      if ( a[1][attr] < b[1][attr] ) return -1 * val;
      if ( a[1][attr] > b[1][attr] ) return +1 * val;

      return 0;
    });
  },
  sumSize (data) {
    let size = 0;

    for ( let idx in data )
      if ( data[idx][1].type == 'file' )
        size += data[idx][1].size;

    return size;
  }
});

export default FolderView;
