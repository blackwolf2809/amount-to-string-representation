const stringRepresentation = require('./string-representation');
const { GENERIC_ERROR } = require('./constants');

module.exports.getStringRepresentation = (amount) => {
  let message = '';
  try {
    message = stringRepresentation.amountToStringRepresentation(amount);
  } catch (error) {
    message = (!error.message) ? GENERIC_ERROR : error.message;
  }
  return message;
};

console.info('message: ', this.getStringRepresentation('$2523.04'));
