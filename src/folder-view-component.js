import React from 'react';

export const File = React.createClass ({
  render () {
    return (
      <tr>
        <td className={this.props.style.folder_view.name}>
          <i className={this.props.style.folder_view.file}></i>
          {' ' + this.props.name}
        </td>
        <td className={this.props.style.folder_view.type}>
          File
        </td>
        <td className={this.props.style.folder_view.size}>
          {this.props.size}
        </td>
        <td className={this.props.style.folder_view.date}>
          {this.props.date}
        </td>
      </tr>
    );
  }
});

export const Folder = React.createClass ({
  render () {
    return (
      <tr>
        <td className={this.props.style.folder_view.name}>
          <a className={this.props.style.link}
            onClick={() => this.props.onClick (this.props.name)}>
            <i className={this.props.style.folder_view.folder}></i>
            {' ' + this.props.name}
          </a>
        </td>
        <td className={this.props.style.folder_view.type}>
          Directory
        </td>
        <td className={this.props.style.folder_view.size}></td>
        <td className={this.props.style.folder_view.date}></td>
      </tr>
    );
  }
});
