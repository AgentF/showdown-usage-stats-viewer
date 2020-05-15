import React from 'react';
import Pokémon from './Pokémon';
import rawData from './data/gen8ou-1695.json';
import './PokémonList.css';

const data = { pokemons: [] };
data.info = rawData.info;

const pokemonNames = Object.keys(rawData.data);
pokemonNames.forEach((pokemonName) => {
  const pokemon = {
    name: pokemonName,
    usage: rawData.data[pokemonName].usage,
    rawCount: rawData.data[pokemonName]['Raw count'],
  };
  pokemon.teammates = [];
  const pokemonTeamMatesNames = Object.keys(
    rawData.data[pokemonName].Teammates,
  );
  pokemonTeamMatesNames.forEach((teammate) => {
    pokemon.teammates.push({
      teammate,
      usage: rawData.data[pokemonName].Teammates[teammate],
    });
  });
  pokemon.teammates.sort(
    ({ usage: usageA }, { usage: usageB }) => usageB - usageA,
  );
  pokemon.checksAndCounters = [];
  const pokemonChecksAndCountersNames = Object.keys(
    rawData.data[pokemonName]['Checks and Counters'],
  );
  pokemonChecksAndCountersNames.forEach((checkOrCounter) => {
    pokemon.checksAndCounters.push({
      checkOrCounter,
      matchup:
        rawData.data[pokemonName]['Checks and Counters'][checkOrCounter][0],
      switchOrKo:
        rawData.data[pokemonName]['Checks and Counters'][checkOrCounter][1],
      deviation:
        rawData.data[pokemonName]['Checks and Counters'][checkOrCounter][2],
      discriminator:
        rawData.data[pokemonName]['Checks and Counters'][checkOrCounter][1] *
          100 -
        rawData.data[pokemonName]['Checks and Counters'][checkOrCounter][2] *
          100,
    });
  });
  pokemon.checksAndCounters.sort(
    ({ discriminator: discriminatorA }, { discriminator: discriminatorB }) =>
      discriminatorB - discriminatorA,
  );
  pokemon.items = [];
  const itemsNames = Object.keys(rawData.data[pokemonName].Items);
  itemsNames.forEach((item) => {
    pokemon.items.push({
      item,
      usage: rawData.data[pokemonName].Items[item],
    });
  });
  pokemon.items.sort(({ usage: usageA }, { usage: usageB }) => usageB - usageA);
  pokemon.spreads = [];
  const spreadStrings = Object.keys(rawData.data[pokemonName].Spreads);
  spreadStrings.forEach((spreadString) => {
    const [nature, evSpread] = spreadString.split(':');
    const [hp, attack, defense, spAtk, spDef, speed] = evSpread.split('/');
    pokemon.spreads.push({
      spreadString,
      nature,
      hp: parseInt(hp, 10),
      attack: parseInt(attack, 10),
      defense: parseInt(defense, 10),
      spAtk: parseInt(spAtk, 10),
      spDef: parseInt(spDef, 10),
      speed: parseInt(speed, 10),
      usage: rawData.data[pokemonName].Spreads[spreadString],
    });
  });
  pokemon.spreads.sort(
    ({ usage: usageA }, { usage: usageB }) => usageB - usageA,
  );
  pokemon.moves = [];
  const movesNames = Object.keys(rawData.data[pokemonName].Moves);
  movesNames.forEach((move) => {
    pokemon.moves.push({
      move,
      usage: rawData.data[pokemonName].Moves[move],
    });
  });
  pokemon.moves.sort(({ usage: usageA }, { usage: usageB }) => usageB - usageA);
  pokemon.abilities = [];
  const abilitiesName = Object.keys(rawData.data[pokemonName].Abilities);
  abilitiesName.forEach((ability) => {
    pokemon.abilities.push({
      ability,
      usage: rawData.data[pokemonName].Abilities[ability],
    });
  });
  pokemon.abilities.sort(
    ({ usage: usageA }, { usage: usageB }) => usageB - usageA,
  );
  data.pokemons.push(pokemon);
});

data.pokemons.sort(({ usage: usageA }, { usage: usageB }) => usageB - usageA);

function PokémonList() {
  const { cutoff, metagame } = data.info;
  const tier = metagame.substring(4).toUpperCase();
  const gen = metagame.substring(3, 4);

  return (
    <>
      <div className="title-container">
        <h1>{`${tier} Gen ${gen}`}</h1>
        <h1>April 2020</h1>
        <h1>{`GXE ${cutoff}`}</h1>
      </div>
      <ul className="pokemons">
        {data.pokemons
          .slice(0, 36)
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
                items={items.slice(0, 5)}
                moves={moves.slice(0, 6)}
                name={name}
                rawCount={rawCount}
                spreads={spreads.slice(0, 6)}
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
      'Raw count': number,
      usage: number,
      'Viability Ceiling': [number, number, number, number], 
      // num GXE, max GXE, 1% GXE, 20% GXE
      Abilities: { [ability: string]: number },
      Items: { [item: string]: number },
      Spreads: { [spread: string]: number },
      Happiness: { [happiness: string]: number },
      Moves: { [move: string]: number },
      Teammates: { [pokemon: string]: number },
      'Checks and Counters': { [pokemon: string]: [n, p, d] },
      // n = sum(POKE1_KOED...DOUBLE_SWITCH)
      // p = POKE1_KOED + POKE1_SWITCHED_OUT / n
      // d = sqrt((p * (1 - p)) / n)
    },
  },
};
*/

export default PokémonList;
