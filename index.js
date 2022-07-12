const EventEmitter = require('events');

class JobRunner extends EventEmitter {
  constructor({
    job, 
    jobCompletion = console.log,
    jobFailure = console.error,
    timeoutMS = 5 * 60 * 1_000,
    retryMS = 5_000
  }) {
    super();

    const runJob = async () => {
      const jobComplete = await job();
      if (jobComplete) {
        return this.emit('complete', jobComplete);
      }

      timeoutMS -= retryMS;

      if (timeoutMS <= 0) {
        return this.emit('failed', 'cannot complete job');
      }

      setTimeout(runJob, retryMS);
    };

    this.on('start', runJob);
    this.on('complete', jobCompletion);
    this.on('failed', jobFailure);
  }
}

module.exports = { JobRunner };
