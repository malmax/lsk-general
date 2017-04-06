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
      resolve: new Promise((res, rej) => setTimeout(res.bind(null, 'товар в корзине'), 4000))
      // resolve: fetch(this.props.url).then(res => res.text())
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
