const { JobNotFound, InvalidProgress } = require('../models/errors');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL = 500;

class ErrorHandler {
  constructor() {
    return (err, req, res, next) => { // eslint-disable-line no-unused-vars

      if (err instanceof JobNotFound) {
        res.status(NOT_FOUND);
      } else if (err instanceof InvalidProgress) {
        res.status(BAD_REQUEST);
      } else {
        res.status(INTERNAL);
      }

      res.json({ error: err.message });
    };
  }
}

module.exports = ErrorHandler;
