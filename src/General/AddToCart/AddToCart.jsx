import React, { Component, PropTypes } from 'react';
import importcss from 'importcss';
import fetch from 'node-fetch';
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
      resolve: new Promise(async (res, rej) => {
        const self = this;

        setTimeout(async () => {
          try {
            await fetch(self.props.url)
              .then(res2 => {
                if(res2.status != 200 || !(res2.text().trim())) {
                  rej('произошла ошибка. попробуйте повторить запрос позже');
                  return;
                }
                res(res2.text());
              })
              .catch(rej2 => rej(rej2))
          }
          catch(e) {
            rej('призошла ошибка');
          }
        }, 4000);
      })
      // resolve:
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
