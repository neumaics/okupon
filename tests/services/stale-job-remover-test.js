const StaleJobRemoverService = require('../../services/stale-job-remover');
const JobService = require('../../services/job');

describe('stale job remover service', () => {
  let jobService;
  let removerService;
  const baseDate = new Date(2017, 12, 4);

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(baseDate);
    jobService = new JobService();
    removerService = new StaleJobRemoverService(jobService, 100, 1000);
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe('constructor', () => {
    it('should create a removerService', () => {
      expect(removerService).not.toBeNull();
    });
  });

  describe('isStaleJob', () => {
    it('should return false for jobs that have been updated recently', () => {
      const jobId = jobService.register(100);

      jasmine.clock().tick(500);

      jobService.update(jobId, 70);
      const job = jobService.jobs.get(jobId);

      expect(removerService.isStaleJob(Date.now(), job)).toBe(false);
    });

    it('should return true for jobs that have not been updated recently', () => {
      const jobId = jobService.register(100);

      jasmine.clock().tick(5000);
      const job = jobService.jobs.get(jobId);

      expect(removerService.isStaleJob(Date.now(), job)).toBe(true);
    });
  });

  describe('findAndRemoveStaleJobs', () => {
    it('should remove jobs that are deemed stale', () => {
      jobService.register(100);
      expect(jobService.jobs.count()).toBe(1);

      jasmine.clock().tick(5000);
      removerService.findAndRemoveStaleJobs();

      expect(jobService.jobs.count()).toBe(0);
    });
  });
});
