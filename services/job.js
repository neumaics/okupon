const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');
const Job = require('../models/job');
const { JobNotFound } = require('../models/errors');

class JobService {
  constructor() {
    this.jobs = Map();
  }

  register(total) {
    const id = uuidv4();
    const job = new Job(id, total, 0);

    // this.jobs[id] = job;
    this.jobs = this.jobs.set(id, job);

    return id;
  }

  update(id) {
    const job = this.jobs.get(id);

    if (job) {
      console.log('boop');
    } else {
      throw new JobNotFound(id);
    }
  }

  increment(id, amount) {
    const job = this.jobs.get(id);
  }

  index() {
    return this.jobs.toJSON();
  }

  show(id) {
    const job = this.jobs.get(id);

    if (job) {
      return job;
    } else {
      throw new JobNotFound(id);
    }
  }

  remove(id) {
    this.jobs = this.jobs.delete(id);
  }
}

module.exports = JobService;
