const { bullQueue } = require("./jobConfiguration");
const { createBullBoard } = require("bull-board");
const { BullAdapter } = require("bull-board/bullAdapter");
const { router } = createBullBoard([new BullAdapter(bullQueue)]);
const createJob = (name, data, options) => {
  const opts = { priority: 0, attempts: 3, delay: 2000 };
  bullQueue.add(name, data, {
    ...options,
    priority: options.priority || opts.priority,
    attempts: options.attempts || opts.attempts,
    delay: options.delay || opts.delay,
    removeOnComplete: false,
    removeOnFail: false,
  });
};

//createJob("demoJob",{name:"knovator"},{}); use this fn where you want to create new job

module.exports = { createJob, queuesRouter: router };
