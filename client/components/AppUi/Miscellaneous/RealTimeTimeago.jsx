import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

function RealTimeTimeago({ timestamp }) {
    const [formattedTimestamp, setFormattedTimestamp] = useState('loading....');

    useEffect(() => {
        let interval;

        // Function to update formatted timestamp and set it in state
        const updateFormattedTimestamp = () => {
            if (timestamp) {
                const currentTime = moment();
                const providedTime = moment(timestamp).tz(moment.tz.guess()); // Convert timestamp to local timezone

                // Check if the provided timestamp corresponds to today
                if (currentTime.isSame(providedTime, 'day')) {
                    const formatted = providedTime.from(currentTime);
                    setFormattedTimestamp(formatted);
                } else {
                    const formatted = moment.utc(timestamp).local().format('YYYY-MM-DD HH:mm');

                    setFormattedTimestamp(formatted);
                }
            } else {
                setFormattedTimestamp('Timestamp not provided');
            }
        };

        // Start the stopwatch when a timestamp is provided or when timestamp changes
        if (timestamp) {
            updateFormattedTimestamp();
        }

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [timestamp]);

    return (
        <>
            <time dateTime={moment.utc(timestamp).local().format('YYYY-MM-DD HH:mm')} className='pt-1 text-sm text-gray-400'>
                {formattedTimestamp}
            </time>
        </>
    );
}

export default RealTimeTimeago;
