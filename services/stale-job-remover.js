class StaleJobRemoverService {
  constructor(jobService, checkInterval, removeStaleAge) {
    this.jobService = jobService;
    this.checkInterval = checkInterval;
    this.removeStaleAge = removeStaleAge;
  }

  isStaleJob(now, job) {
    const updatedAt = job.get('updatedAt');

    return (now - updatedAt) >= this.removeStaleAge;
  }

  findAndRemoveStaleJobs() {
    const now = Date.now();
    const staleJobs = this.jobService.jobs.filter((job) => this.isStaleJob(now, job));

    staleJobs.keySeq().forEach((id) => this.jobService.remove(id));
  }

  start() {
    setInterval(this.findAndRemoveStaleJobs.bind(this), this.checkInterval);
  }
}

module.exports = StaleJobRemoverService;
