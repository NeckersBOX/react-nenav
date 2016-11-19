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

      return <File key={idx} {...file} style={this.props.style}
                humanSize={this.humanSize} dataFunc={this.props.dataFunc}
                path={'/' + this.props.path.slice (1).join ('/') + '/'} />;
    });

    return (
      <table className={this.props.style.folder_view.table}>
        <thead>
          <tr>
            <th className={this.props.style.folder_view.name}>
              <a className={this.props.style.link} onClick={
                () => this.props.dispatch (
                  { type: 'CHANGE_DATA_SORT', data_attr: 'name' }
                )}>
                Name <i className={this.getIcon ('name')}></i>
              </a>
            </th>
            <th className={this.props.style.folder_view.type}>
              <a className={this.props.style.link} onClick={
                () => this.props.dispatch (
                  { type: 'CHANGE_DATA_SORT', data_attr: 'type' }
                )}>
                Type <i className={this.getIcon ('type')}></i>
              </a>
            </th>
            <th className={this.props.style.folder_view.size}>
              <a className={this.props.style.link} onClick={
                () => this.props.dispatch (
                  { type: 'CHANGE_DATA_SORT', data_attr: 'size' }
                )}>
                Size <i className={this.getIcon ('size')}></i>
              </a>
            </th>
            <th className={this.props.style.folder_view.date}>
              <a className={this.props.style.link} onClick={
                () => this.props.dispatch (
                  { type: 'CHANGE_DATA_SORT', data_attr: 'date' }
                )}>
                Date <i className={this.getIcon ('date')}></i>
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {files}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              {this.props.data.filter ((val) => val.type != 'dir' ).length} Files
              {', ' + this.props.data.filter ((val) => val.type == 'dir' ).length} Directories
              {' - ' +
                this.humanSize (
                  this.props.data.reduce ((prev_size, curr_file) => {
                    if ( curr_file.type == 'dir' ) return prev_size;
                    return prev_size + parseInt (curr_file.size);
                  }, 0)
                )
              }
            </td>
          </tr>
        </tfoot>
      </table>
    );
  },
  humanSize (byte_size) {
    let units = [ 'KB', 'MB', 'GB', 'TB' ];

    if ( byte_size < 512 )
      return byte_size + ' B';

    let units_idx = -1;

    do {
      byte_size /= 1024;
      units_idx++;
    } while ( byte_size > 1024 );

    return byte_size.toFixed (2) + ' ' + units[units_idx];
  },
  getIcon (attr) {
    if ( attr != this.props.data_sort.attr )
      return '';

    if ( this.props.data_sort.type == 'asc' )
      return this.props.style.icon.arrow_down;

    return this.props.style.icon.arrow_up;
  }
});

const FolderView = connect (mapStateToProps)(FolderViewComponent);

export default FolderView;
