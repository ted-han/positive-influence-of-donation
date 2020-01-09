const numberToText = amount => {
  if (amount === 0) return '';
  let won = '';
  if (amount >= 100000000) {
    won = `${Math.floor(amount / 100000000)}억`;
    amount = amount - Math.floor(amount / 100000000) * 100000000;
  }
  if (amount === 0) return won + '원';
  won = won
    ? `${won} ${Math.floor(amount / 10000)}만`
    : `${Math.floor(amount / 10000)}만`;
  won = won + '원';
  return won;
};

export { numberToText };
