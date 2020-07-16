import React, { useState } from 'react';
import Pokémon from './Pokémon';
import PokémonOverview from './PokémonOverview';
import data from '../../data/testData.json';
import './PokémonList.css';

function PokémonList() {
  const [selectedPokémon, setSelectedPokémon] = useState(1);
  const { metagame } = data.info;
  const tier = metagame.substring(4).toUpperCase();
  const gen = metagame.substring(3, 4);
  const pokémon = data.pokemons[selectedPokémon - 1];
  const top10 = data.pokemons.slice(0, 10);
  const top100 = data.pokemons.slice(10, 100);

  return (
    <div className="tier-list">
      <div className="title-container">
        <h2>{`${tier} Gen ${gen}`}</h2>
      </div>
      <Pokémon
        position={pokémon.position}
        abilities={pokémon.abilities}
        checksAndCounters={pokémon.checksAndCounters.slice(0, 48)}
        items={pokémon.items.slice(0, 4)}
        moves={pokémon.moves.slice(0, 5)}
        name={pokémon.name}
        rawCount={pokémon.rawCount}
        spreads={pokémon.spreads.slice(0, 3)}
        teammates={pokémon.teammates.slice(0, 48)}
        usage={pokémon.usage}
      />
      <ul className="top-10-pokemon">
        {top10.map(
          ({
            position,
            abilities,
            checksAndCounters,
            items,
            moves,
            name,
            rawCount,
            spreads,
            teammates,
            usage,
          }) => (
            <PokémonOverview
              key={position}
              position={position}
              abilities={abilities}
              checksAndCounters={checksAndCounters.slice(0, 48)}
              items={items.slice(0, 4)}
              moves={moves.slice(0, 5)}
              name={name}
              rawCount={rawCount}
              spreads={spreads.slice(0, 3)}
              teammates={teammates.slice(0, 48)}
              usage={usage}
              sprite
              onClickHandler={() => setSelectedPokémon(position)}
            />
          ),
        )}
      </ul>
      <ul className="top-100-pokemon">
        {top100.map(
          ({
            position,
            abilities,
            checksAndCounters,
            items,
            moves,
            name,
            rawCount,
            spreads,
            teammates,
            usage,
          }) => (
            <PokémonOverview
              key={position}
              position={position}
              abilities={abilities}
              checksAndCounters={checksAndCounters.slice(0, 18)}
              items={items.slice(0, 4)}
              moves={moves.slice(0, 5)}
              name={name}
              rawCount={rawCount}
              spreads={spreads.slice(0, 3)}
              teammates={teammates.slice(0, 18)}
              usage={usage}
              sprite={false}
              onClickHandler={() => setSelectedPokémon(position)}
            />
          ),
        )}
      </ul>
    </div>
  );
}
/*

const dataExample = {
  info: {
    metagame: string,
    cutoff: number,
    'cutoff deviation': 0,
    'team type': ID || null,
    'number of battles': number,
  },
  data: {
    pokemon: {
      'Raw count': 'number',
      usage: 'number',
      'Viability Ceiling': '[number, number, number, number]', 
      // num GXE, max GXE, 1% GXE, 20% GXE
      Abilities: '{ [ability: string]: number }',
      Items: '{ [item: string]: number }',
      Spreads: '{ [spread: string]: number }',
      Happiness: '{ [happiness: string]: number }',
      Moves: '{ [move: string]: number }',
      Teammates: '{ [pokemon: string]: number }',
      'Checks and Counters': '{ [pokemon: string]: [n, p, d] }',
      // n = sum(POKE1_KOED...DOUBLE_SWITCH)
      // p = POKE1_KOED + POKE1_SWITCHED_OUT / n
      // d = sqrt((p * (1 - p)) / n)
    },
  },
};
*/

export default PokémonList;
