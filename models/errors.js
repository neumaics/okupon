class JobNotFound extends Error {
  constructor(id) {
    super(`Job with id [${id}] not found in active jobs.`);
    this.name = 'JobNotFound';
  }
}

class InvalidProgress extends Error {
  constructor(amount) {
    super(`Invalid value given for amount [${amount}]`);
    this.name = 'JobNotFound';
  }
}

module.exports = {
  JobNotFound,
  InvalidProgress
};
