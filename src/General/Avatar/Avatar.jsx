import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import { Image, Col, Row, Grid } from 'react-bootstrap';
import Media from 'react-media';

@importcss(require('./Avatar.css'))
export default class Avatar extends Component {

  static propTypes = {
    img: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'defaultAvatar.jpg',
    alt: 'Аватар пользователя',
    title: 'Пользователь',
  }

  constructor(props) {
    super();

    // вначале ставим заглушку - placeholder
    this.state = {
      avatarSrc: this.requireImage(props.placeholder),
    };

    // Если есть изображение высокой четкости
    if (props.avatarHighSrc) {
      this.avatarHighSrc = this.requireImage(props.avatarHighSrc);
    } else {
      this.avatarHighSrc = this.requireImage(props.img);
    }

    // Бэдж
    this.badge = null;
    if (props.badge) {
      this.badge = this.requireImage(props.badge);
    }
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
    const avatarStyles = cx(['Avatar_image'] : true,);

    return (
      <Grid>
        <Row>
          <Col xs={12} md={4}>
            <Media query="(max-width: 1500px)">
              {matches => matches
                ? (
                  <Image responsive src={this.state.avatarSrc} alt={this.props.alt} title={this.props.title} styleName={avatarStyles} />
                )
                : (
                  <Image responsive src={this.avatarHighSrc} alt={this.props.alt} title={this.props.title} styleName={avatarStyles} />
                )}
            </Media>

            <If condition={this.badge}>
              <Image src={this.badge} styleName="Avatar_badge" />
            </If>
          </Col>
        </Row>
      </Grid>
    );
  }
}
