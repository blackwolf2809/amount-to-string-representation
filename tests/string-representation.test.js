const stringRepresentation = require('../src/string-representation');

test('Amount to string representation - successful', () => {
  const message = stringRepresentation.amountToStringRepresentation('$1.01');
  expect(message).toEqual('one and 01/100 dollars');
});

test('Number to string representation - successful', () => {
  const message = stringRepresentation.numberToStringRepresentation(9999);
  expect(message).toEqual('nine thousand nine hundred ninety-nine');
});

test('Get basic string representation - successful', () => {
  const message = stringRepresentation.getBasicStringRepresentation(87);
  expect(message).toEqual('eighty-seven');
});

test('Decimal to string representation - successful', () => {
  const message = stringRepresentation.decimalToStringRepresentation('25');
  expect(message).toEqual('and 25/100');
});