import React from 'react';
import PropTypes from 'prop-types';
import { getSmogonSprite } from '../../utilities/helpers';
import './PokémonOverview.css';

function PokémonOverview({ position, name, usage, onClickHandler, sprite }) {
  const readableUsage = `${usage * 100}`.substring(0, 4);
  return (
    <li className="pokemon-overview-wrapper">
      <button
        className="pokemon-overview"
        onClick={onClickHandler}
        type="button"
      >
        <span className="pokemon-position-overview">{`#${position}`}</span>
        <img
          className="pokemon-sprite-overview"
          src={getSmogonSprite(name, sprite)}
          title={name}
          alt={`${name} Sprite`}
        />
        <h2 className="pokemon-name-overview">{name}</h2>
        <span className="pokemon-usage-overview">{`${readableUsage}%`}</span>
      </button>
    </li>
  );
}

PokémonOverview.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  usage: PropTypes.number.isRequired,
  onClickHandler: PropTypes.func.isRequired,
  sprite: PropTypes.bool.isRequired,
};

export default PokémonOverview;
