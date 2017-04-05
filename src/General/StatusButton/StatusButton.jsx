import React, {Component, PropTypes} from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import _ from 'lodash';
import ErrorIcon from 'react-icons/lib/md/error-outline';
import DoneIcon from 'react-icons/lib/md/done';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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


@importcss(require('./StatusButton.scss')) // eslint-disable-nextline
export default class StatusButton extends Component {

  static propTypes = {
    color: PropTypes.string,
    rounded: PropTypes.bool,
    status: PropTypes.oneOf(Object.keys(ButtonStatus)),
    click: PropTypes.func,
    resolve: PropTypes.any
  }

  static defaultProps = {
    color: 'orange',
    rounded: false,
    status: ButtonStatus[0],
    loading: false
  }

  constructor(props) {
    super();

    this.state = {
      loading: props.status == ButtonStatus.loading,
      success: props.status == ButtonStatus.success,
      error: props.status == ButtonStatus.error,
      color: _.includes(ButtonColor, props.color) ? props.color : ButtonColor[0],
      errorMsg: 'Повторите запрос позже',
      successMsg: ''
    }

    // promise
    if(props.resolve) {
      props.resolve
        .then(txt => this.setState({loading: false, success: true, error: false, successMsg: txt}))
        .catch(txt => this.setState({loading: false, success: false, error: true, errorMsg: txt}))
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    
      this.setState({
        loading: nextProps.status == ButtonStatus.loading,
        success: nextProps.status == ButtonStatus.success,
        error: nextProps.status == ButtonStatus.error,
      });


  }


  render() {
    const classNames = cx(`${this.state.color}-button`, {
      'rounded' : this.props.rounded,
      'loading' : this.state.loading,
      'success' : this.state.success,
      'error' : this.state.error,
    });


    let content = this.props.children;

    switch (this.props.status) {
      case ButtonStatus.loading:
        content =(<div>
                    {this.props.children}
                    <div styleName="bounces">
                      <div styleName="bounce1 bounce"></div>
                      <div styleName="bounce2 bounce"></div>
                      <div styleName="bounce3 bounce"></div>
                    </div>
                  </div>);
        break;
      case ButtonStatus.error:
        content = (<div>
                    <div><ErrorIcon size={40} color="#b53224" /> ошибка</div>
                    <div styleName="tooltip">{this.state.errorMsg}</div>
                  </div>);
        break;
      case ButtonStatus.success:
        content = (<div>
                    <div><DoneIcon size={50} /></div>
                    <div styleName="tooltip">{this.state.successMsg}</div>
                  </div>);
        break;
    }

    return (
          <button styleName={classNames} onClick={this.props.click} >
            {content}
          </button>
    );
  }
}
