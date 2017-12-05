const uuidv4 = require('uuid/v4');
const { Map } = require('immutable');
const { JobNotFound, InvalidProgress } = require('../models/errors');

class JobService {
  constructor() {
    this.jobs = Map();
  }

  isValidProgress(progress) {
    return !!progress &&
      typeof progress === 'number' &&
      !isNaN(progress) &&
      progress >= 0;
  }

  register(total) {
    const id = uuidv4();
    const createdAt = Date.now();
    const job = Map({
      id,
      total,
      progress: 0,
      createdAt,
      updatedAt: createdAt
    });

    this.jobs = this.jobs.set(id, job);

    return id;
  }

  update(id, amount) {
    if (!this.isValidProgress(amount)) {
      throw new InvalidProgress(amount);
    }

    if (this.jobs.has(id)) {
      const job = this.jobs.get(id);

      const updated = job.withMutations((j) => {
        j.set('progress', amount).set('updatedAt', Date.now());
      });

      this.jobs.set(id, updated);

      return amount;
    } else {
      throw new JobNotFound(id);
    }
  }

  increment(id, amount) {
    if (!this.isValidProgress(amount)) {
      throw new InvalidProgress(amount);
    }

    if (this.jobs.has(id)) {
      const job = this.jobs.get(id);
      const currentProgress = job.get('progress');
      const newProgress = currentProgress + amount;

      const updated = job.withMutations((j) => {
        j.set('progress', newProgress).set('updatedAt', Date.now());
      });

      this.jobs.set(id, updated);

      return newProgress;
    } else {
      throw new JobNotFound(id);
    }
  }

  index() {
    return this.jobs.toJS();
  }

  show(id) {
    if (this.jobs.has(id)) {
      return this.jobs.get(id);
    } else {
      throw new JobNotFound(id);
    }
  }

  remove(id) {
    if (this.jobs.has(id)) {
      this.jobs = this.jobs.delete(id);

      return id;
    } else {
      throw new JobNotFound(id);
    }
  }
}

module.exports = JobService;
