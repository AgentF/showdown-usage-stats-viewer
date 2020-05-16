import React from 'react';
import Pokémon from './Pokémon';
import data from '../../data/testData.json';
import './PokémonList.css';

function PokémonList() {
  const { cutoff, metagame } = data.info;
  const tier = metagame.substring(4).toUpperCase();
  const gen = metagame.substring(3, 4);

  return (
    <>
      <div className="title-container">
        <h2>{`${tier} Gen ${gen}`}</h2>
        <h2>April 2020</h2>
        <h2>{`GXE ${cutoff}`}</h2>
      </div>
      <ul className="pokemons">
        {data.pokemons
          .slice(0, 40)
          .map(
            (
              {
                abilities,
                checksAndCounters,
                items,
                moves,
                name,
                rawCount,
                spreads,
                teammates,
                usage,
              },
              i,
            ) => (
              <Pokémon
                number={i + 1}
                abilities={abilities}
                checksAndCounters={checksAndCounters.slice(0, 18)}
                items={items.slice(0, 3)}
                moves={moves.slice(0, 4)}
                name={name}
                rawCount={rawCount}
                spreads={spreads.slice(0, 3)}
                teammates={teammates.slice(0, 18)}
                usage={usage}
              />
            ),
          )}
      </ul>
    </>
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
