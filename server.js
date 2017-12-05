const express = require('express');
const app = express();

require('dotenv').config();

const JobService = require('./services/job');
const StaleJobRemoverService = require('./services/stale-job-remover');
const JobController = require('./controllers/job');
const ErrorHandler = require('./middleware/error-handler');

const jobService = new JobService();
const jobRemover = new StaleJobRemoverService(jobService, process.env.CHECK_INTERVAL, process.env.STALE_AGE);
const jobController = new JobController(jobService);

app.use(express.json());

app.get('/jobs', jobController.index());
app.get('/jobs/:id', jobController.show());
app.post('/jobs', jobController.register());
app.patch('/jobs/:id', jobController.update());
app.patch('/jobs/:id/increment', jobController.increment());

app.use(new ErrorHandler());

jobRemover.start();

app.listen(process.env.PORT, () => {
  console.info(`listening on port ${process.env.PORT}`);
});
