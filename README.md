# Pokémon stats!

This is a stats viewer for the Pokémon Showdown usage stats, the data, icons, sprites and images of Pokémons are from Smogon.

My goal is to make competitive Pokémon data and info more accesible because there's a vast cuantity of data and info, yet it's really complicated get into competitive and once there it isn't very easy to get into the top ladder or staying there, and yes I know the raking sistem's goal is to filter out trolls and match you with and equally "good" player so in a perfect world every one goes 50%-50% all matches.

I used the data provided by Smogon in json format from [here](https://www.smogon.com/stats/2020-04/chaos/ "json files"), currently working with [gen8ou-1695.json](https://www.smogon.com/stats/2020-04/chaos/gen8ou-1695.json "Gen 8 OU 1695 cut") it's formatted as:
```javascrpit

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

```
To make it more easy to work with React I formatted it like so:

```javascrpit

const dataExample = {
  info: {
    metagame: string,
    cutoff: number,
    'cutoff deviation': 0,
    'team type': ID || null,
    'number of battles': number,
  },
  data: [
    pokemon: {
      'Raw count': 'number',
      usage: 'number',
      //'Viability Ceiling': {GXE: 'number', GXEmax: 'number', GXE1: 'number', GXE20: 'number'}, 
      Abilities: [ {ability: 'string', usage: 'number'} ],
      Items: [ item: strin, usage: number ],
      Spreads: [ {spread: 'string', usage: 'number'} ],
      Happiness: [ {happiness: 'string', usage: 'number'} ],
      Moves: [ {move: 'string', usage: 'number'} ],
      Teammates: [ {pokemon: 'string', usage: 'number'} ],
      'Checks and Counters': '[ {pokemon: 'string', n: 'number', p: 'number', d: 'number'} ]',
      // n = sum(POKE1_KOED...DOUBLE_SWITCH)
      // p = POKE1_KOED + POKE1_SWITCHED_OUT / n
      // d = sqrt((p * (1 - p)) / n)
    },
  ],
};

```
