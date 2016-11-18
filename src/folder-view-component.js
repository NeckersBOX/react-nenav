import React from 'react';

export const File = React.createClass ({
  getInitialState () {
    return {
      name: this.props.name,
      size: this.props.size,
      type: this.props.type,
      date: this.props.date
    }
  },
  componentWillReceiveProps () {
    this.setState ({
      name: this.props.name,
      size: this.props.size,
      type: this.props.type,
      date: this.props.date
    });
  },
  render () {
    return (
      <tr>
        <td className={this.props.style.folder_view.name}>
          <i className={this.props.style.folder_view.file}></i>
          {' ' + this.state.name}
        </td>
        <td className={this.props.style.folder_view.type}>
          {this.state.type == 'dir' ? 'DIR' : ''}
        </td>
        <td className={this.props.style.folder_view.size}>
          {this.state.size}
        </td>
        <td className={this.props.style.folder_view.date}>
          {this.state.date}
        </td>
      </tr>
    );
  }
});

export const Folder = React.createClass ({
  getInitialState () {
    return { name: this.props.name };
  },
  componentWillReceiveProps () {
    this.setState ({ name: this.props.name });
  },
  render () {
    return (
      <tr>
        <td className={this.props.style.folder_view.name}>
          <a className={this.props.style.link}
            onClick={() => this.props.onClick (this.props.name)}>
            <i className={this.props.style.folder_view.folder}></i>
            {' ' + this.state.name}
          </a>
        </td>
        <td className={this.props.style.folder_view.type}>
          Folder
        </td>
        <td className={this.props.style.folder_view.size}></td>
        <td className={this.props.style.folder_view.date}></td>
      </tr>
    );
  }
});
