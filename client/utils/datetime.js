import moment from 'moment-timezone';

const utcDateTimeToLocal = (dateTime) => {
    const utcMoment = moment(dateTime);
    const localMoment = utcMoment.tz(moment.tz.guess());
    return localMoment.format('YYYY-MM-DD HH:mm');
}

const localTimeToUtc = () => {
    const localTime = moment();
    return localTime.utc();
}

export {
    localTimeToUtc,
    utcDateTimeToLocal
}