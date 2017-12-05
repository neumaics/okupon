const JobService = require('../../services/job');
const JobNotFound = require('../../models/job-not-found');

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

    });

    it('should return an error if the job isn\'t found', () => {

    });
  });

  describe('increment', () => {
    it('should increment the job\'s progress by a given amount', () => {

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

    it('should return an error if a job with a particular id is not found', () => {
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
