import React, {Component, PropTypes} from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import _ from 'lodash';

const ButtonStatus = {
  none: 'none',
  loading: 'loading',
  success: 'success',
  error: 'error'
};

const ButtonColor = [
  'orange', 'yellow', 'carrot', 'pumpkin', 'alizarin', 'pomegranate', 'turquoise', 'green-sea',
  'emerald', 'nephritis', 'peter-river', 'belize-hole', 'amethyst', 'wisteria', 'wet-asphalt',
  'midnight-blue', 'clouds', 'silver', 'concrete', 'asbestos', 'graphite'
];

@importcss(require('./StatusButton.scss'))
export default class StatusButton extends Component {

  static propTypes = {
    color: PropTypes.string,
    rounded: PropTypes.bool,
    loading: PropTypes.bool,
    // status: PropTypes.oneOf(Object.keys(ButtonStatus)),
    click: PropTypes.func,
  }

  static defaultProps = {
    color: 'orange',
    rounded: false,
    // status: ButtonStatus[0],
    loading: false
  }

  constructor(props) {
    super();

    this.state = {
      loading: props.loading,
      color: _.includes(ButtonColor, props.color) ? props.color : ButtonColor[0],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.loading != this.state.loading) {
      console.log(nextProps.loading);
      this.setState({ loading: nextProps.loading });
    }
  }

  setStatus(loading=false, error=false, success=false) {

  }

  render() {
    const classNames = cx(`${this.state.color}-button`, {
      'rounded' : this.props.rounded,
      'loading' : this.state.loading,
    });

    let addContent = '';
    switch (this.state.status) {
      case ButtonStatus.loading:
        addContent = <div styleName="bounces">
          <div styleName="bounce1 bounce"></div>
          <div styleName="bounce2 bounce"></div>
          <div styleName="bounce3 bounce"></div>
        </div>;
        break;

    }

    return (
      <button styleName={classNames} onClick={this.props.click}>
        {this.props.children}{addContent}
      </button>
    );
  }
}
