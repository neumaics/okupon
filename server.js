const express = require('express');
const app = express();

require('dotenv').config();

const JobService = require('./services/job');
const StaleJobRemoverService = require('./services/stale-job-remover');

const jobService = new JobService();
const jobRemover = new StaleJobRemoverService(jobService, 1000, 10000);

jobRemover.start();

setTimeout(() => {
  console.log(jobService.register(100));
}, 5000);


app.listen(process.env.PORT, () => {
  console.log(`listenining on ${process.env.PORT}`);
});
