const mongoose = require("mongoose");
const utils = require("./../utils/messages");
const Appointment = require("./../model/v1/appointment");

// Define the preventDuplicateBooking middleware function
const preventDuplicateBooking = async (req, res, next) => {
  try {
    console.log("Existing Appointments Check", req.body);

    // Debug: Log the patientId received in the request
    console.log("Received patientId:", req.body.userId);

    // Convert patientId from the request to ObjectId
    // const patientObjectId = mongoose.Types.ObjectId(req.body.patientId);

    const patientObjectId = req.body.userId || req.body.patientId;

    console.log("Converted patientObjectId:", patientObjectId);

    // Fetch existing appointments
    let existingAppointments = await Appointment.find({
      userId: patientObjectId,
      // Uncomment the following line if you need to filter by status as well
      status: { $in: ["confirmed", "in-progress"] },
    });

    // Debug: Log the raw response from the database
    console.log("Raw database response:", existingAppointments);

    // Ensure that existingAppointments is an array
    existingAppointments = Array.isArray(existingAppointments)
      ? existingAppointments
      : [];

    // Check if there are any matched appointments
    if (existingAppointments.length > 0) {
      const conflictingAppointments = existingAppointments.map((appointment) => {
        return {
          appointmentId: appointment._id,
          status: appointment.status,
        };
      });

      const uniqueStatuses = new Set(existingAppointments.map(appointment => appointment.status));
      const statusMessage = Array.from(uniqueStatuses).join(', ');

      return utils.failureResponse(
        {
          message: `Already an appointment is on queue.`,
          conflictingAppointments,
        },
        res
      );
    }

    console.log(
      "###################### Existing Appointments count",
      existingAppointments.length
    );

    // Use the categoryIds from the request body
    const categoryIds = req.body.categoryIds;
    console.log("###################### servicesArr", categoryIds);

    // Filter the appointments to find matches based on service status
    const matchedAppointments = existingAppointments.filter((appointment) => {
      const isPatientMatch = appointment.userId.equals(patientObjectId);
      const hasMatchingService = appointment.services.some((service) => {
        const isCategoryMatch = categoryIds.includes(
          service.categoryId.toString()
        );
        const isStatusMatch = ["proposed", "pending", "confirmed", "in-progress","rescheduled"].includes(
          service.status
        );

        // Detailed debug log for each service
        console.log(
          `Service ID: ${service._id}, Category Match: ${isCategoryMatch}, Status Match: ${isStatusMatch}`
        );

        return isCategoryMatch && isStatusMatch;
      });

      console.log(
        `Appointment ID: ${appointment._id}, Patient Match: ${isPatientMatch}, Service Match: ${hasMatchingService}`
      );

      return isPatientMatch && hasMatchingService;
    });

    console.log("Matched Appointments:", matchedAppointments.length);

    // Check if there are any matched appointments
    if (matchedAppointments.length > 0) {
      const conflictingAppointments = matchedAppointments.map((appointment) => {
        return {
          appointmentId: appointment._id,
          status: appointment.status,
          // Add any other relevant information about the conflicting appointment
        };
      });

      return utils.failureResponse(
        {
          message: "Already an appointment is in the queue.",
          conflictingAppointments,
        },
        res
      );
    }

    // Proceed to the next middleware if no duplicates are found
    next();
  } catch (error) {
    // Handle any errors that occur during execution
    console.error("Error in preventDuplicateBooking:", error);
    res.status(500).send("Server error");
  }
};

// Export the middleware function
module.exports = preventDuplicateBooking;
