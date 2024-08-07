const calculateWaitTimeForService = (appointment, serviceId) => {


  const service = appointment.services.find((s) => s._id === serviceId);


  if (!service) {
    throw new Error(`Service with ID ${serviceId} not found.`);
  }

  const endTime = service.endedAt
    ? new Date(service.endedAt)
    : new Date(appointment.date);


  const servedTime = new Date();


  // Calculate the time difference in milliseconds and convert to seconds
  const timeDifference = Math.abs(servedTime.getTime() - endTime.getTime());


  const differenceInSeconds = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds



  return differenceInSeconds;
};

module.exports = {
  calculateWaitTimeForService,
};
