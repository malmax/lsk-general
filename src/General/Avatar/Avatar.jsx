import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import { Image, Col, Row, Grid } from 'react-bootstrap';

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

        setTimeout(resolve.bind(this, { avatarSrc }), 2000);
      }
    }).then(avatarSrc => this.setState(avatarSrc, () => console.log(this.state)));
  }

  requireImage(imgPath) {
    if (/(:\/\/)|(www)/.test(imgPath)) {
      return imgPath;
    }

    let img;
    try {
      img = require(`./avatars/${imgPath}`);
    } catch (ex) {
      img = require('./avatars/defaultAvatar.jpg');
    }

    return img;
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <Image
              responsive src={this.state.avatarSrc} alt={`Аватар пользователя ${this.props.username}`} title={`Пользователь ${this.props.username}`} styleName={cx(
              ['Avatar_image'] : true,
            )}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
