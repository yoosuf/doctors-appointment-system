function timeDifference(future, present) {
  let diffInMilliSeconds = Math.abs(future - present) / 1000;
  const days = Math.floor(diffInMilliSeconds / 86400);

  diffInMilliSeconds -= days * 86400;
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;

  diffInMilliSeconds -= hours * 3600;
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

  diffInMilliSeconds -= minutes * 60;

  let difference = "";
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;
  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  return {
    day: days,
    hour: hours,
    minute: minutes,
  };
}

module.exports = {
  timeDifference,
};
