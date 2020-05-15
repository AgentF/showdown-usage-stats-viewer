import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Pokémon.css';

const getPokemonSprite = (name, gen5Sprite = false) => {
  const shinny = Math.floor(Math.random() * 512) === 0 ? '-shiny' : '';
  let formattedName = name
    .toLowerCase()
    .split("'")
    .join('')
    .split('.')
    .join('')
    .split(':')
    .join('')
    .split(' ')
    .join('');
  if (
    formattedName.includes('kommo') ||
    formattedName.includes('hakamo') ||
    formattedName.includes('jangmo')
  ) {
    formattedName = formattedName.split('-').join('');
  }
  if (gen5Sprite) {
    formattedName = `https://play.pokemonshowdown.com/sprites/gen5${shinny}/${formattedName}.png`;
  } else {
    formattedName = `https://play.pokemonshowdown.com/sprites/ani${shinny}/${formattedName}.gif`;
  }
  return formattedName;
};

const openInSmogon = (name) => {
  window.open(
    `https://www.smogon.com/dex/ss/pokemon/${name.toLowerCase()}/`,
    '_blank',
  );
};

function Pokémon({
  abilities,
  checksAndCounters,
  items,
  moves,
  name,
  number,
  rawCount,
  spreads,
  teammates,
  usage,
}) {
  const [imageFallback, setImageFallBack] = useState(false);
  const [page, setPage] = useState(0);

  const readableUsage = `${usage * 100}`.substring(0, 4);
  return (
    <li className="pokemon">
      <h2 className="pokemon-title">{name}</h2>
      <strong className="number">
        {usage > 0.03406367107 ? number : '--'}
      </strong>
      <strong className="usage">{`${readableUsage}%`}</strong>
      <button
        className="image-button"
        type="button"
        onClick={() => openInSmogon(name)}
      >
        <img
          className="pokemon-sprite"
          src={getPokemonSprite(name, imageFallback)}
          title={name}
          alt={`${name} Sprite`}
          onError={() => {
            setImageFallBack(true);
          }}
        />
      </button>
      <div className="tab-wrapper">
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(0)}
          disabled={page === 0}
        >
          Pokémon
        </button>
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          Teammates
        </button>
        <button
          className="info-tab"
          type="button"
          onClick={() => setPage(2)}
          disabled={page === 2}
        >
          Checks and Counters
        </button>
      </div>
      {page === 0 && (
        <>
          <div className="stat-container" id="abilities">
            <h3 className="stat-title">Abilities:</h3>
            <ul className="stat-list">
              {abilities.map(({ ability, usage: abilityUsage }) => {
                const usePercentage = (abilityUsage * 100) / rawCount;
                return (
                  <li className="stat-list-element">
                    <span className="stat">{`${ability}:`}</span>
                    <span className="stat">
                      {`${usePercentage}`.substring(0, 4)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="stat-container">
            <h3 className="stat-title">Most used items:</h3>
            <ul className="stat-list">
              {items.map(({ item, usage: itemUsage }) => {
                const usePercentage = (itemUsage * 100) / rawCount;
                return (
                  <li className="stat-list-element">
                    <span className="stat">{`${item}:`}</span>
                    <span className="stat">
                      {`${usePercentage}`.substring(0, 4)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="stat-container" id="spread">
            <h3 className="stat-title">Spreads:</h3>
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
                }) => {
                  const usePercentage = (spreadUsage * 100) / rawCount;
                  return (
                    <li className="stat-list-element">
                      <span className="stat">{`${nature}:`}</span>
                      <span className="stat">
                        {hp}/{attack}/{defense}/{spAtk}/{spDef}/{speed}
                      </span>
                      <span className="stat">
                        {`${usePercentage}`.substring(0, 4)}%
                      </span>
                    </li>
                  );
                },
              )}
            </ul>
          </div>
          <div className="stat-container">
            <h3 className="stat-title">Most used moves:</h3>
            <ul className="stat-list">
              {moves.map(({ move, usage: moveUsage }) => {
                const usePercentage = (moveUsage * 100) / rawCount;
                const displayMove = move ? move : 'Empty';
                return (
                  <li className="stat-list-element">
                    <span className="stat">{`${displayMove}:`}</span>
                    <span className="stat">
                      {`${usePercentage}`.substring(0, 4)}%
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
      {page === 1 && (
        <div className="stat-container">
          <ul className="stat-grid">
            {teammates.map(({ teammate, usage: teammateUsage }) => {
              const usePercentage = `${
                (teammateUsage * 100) / rawCount
              }`.substring(0, 4);
              return (
                <li className="stat-grid-cel" title={teammate}>
                  <button
                    className="image-button"
                    type="button"
                    onClick={() => openInSmogon(teammate)}
                  >
                    <img
                      className="pokemon-icon"
                      src={getPokemonSprite(teammate, true)}
                      alt={`${teammate} Icon`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {page === 2 && (
        <div className="stat-container">
          <ul className="stat-grid">
            {checksAndCounters.map(({ checkOrCounter }) => (
              <li className="stat-grid-cel" title={checkOrCounter}>
                <button
                  className="image-button"
                  type="button"
                  onClick={() => openInSmogon(checkOrCounter)}
                >
                  <img
                    className="pokemon-icon"
                    src={getPokemonSprite(checkOrCounter, true)}
                    alt={`${checkOrCounter} Icon`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
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
  number: PropTypes.number.isRequired,
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
