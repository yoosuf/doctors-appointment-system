import React, { useState, useEffect } from 'react';
import moment from 'moment';

function RealTimeTimestamp({ timestamp }) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval;

        // Start the stopwatch when a timestamp is provided
        if (timestamp) {
            const startTime = moment(timestamp);
            interval = setInterval(() => {
                const currentTime = moment();
                const diff = currentTime.diff(startTime);
                setElapsedTime(diff);
            }, 1000);
        }

        // Clear the interval when the component unmounts or when the timestamp changes
        return () => clearInterval(interval);
    }, [timestamp]);

    // Format the elapsed time in seconds as "mm:ss"
    const formattedTime = moment.utc(elapsedTime).format("mm:ss");

    return <div>{formattedTime}</div>;
}

export default RealTimeTimestamp;
