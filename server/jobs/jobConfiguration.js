const Queue = require("bull");

// const opts = {
//     // redis: {
//     //     host: process.env.REDIS_HOST,
//     //     port: parseInt(process.env.REDIS_PORT ?? 6379),
//     //     db: 8,
//     //     options: {}
//     // }
// }

const bullQueue = new Queue("bullQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379,
  },
});

console.info("bull-job-queue loaded 🍺🍻 from config");

const handleFailure = (job, err) => {
  if (job.attemptsMade >= job.opts.attempts) {
    console.info(`🤯   Job failures above threshold ${job.name}`, err);
    job.remove();
    return null;
  }
  console.info(
    `🤯   Job ${job.name} failed with ${err.message}. ${
      job.opts.attempts - job.attemptsMade
    } attempts left`
  );
};

const handleCompleted = (job) => {
  console.info(`🌿   Job ${job.name} completed`);
  job.remove();
};

const handleStalled = (job) => {
  console.info(`🌿   Job ${job.name} stalled`);
};
bullQueue.on("failed", handleFailure);
bullQueue.on("completed", handleCompleted);
bullQueue.on("stalled", handleStalled);

module.exports = {
  bullQueue,
};
