const User = require("../model/v1/user");

// Operation types
const QUOTA_OPERATION = {
    DEDUCT: 'deduct',
    ADD: 'add'
};

// Function to update the used quota for a service
const updateServiceQuotas = async (userId, serviceUpdates) => {
    // console.log(`Starting updateServiceQuotas for userId: ${userId}`);
    try {
        // Fetch the user
        // console.log('Fetching user...');
        const user = await User.findById(userId);
        // console.log('User fetched:', user?.plan?.services);
        // console.log('User fetched');

        // Check if user and user's plan exist
        if (!user || !user.plan || !user.plan.services) {
            throw new Error('User or user plan not found');
        }

        for (const update of serviceUpdates) {
            const { serviceId, amount, operation } = update;
            // console.log(`Processing update for serviceId: ${serviceId}, amount: ${amount}, operation: ${operation}`);

            // Find the service index using serviceId
            const serviceIndex = user.plan.services.findIndex(
                service => service._id.equals(serviceId)
            );

            if (serviceIndex === -1) {
                // console.warn(`Service with ID ${serviceId} not found in user plan. Skipping this update.`);
                continue; // Skip this iteration and continue with the next one
            }

            const service = user.plan.services[serviceIndex];
            // console.log(`Service found at index ${serviceIndex}:`, service);

            // Perform the operation
            switch (operation) {
                case QUOTA_OPERATION.DEDUCT:
                    if (service.quota - service.usedQuota < amount) {
                        throw new Error(`Not enough quota available for service ID ${serviceId}`);
                    }
                    user.plan.services[serviceIndex].usedQuota = Math.max(0, user.plan.services[serviceIndex].usedQuota - amount);
                    // console.log(`Deducted quota. New usedQuota: ${user.plan.services[serviceIndex].usedQuota}`);
                    break;
                case QUOTA_OPERATION.ADD:
                    user.plan.services[serviceIndex].usedQuota = Math.min(service.quota, user.plan.services[serviceIndex].usedQuota + amount);
                    // console.log(`Added quota. New usedQuota: ${user.plan.services[serviceIndex].usedQuota}`);
                    break;
                default:
                    throw new Error(`Invalid quota operation for service ID ${serviceId}`);
            }
        }

        // Save the updated user document
        // console.log('Saving updated user document...');
        await user.save();
        // console.log('Quotas successfully updated for the services.');
    } catch (error) {
        console.error('Error updating service quotas:', error);
        // Handle error appropriately
    }
};

module.exports = {
    updateServiceQuotas,
    QUOTA_OPERATION,
};
