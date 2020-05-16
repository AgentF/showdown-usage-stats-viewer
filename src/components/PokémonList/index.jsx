import React from 'react';
import PokémonList from './PokémonList';

/*

const limit = 30;
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
  pokemonTeamMatesNames.forEach((teammate, i) => {
    if (i >= limit) return;
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
  pokemonChecksAndCountersNames.forEach((checkOrCounter, i) => {
    if (i >= limit) return;
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
  itemsNames.forEach((item, i) => {
    if (i >= limit) return;
    pokemon.items.push({
      item,
      usage: rawData.data[pokemonName].Items[item],
    });
  });
  pokemon.items.sort(({ usage: usageA }, { usage: usageB }) => usageB - usageA);
  pokemon.spreads = [];
  const spreadStrings = Object.keys(rawData.data[pokemonName].Spreads);
  spreadStrings.forEach((spreadString, i) => {
    if (i >= limit) return;
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
  movesNames.forEach((move, i) => {
    if (i >= limit) return;
    pokemon.moves.push({
      move,
      usage: rawData.data[pokemonName].Moves[move],
    });
  });
  pokemon.moves.sort(({ usage: usageA }, { usage: usageB }) => usageB - usageA);
  pokemon.abilities = [];
  const abilitiesName = Object.keys(rawData.data[pokemonName].Abilities);
  abilitiesName.forEach((ability, i) => {
    if (i >= limit) return;
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

console.log(JSON.stringify(data));
*/

function index() {
  return <PokémonList />;
}

export default index;
