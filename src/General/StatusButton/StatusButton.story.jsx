import React from 'react';
import {Grid, Col} from 'react-bootstrap';
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
    })
    .add('loading', () => {
      let loadingToggle = false;

      const handleClick = (target) => {
          action('target')(target);
          loadingToggle = !loadingToggle;
      };

      return (
        <div>
          <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
            <StatusButton color="peter-river" rounded click={handleClick} loading={loadingToggle}>
                Добавить в корзину
            </StatusButton>
          </div>
          <div style={{flex: '0 1 auto', margin: '5em 2em'}}>
            <StatusButton color="green-sea" rounded loading click={action('click')}>
                Отправить форму
            </StatusButton>
          </div>
        </div>);
    });
};
