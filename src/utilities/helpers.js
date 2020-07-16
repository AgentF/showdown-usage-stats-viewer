function getSmogonSprite(name, icon = true) {
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
    formattedName.includes('porygon') ||
    formattedName.includes('kommo') ||
    formattedName.includes('hakamo') ||
    formattedName.includes('jangmo')
  ) {
    formattedName = formattedName.split('-').join('');
  }
  if (formattedName === 'urshifu-rapid-strike') {
    formattedName = 'urshifu';
  }
  if (icon) {
    formattedName = `https://play.pokemonshowdown.com/sprites/ani${shinny}/${formattedName}.gif`;
  } else {
    formattedName = `https://play.pokemonshowdown.com/sprites/gen5${shinny}/${formattedName}.png`;
  }
  return formattedName;
}

function getSmogonLink(name) {
  return `https://www.smogon.com/dex/ss/pokemon/${name.toLowerCase()}/`;
}

function getPercent(number, base) {
  const calc = `${(number * 100) / base}`;
  return `${calc.substring(0, 4)}%`;
}

function getSpreadString({ hp, attack, defense, spAtk, spDef, speed }) {
  const spread = [];
  if (hp > 0) {
    spread.push(`${hp} HP`);
  }
  if (attack > 0) {
    spread.push(`${attack} Atk`);
  }
  if (defense > 0) {
    spread.push(`${defense} Def`);
  }
  if (spAtk > 0) {
    spread.push(`${spAtk} SpA`);
  }
  if (spDef > 0) {
    spread.push(`${spDef} SpD`);
  }
  if (speed > 0) {
    spread.push(`${speed} Spe`);
  }
  return spread.join(' / ');
}

export { getSmogonSprite, getSmogonLink, getPercent, getSpreadString };
