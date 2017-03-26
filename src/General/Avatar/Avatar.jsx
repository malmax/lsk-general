import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';

@importcss(require('./Avatar.css'))
export default class Avatar extends Component {
  constructor(props) {
    super();

    this.image = require(`./${props.img}`);
  }
  static propTypes = {
    img: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }
  render() {
    return (
      <div>
        <img
          src={this.image}
          alt={`Аватар пользователя ${this.props.username}`}
          title={`Пользователь ${this.props.username}`}
        />
      </div>
    );
  }
}
