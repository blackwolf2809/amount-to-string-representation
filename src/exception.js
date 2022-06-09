class Exception extends Error {
  constructor({ message, code = 'ERROR' }) {
    super();
    this.code = code;
    this.message = message;
  }
}

module.exports = Exception;
