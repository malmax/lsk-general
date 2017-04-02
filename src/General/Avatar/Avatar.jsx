import React, {Component, PropTypes} from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import {Image, Col, Row, Grid} from 'react-bootstrap';
import MediaQuery from 'react-responsive';

@importcss(require('./Avatar.css'))
export default class Avatar extends Component {

  static propTypes = {
    img: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    alt: PropTypes.string,
    title: PropTypes.string,
    border: PropTypes.bool,
    borderActive: PropTypes.bool,
    grayFilter: PropTypes.bool,
    shadow: PropTypes.bool,
    borderCircle: PropTypes.bool
  }

  static defaultProps = {
    placeholder: 'defaultAvatar.jpg',
    border: false,
    borderActive: false,
    grayFilter: false,
    shadow: false,
    borderCircle: false
  }

  constructor(props) {
    super();

    // дефолтные пропсы в зависимости от других пропсов
    this.altText = props.alt || `Аватар пользователя ${props.username}`;
    this.titleText = props.title || `Пользователь ${props.username}`;
    const border = props.border || props.borderActive;

    // вначале ставим заглушку - placeholder
    this.state = {
      avatarSrc: this.requireImage(props.placeholder)
    };

    // Если есть изображение высокой четкости
    if (props.imgHighRes) {
      this.avatarHighSrc = this.requireImage(props.imgHighRes);
    } else {
      this.avatarHighSrc = this.requireImage(props.img);
    }

    // Бэдж
    this.badge = null;
    if (props.badge) {
      this.badge = this.requireImage(props.badge);
    }

    // Стили
    this.avatarStyles = cx({
      'Avatar_image': true,
      'Avatar_border_active': props.borderActive,
      'Avatar_border': border,
      'Gray_Filter': props.grayFilter,
      'Border_circle': props.borderCircle
    });
    // console.log(props.border, this.avatarStyles);
  }

  componentDidMount() {
    new Promise((resolve) => {
      if (this.props.img) {
        const avatarSrc = this.requireImage(this.props.img);
        // TODO: del setTimeout on production
        setTimeout(resolve.bind(this, {avatarSrc}), 1000);
      }
    }).then(avatarSrc => this.setState(avatarSrc));
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
            <div styleName={cx({
              'Avatar_container': true,
              'Shadow': this.props.shadow,
              })}>
              <MediaQuery query='(max-width: 1224px)'>
                <Image responsive src={this.state.avatarSrc} alt={this.altText} title={this.titleText} styleName={this.avatarStyles}/>
              </MediaQuery>

              <MediaQuery query='(min-width: 1224px)'>
                <Image responsive src={this.avatarHighSrc} alt={this.altText} title={this.titleText} styleName={this.avatarStyles}/>

              </MediaQuery>

              <If condition={this.badge}>
                <Image src={this.badge} styleName="Avatar_badge"/>
              </If>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}
