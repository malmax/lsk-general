import React from 'react';
import Avatar from './Avatar';
import _ from 'lodash';

const WrapBootsrstap = props => (
  <div>
    <link rel="stylesheet" type="text/css" href="https://yastatic.net/bootstrap/3.3.6/css/bootstrap.min.css" />
    { props() }
  </div>
);

module.exports = function ({ storiesOf, action }) {
  return storiesOf('Avatar', module)
    .addDecorator(WrapBootsrstap)
    .add('image not found', () => (
      <Avatar
        img={'notExistImage.jpg'}
        username="avatar"
      />
    ))
    .add('placeholder', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          placeholder="loading.gif"
        />
      </div>
    ))
    .add('badge', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          placeholder="loading.gif"
          badge="http://www.iconsdb.com/icons/preview/orange/new-badge-3-xxl.png"
        />
      </div>
    ));
};
