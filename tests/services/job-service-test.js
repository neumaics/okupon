const JobService = require('../../services/job');
const { JobNotFound, InvalidProgress } = require('../../models/errors');

describe('job service', () => {
  let jobService;

  beforeEach(() => {
    jobService = new JobService();
  });

  describe('constructor', () => {
    it('should initialize job service with no jobs', () => {
      expect(jobService).not.toBeNull();
      expect(jobService.jobs).not.toBeUndefined();

      expect(jobService.jobs.count()).toBe(0);
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

    it('should throw an error if the job isn\'t found', () => {
      const newId = 'fake-id';

      const update = () => { jobService.update(newId, 50); };

      expect(update).toThrowError(JobNotFound);
    });

    it('should throw an error if the new value is not valid', () => {
      const newId = jobService.register(100);

      const update = () => { jobService.increment(newId, -10231); };

      expect(update).toThrowError(InvalidProgress);
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

      expect(increment).toThrowError(InvalidProgress);
    });
  });

  describe('index', () => {
    it('should show a list of all active jobs', () => {
      const activeJobs = 4;

      for (let i = 0; i < activeJobs; i++) {
        jobService.register(i);
      }

      expect(jobService.jobs.count()).toBe(activeJobs);
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

      expect(getJob).toThrowError(JobNotFound);
    });
  });

  describe('remove', () => {
    it('should delete a job with a given id', () => {
      const newId = jobService.register(100);

      expect(jobService.jobs.count()).toBe(1);
      jobService.remove(newId);
      expect(jobService.jobs.count()).toBe(0);
    });

    it('should return the id of the removed id', () => {
      const newId = jobService.register(100);
      const removedId = jobService.remove(newId);

      expect(removedId).toBe(newId);
    });

    it('should throw an error if a job with the given id is not found', () => {
      const newId = 'cant-delete-this';
      const deleteJob = () => { jobService.remove(newId); };

      expect(deleteJob).toThrowError(JobNotFound);
    });
  });

  describe('isValidProgress', () => {
    it('should return false if progress is null or undefined', () => {
      expect(jobService.isValidProgress()).toBe(false);
      expect(jobService.isValidProgress(undefined)).toBe(false);
      expect(jobService.isValidProgress(null)).toBe(false);
    });

    it('should return false if progress is not a number', () => {
      expect(jobService.isValidProgress('fifty five')).toBe(false);
      expect(jobService.isValidProgress(NaN)).toBe(false);
    });

    it('should return false if progress is a negative number', () => {
      expect(jobService.isValidProgress(-40)).toBe(false);
      expect(jobService.isValidProgress(-2.7)).toBe(false);
    });

    it('should return true if progress is a positive number', () => {
      expect(jobService.isValidProgress(4)).toBe(true);
      expect(jobService.isValidProgress(21.4)).toBe(true);
    });
  });
});
