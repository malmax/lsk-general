import React from 'react';
import Avatar from './Avatar';
import _ from 'lodash';

module.exports = function ({ storiesOf, action }) {
  return storiesOf('Avatar', module)
    .add('placeholder', () => (
      <div>
        <Avatar img={'myavatar.jpg'} username="avatar" />
        Placeholder. Изображение которое мы показываем в случае
        если аватарки пользователя нет, изображение не удалось
         загрузить изза проблем с сервером или изображение в процессе загрузки.
      </div>
    ))
    .add('full color', () => (
      <Avatar
        img={'myavatar2.jpg'}
        username="avatar"
        full
        color="#eee"
      />
    ));
};
