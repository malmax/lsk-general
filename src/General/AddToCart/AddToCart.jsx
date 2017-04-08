import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import 'whatwg-fetch';
import Cart from 'react-icons/lib/md/shopping-cart';
import StatusButton from '../StatusButton';

@importcss(require('./AddToCart.scss')) // eslint-disable-nextline
export default class AddToCart extends Component {

  static propTypes = {
    url: PropTypes.string.isRequired
  }

  static defaultProps = {

  }

  constructor(props) {
    super();

    this.state = {
      resolve: null
    }

    this.clickHandler = this.clickHandler.bind(this);

  }

  clickHandler({ target }) {
    this.setState({
      resolve: new Promise((res, rej) => {
        const self = this;
        console.log('fetch to',self.props.url);

        setTimeout(() => {

          try {
            fetch(self.props.url)
              .then(response => {
                if (response.status >= 200 && response.status < 300) {
                  return response;
                } else {
                  rej('нет соединения. попробуйте позже');
                }
              })
              .then(async response => {
                const txt = await response.text();
                res(txt);
              })
              .catch(response => {
                rej('попробуйте повторить запрос позже');
              })
          }
          catch(e) {
            rej('призошла ошибка');
          }
        }, 4000);

    })
    });
  }

  render() {
    return (

      <div>
        <StatusButton
          color="peter-river"
          rounded
          resolve={this.state.resolve}
          click={this.clickHandler}
        >
          <Cart size={35} />  В КОРЗИНУ
          </StatusButton>
      </div>
    );
  }
}
