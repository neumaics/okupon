class JobNotFound extends Error {
  constructor(id) {
    super(`Job with id [${id}] not found in active jobs.`);
  }
}

class InvalidProgress extends Error {
  constructor(amount) {
    super(`Invalid value given for amount [${amount}].`);
  }
}

module.exports = {
  JobNotFound,
  InvalidProgress
};
