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
        console.log(self.props.url);

        try {
        setTimeout(async () => {
          // if(self.props.url == 'correct url') {
          //   res('товар добавлен в корину');
          // }
          // else {
          //   rej('произошла ошибка. попробуйте позже');
          // }
          try {
            await fetch(self.props.url)
              .then(async res2 => {
                const txt = await res2.text();
                console.log(res2, txt);
                if(res2.status != 200) {
                  rej('произошла ошибка. попробуйте повторить запрос позже');
                  return;
                }
                res(txt);
              })
              .catch(rej2 => rej(rej2))
          }
          catch(e) {
            rej('призошла ошибка');
          }
        }, 4000);
      }
      catch(e) {
        rej('error')
      }
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
