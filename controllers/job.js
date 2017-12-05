const Job = require('../models/job');

class JobController {
  constructor(jobService) {
    this.jobService = jobService;
  }

  index() {
    return (req, res) => {
      res.json(this.jobService.index().map(job => new Job(job.id, job.progress, job.total)));
    };
  }

  show() {
    return (req, res) => {
      const { id } = req.params;
      const job = this.jobService.show(id);

      res.json(new Job(job.id, job.progress, job.total));
    };
  }

  register() {
    return (req, res) => {
      res.json({ id: this.jobService.register(req.body.total) });
    };
  }

  update() {
    return (req, res) => {
      const { id } = req.params;
      const { amount } = req.body;

      res.json({ progress: this.jobService.update(id, amount) });
    };
  }

  increment() {
    return (req, res) => {
      const { id } = req.params;
      const { amount } = req.body;

      res.json({ progress: this.jobService.increment(id, amount) });
    };
  }
}

module.exports = JobController;
