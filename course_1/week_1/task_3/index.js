
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;
/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
    hours += Math.floor((minutes + interval) / 60);
    minutes = (minutes + interval) % 60;
    hours %= 24;
    return `${(hours > 9) ? hours : '0' + hours}:${(minutes > 9) ? minutes : '0' + minutes}`;
};
