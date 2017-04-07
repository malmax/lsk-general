import React, {Component, PropTypes} from 'react';
import importcss from 'importcss';
import cx from 'classnames';
import _ from 'lodash';
import ErrorIcon from 'react-icons/lib/md/error-outline';
import DoneIcon from 'react-icons/lib/md/done';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

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
      disabled: false,
      loading: props.status == ButtonStatus.loading,
      success: props.status == ButtonStatus.success,
      error: props.status == ButtonStatus.error,
      color: _.includes(ButtonColor, props.color) ? props.color : ButtonColor[0],
      resolve: props.resolve,
      errorMsg: 'Повторите запрос позже',
      successMsg: ''
    }


  }

  componentDidMount() {
    // в assignOnPromise используется setState. Поэтому выносим его сюда
    if(this.state.resolve) {
      this.assignOnPromise(this.props.resolve);
    }
  }

  componentWillReceiveProps(nextProps) {
    // если кнопка не отключена, то меняем состояния от внешних пропсов
    if(this.state.disabled) return;

    this.setState({
      loading: nextProps.status == ButtonStatus.loading,
      success: nextProps.status == ButtonStatus.success,
      error: nextProps.status == ButtonStatus.error,
      color: _.includes(ButtonColor, nextProps.color) ? nextProps.color : ButtonColor[0],
    });

    if(nextProps.resolve  && !this.state.resolve) {
      this.assignOnPromise(nextProps.resolve);
    }
  }

  assignOnPromise(promise) {
    // promise
    if(promise) {
      // когда приходит промис, переходит в сотосяние loading
      // и сохраняем промис в стэйт, чтобы не было потворного вызова
      this.setState({
        loading: true,
        disabled: true, // запрещаем внешнее изменение через пропсы
        resolve: promise
      });

      promise
        .then(txt => this.setState({
          loading: false,
          success: true,
          error: false,
          successMsg: txt
        }))
        .catch(txt => {
          this.setState({
            loading: false,
            success: false,
            error: true,
            errorMsg: txt
          });
        })
    }

    return promise;
  }


  render() {
    const classNames = cx(`${this.state.color}-button`, {
      'rounded' : this.props.rounded,
      'loading' : this.state.loading,
      'success' : this.state.success,
      'error' : this.state.error,
    });


    let content = this.props.children;

    if(this.state.loading) {
      content =(<div>
                  {this.props.children}
                  <div styleName="bounces">
                    <div styleName="bounce1 bounce"></div>
                    <div styleName="bounce2 bounce"></div>
                    <div styleName="bounce3 bounce"></div>
                  </div>
                </div>);
    } else if(this.state.error) {
      content = (<div>
                  <div><ErrorIcon size={30} color="#b53224" /> ошибка</div>
                  <div styleName="tooltip">{this.state.errorMsg}</div>
                </div>);
    } else if (this.state.success) {
      content = (<div>
                  <div><DoneIcon size={50} /></div>
                  <div styleName="tooltip">{this.state.successMsg}</div>
                </div>);
    }

    return (
        <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}>
            <button styleName={classNames} onClick={this.props.click} >
              {content}
            </button>
          </ReactCSSTransitionGroup>

    );
  }
}
