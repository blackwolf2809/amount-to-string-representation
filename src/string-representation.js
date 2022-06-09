const {
  DESCRIPTION,
  POWER_OF_10,
  CURRENCY,
  INVALID_CURRENCY,
  INVALID_AMOUNT,
  NUMBER_OUT_OF_RANGE
} = require('./constants');
const Exception = require('./exception');

module.exports = class {
  static amountToStringRepresentation(amount = '$0') {
    const monetaryUnit = amount.slice(0, 1);
    const currency = CURRENCY[monetaryUnit];
    if (!currency) throw (new Exception({ message: INVALID_CURRENCY }));
    const stringNumber = amount.slice(1);
    const splittedStringNumber = stringNumber.split('.');
    if (splittedStringNumber.length > 2) throw (new Exception({ message: INVALID_AMOUNT }));
    const [integerNumber, decimalNumber] = splittedStringNumber;
    const number = parseInt(integerNumber, 10);
    const integerPart = this.numberToStringRepresentation(number);
    const decimalPart = this.decimalToStringRepresentation(decimalNumber);
    return `${integerPart} ${decimalPart} ${currency}`;
  }

  static numberToStringRepresentation(num) {
    let number = num;
    const triogroups = [];
    let index = 0;
    while (number > 1000) {
      const remainder = number % 1000;
      triogroups.unshift(this.getBasicStringRepresentation(remainder) + POWER_OF_10[index]);
      number = (number - remainder) / 1000;
      index += 1;
    }
    triogroups.unshift(this.getBasicStringRepresentation(number) + POWER_OF_10[index]);
    return triogroups.join(' ');
  }

  static getBasicStringRepresentation(num) {
    let number = num;
    if (number < 0 || number > 999) throw (new Exception({ message: NUMBER_OUT_OF_RANGE }));
    const stringRepresentation = DESCRIPTION[number];
    if (stringRepresentation) return stringRepresentation;
    const arrayDescription = [];
    const hundreds = Math.floor(number / 100);
    if (hundreds > 0) {
      arrayDescription.push(`${DESCRIPTION[hundreds]} hundred`);
      number %= 100;
    }

    if (number > 0) {
      if (DESCRIPTION[number]) {
        arrayDescription.push(`${DESCRIPTION[number]}`);
      } else {
        const tents = Math.floor(number / 10);
        const units = number % 10;
        arrayDescription.push(`${DESCRIPTION[tents * 10]}-${DESCRIPTION[units]}`);
      }
    }

    return arrayDescription.join(' ');
  }

  static decimalToStringRepresentation(number = '0') {
    const numberLength = number.length;
    return `and ${number}/${10 ** numberLength}`;
  }
};
