const { getStringRepresentation } = require('../src/index');
const { INVALID_CURRENCY } = require('../src/constants');

test('Get string representation - successful', () => {
  const message = getStringRepresentation('$7.33');
  expect(message).toEqual('seven and 33/100 dollars');
});

test('Get string representation - ERROR: invalid currency', () => {
  const message = getStringRepresentation('&1.01');
  expect(message).toEqual(INVALID_CURRENCY);
});