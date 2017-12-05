class JobNotFound extends Error {
  constructor(id) {
    super(`Job with id [${id}] not found in active jobs.`);
    this.name = 'JobNotFound';
  }
}

module.exports = {
  JobNotFound
};
