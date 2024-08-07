const EventEmitter = require("events");
EventEmitter.defaultMaxListeners = 50;
const { bullQueue } = require("./jobConfiguration");
const Jobs = require("../services/jobs/jobs");
for (let identity in Jobs._processors) {
  bullQueue.process(identity, 1, Jobs._processors[identity]);
}
