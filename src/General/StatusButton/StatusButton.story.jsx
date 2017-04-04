import React from 'react';
import { linkTo } from '@kadira/storybook';
import StatusButton from './StatusButton';

const WrapBootsrstap = props => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '700px',
    flexWrap: 'wrap'
  }}>
    {props()}
  </div>
);

const colors = [
  'orange',
  'yellow',
  'carrot',
  'pumpkin',
  'alizarin',
  'pomegranate',
  'turquoise',
  'green-sea',
  'emerald',
  'nephritis',
  'peter-river',
  'belize-hole',
  'amethyst',
  'wisteria',
  'wet-asphalt',
  'midnight-blue',
  'clouds',
  'silver',
  'concrete',
  'asbestos',
  'graphite'
];

module.exports = function({storiesOf, action}) {
  return storiesOf('StatusButton', module)
    .addDecorator(WrapBootsrstap)
    .add('buttons', () => {

      return colors.map((item, index) => {
        return (
          <div style={{flex: '0 1 auto', margin: '0 2em'}}>
            <StatusButton color={item} id={item+index}>
              {item}
            </StatusButton>
          </div>
        );
      });
    })
    .add('rounded buttons', () => {
      return colors.map((item, index) => {
        return (
          <div style={{flex: '0 1 auto', margin: '0 2em'}}>
            <StatusButton color={item} key={item+index+'rounded'} rounded>
              {item}
            </StatusButton>
          </div>
        );
      });
    }).add('statuses', () => {
        return (
          <div>
            <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
              <StatusButton color="green-sea" rounded >
                  Быстрый заказ
              </StatusButton>
            </div>

            <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
              <StatusButton color="green-sea" rounded status="loading">
                  Быстрый заказ
              </StatusButton>
            </div>

            <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
              <StatusButton color="green-sea" rounded status="success">
                  Быстрый заказ
              </StatusButton>
            </div>

            <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
              <StatusButton color="green-sea" rounded status="error">
                  Быстрый заказ
              </StatusButton>
            </div>
          </div>
        );
    }).add('click me', () => {
        return (
          <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
            <StatusButton color="peter-river" rounded click={linkTo('StatusButton', 'loading')}>
                Добавить в корзину
            </StatusButton>
          </div>
        );
    }).add('loading', () => {

      return (
        <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
          <StatusButton color="peter-river" rounded status='loading' click={action('click')}>
              Добавить в корзину
          </StatusButton>
        </div>
        );
    });
};
