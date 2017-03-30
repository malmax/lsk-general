import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
// import path from 'path';

@importcss(require('./Avatar.css'))
export default class Avatar extends Component {

  static propTypes = {
    img: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'defaultAvatar.jpg',
  }

  constructor(props) {
    super();

    // вначале ставим заглушку - placeholder
    this.state = {
      avatarSrc: this.requireImage(props.placeholder),
    };
  }

  componentDidMount() {
    new Promise((resolve) => {
      if (this.props.img) {
        const avatarSrc = this.requireImage(this.props.img);

        setTimeout(resolve({ avatarSrc }), 2000);
      }
    }).then(data => this.setState(data));
  }

  requireImage(imgPath) {
    if (/(:\/\/)|(www)/.test(imgPath)) {
      return imgPath;
    }

    let img;
    try {
      img = require(`url-loader!./avatars/${imgPath}`);
    } catch (ex) {
      img = require('url-loader!./avatars/defaultAvatar.jpg');
    }

    return img;
  }

  render() {
    return (
      <div>
        <img src={this.image} alt={`Аватар пользователя ${this.props.username}`} title={`Пользователь ${this.props.username}`} />
      </div>
    );
  }
}
