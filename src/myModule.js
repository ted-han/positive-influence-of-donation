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

const getLastMonth = inputD => {
  // inputDate 값이 없으면 지난 달 1일 return
  if (!inputD) {
    let d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    return {
      to: d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
    };
  }

  // inputDate 값이 있으면 해당 날짜보다 2개월 전 검색범위 return
  // ex) inputD: 20200101 => from:20191231, to:20191101
  let fromD = new Date(
    inputD.toString().substr(0, 4),
    parseInt(inputD.toString().substr(4, 2)) - 1,
    inputD.toString().substr(6, 2)
  );
  let toD = new Date(fromD);
  fromD.setDate(0);
  toD.setMonth(toD.getMonth() - 2);
  return {
    from:
      fromD.getFullYear() * 10000 +
      (fromD.getMonth() + 1) * 100 +
      fromD.getDate(),
    to: toD.getFullYear() * 10000 + (toD.getMonth() + 1) * 100 + toD.getDate()
  };
};

export { numberToText, getLastMonth };
