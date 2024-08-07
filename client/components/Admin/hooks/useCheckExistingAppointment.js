import React, { useState, useEffect, useCallback } from 'react';
import socket from '@/utils/socket'; // Import the socket instance

const useCheckExistingAppointment = ({ patientId, servicesArr }) => {
    const [loading, setLoading] = useState(false);
    const [existingAppointments, setExistingAppointments] = useState([]);
    const [existingCategoryIds, setExistingCategoryIds] = useState([]);


    useEffect(() => {
        console.log('useCheckExistingAppointment: useEffect triggered');

        try {
            console.log('###################### patientId #######################', patientId);
            console.log('###################### servicesArr #######################', servicesArr);

            const handleNewAppointments = (data) => {

                const matchedAppointments = data.filter(appointment =>
                    appointment.patientId._id === patientId && (
                        (Array.isArray(appointment.services) && appointment.services.some(service =>
                            servicesArr.includes(service.categoryId) &&
                            ['PENDING', 'WAITING', 'IN_SERVE'].includes(service.status)
                        ))
                    )
                );
                console.log('handleNewAppointments: matched appointments', matchedAppointments);

                // Extract and store used category IDs
                const categoryIds = matchedAppointments.reduce((acc, appointment) => {
                    appointment.services.forEach(service => {
                        if (servicesArr.includes(service.categoryId) &&
                            ['PENDING', 'WAITING', 'IN_SERVE'].includes(service.status)) {
                            acc.add(service.categoryId);
                        }
                    });
                    return acc;
                }, new Set());

                console.log(`setExistingCategoryIds`, Array.from(categoryIds))
                setExistingCategoryIds(Array.from(categoryIds));
                setExistingAppointments(matchedAppointments);
                setLoading(false);
            };

            console.log('useCheckExistingAppointment: setting up socket listeners');
            socket.on('appointments', handleNewAppointments);
            socket.on('connect_error', (err) => console.log(`Connection Error: ${err.message}`));
            socket.emit('listAppointments');

            return () => {
                console.log('useCheckExistingAppointment: removing socket listeners');
                socket.off('appointments', handleNewAppointments);
            };
        } catch (error) {
            console.error('Socket connection error:', error);
        } finally {
            // socket.disconnect();
        }
    }, [patientId, servicesArr]); // Include other dependencies if needed


    return {
        loading,
        existingAppointments,
        existingCategoryIds
    }

}

export default useCheckExistingAppointment
