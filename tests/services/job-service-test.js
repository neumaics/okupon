const JobService = require('../../services/job');
const { JobNotFound } = require('../../models/errors');

describe('job service', () => {
  let jobService;

  beforeEach(() => {
    jobService = new JobService();
  });

  describe('constructor', () => {
    it('should initialize job service with no jobs', () => {
      expect(jobService).not.toBeNull();
      expect(jobService.jobs).not.toBeUndefined();

      expect(Object.values(jobService.index()).length).toBe(0);
    });
  });

  describe('register', () => {
    it('should create a new job and returns its id', () => {
      const newId = jobService.register(100);

      expect(newId.length).toBe(36);
    });
  });

  describe('update', () => {
    it('should update the progress of a given job', () => {
      const newId = jobService.register(100);

      const newProgress = jobService.update(newId, 50);

      expect(newProgress).toBe(50);
    });

    it('should return an error if the job isn\'t found', () => {
      const newId = 'fake-id';

      const update = () => { jobService.update(newId, 50); };

      expect(update).toThrowError(Error);
    });

    it('should throw an error if the new value is not valid', () => {

    });
  });

  describe('increment', () => {
    it('should increment the job\'s progress by a given amount', () => {
      const newId = jobService.register(100);

      const newProgress = jobService.increment(newId, 5);

      expect(newProgress).toBe(5);
    });

    it('should throw an error if the job is not found', () => {
      const newId = 'this-is-a-uuid';
      const increment = () => { jobService.increment(newId, 4); };

      expect(increment).toThrowError(JobNotFound, `Job with id [${newId}] not found in active jobs.`);
    });

    it('should throw an error if the amount is not valid', () => {
      const newId = jobService.register(100);

      const increment = () => { jobService.increment(newId, 'five'); };

      expect(increment).toThrowError(Error);
    });
  });

  describe('index', () => {
    it('should show a list of all active jobs', () => {
      const activeJobs = 4;

      for (let i = 0; i < activeJobs; i++) {
        jobService.register(i);
      }

      expect(Object.keys(jobService.index()).length).toBe(activeJobs);
    });
  });

  describe('show', () => {
    it('should show the details of a single job', () => {
      const newId = jobService.register(100);

      expect(jobService.show(newId)).not.toBeNull();
    });

    it('should throw an error if a job with a particular id is not found', () => {
      const newId = 'not-a-uuid';
      const getJob = () => { jobService.show(newId); };

      expect(getJob).toThrowError(JobNotFound, `Job with id [${newId}] not found in active jobs.`);
    });
  });

  describe('delete', () => {
    it('should delete a job with a given id', () => {
      expect(true).toBe(false);
    });
  });
});
