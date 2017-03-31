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
          badge="badge.png"
        />
      </div>
    ))
    .add('high resolution', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          placeholder="loading.gif"
          imgHighRes="http://www.placehold.it/300?text=High+Resolution+Image"
        />
      </div>
    ))
    .add('border', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          placeholder="loading.gif"
          border
        />
      </div>
    ))
    .add('border active', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          borderActive
        />
      </div>
    ))
    .add('border circle', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          borderActive
          borderCircle
        />
      </div>
    ))
    .add('gray filter + border', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          placeholder="loading.gif"
          border
          grayFilter
        />
      </div>
    ))
    .add('shadow', () => (
      <div>
        <Avatar
          img={'myavatar.jpg'}
          username="avatar"
          shadow
        />
      </div>
    ));
};
