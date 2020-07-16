import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  getSmogonSprite,
  getSmogonLink,
  getPercent,
  getSpreadString,
} from '../../utilities/helpers';
import './Pokémon.css';

function Pokémon({
  abilities,
  checksAndCounters,
  items,
  moves,
  name,
  position,
  rawCount,
  spreads,
  teammates,
  usage,
}) {
  const [page, setPage] = useState(0);

  const readableUsage = `${usage * 100}`.substring(0, 4);
  return (
    <div className="pokemon-detail">
      <h2 className="pokemon-title">{name}</h2>
      <strong className="number">{position}</strong>
      <strong className="usage">{`${readableUsage}%`}</strong>
      <button
        className="sprite-button"
        type="button"
        onClick={() => getSmogonLink(name)}
      >
        <img
          className="pokemon-sprite"
          src={getSmogonSprite(name)}
          title={name}
          alt={`${name} Sprite`}
        />
      </button>
      <div className="tab-wrapper">
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          <span>Info</span>
        </button>
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          <span>Teammates</span>
        </button>
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(2)}
          disabled={page === 2}
        >
          <span>Checks / Counters</span>
        </button>
      </div>
      {page === 0 && (
        <>
          <div className="stat-container" id="abilities">
            <h3 className="stat-title">Abilities</h3>
            <ul className="stat-list">
              {abilities.map(({ ability, usage: abilityUsage }) => (
                <li className="stat-list-element">
                  <span className="stat">{`${ability}`}</span>
                  <span className="stat">
                    {getPercent(abilityUsage, rawCount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="stat-container">
            <h3 className="stat-title">Most used items</h3>
            <ul className="stat-list">
              {items.map(({ item, usage: itemUsage }) => (
                <li className="stat-list-element">
                  <span className="stat">{`${item}`}</span>
                  <span className="stat">
                    {getPercent(itemUsage, rawCount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="stat-container" id="spread">
            <h3 className="stat-title">Spreads</h3>
            <ul className="stat-list">
              {spreads.map(
                ({
                  nature,
                  hp,
                  attack,
                  defense,
                  spAtk,
                  spDef,
                  speed,
                  usage: spreadUsage,
                }) => (
                  <>
                    <li className="stat-list-element">
                      <span className="stat">
                        {`EVs: ${getSpreadString({
                          hp,
                          attack,
                          defense,
                          spAtk,
                          spDef,
                          speed,
                        })}`}
                      </span>
                    </li>
                    <li className="stat-list-element">
                      <span className="stat">{`${nature} Nature`}</span>
                      <span className="stat">
                        {getPercent(spreadUsage, rawCount)}
                      </span>
                    </li>
                  </>
                ),
              )}
            </ul>
          </div>
          <div className="stat-container">
            <h3 className="stat-title">Most used moves</h3>
            <ul className="stat-list">
              {moves.map(({ move, usage: moveUsage }) => (
                <li className="stat-list-element">
                  <span className="stat">{`${move}`}</span>
                  <span className="stat">
                    {getPercent(moveUsage, rawCount)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {page === 1 && (
        <div className="stat-container">
          <ul className="stat-grid">
            {teammates.map(({ teammate }) => (
              <li className="stat-grid-cel" title={teammate}>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => getSmogonLink(teammate)}
                >
                  <img
                    className="pokemon-icon"
                    src={getSmogonSprite(teammate, false)}
                    alt={`${teammate} Icon`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {page === 2 && (
        <div className="stat-container">
          <ul className="stat-grid">
            {checksAndCounters.map(({ checkOrCounter }) => (
              <li className="stat-grid-cel" title={checkOrCounter}>
                <button
                  className="icon-button"
                  type="button"
                  onClick={() => getSmogonLink(checkOrCounter)}
                >
                  <img
                    className="pokemon-icon"
                    src={getSmogonSprite(checkOrCounter, false)}
                    alt={`${checkOrCounter} Icon`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Pokémon.propTypes = {
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      ability: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  checksAndCounters: PropTypes.arrayOf(
    PropTypes.shape({
      matchup: PropTypes.number.isRequired,
      switchOrKo: PropTypes.number.isRequired,
      deviation: PropTypes.number.isRequired,
      discriminator: PropTypes.number.isRequired,
    }),
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  moves: PropTypes.arrayOf(
    PropTypes.shape({
      move: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  rawCount: PropTypes.number.isRequired,
  spreads: PropTypes.arrayOf(
    PropTypes.shape({
      attack: PropTypes.number.isRequired,
      defense: PropTypes.number.isRequired,
      hp: PropTypes.number.isRequired,
      nature: PropTypes.string.isRequired,
      spAtk: PropTypes.number.isRequired,
      spDef: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
      spreadString: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  teammates: PropTypes.arrayOf(
    PropTypes.shape({
      teammate: PropTypes.string.isRequired,
      usage: PropTypes.number.isRequired,
    }),
  ).isRequired,
  usage: PropTypes.number.isRequired,
};

export default Pokémon;
