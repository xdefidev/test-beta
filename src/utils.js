export const hexToNumber = (num) => {
  const val = Number(num);
  return val;
};

export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};
