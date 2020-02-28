/**
 * @param {Number} hours
 * @param {Number} minutes
 * @returns {Boolean}
 */
module.exports = function (hours, minutes) {
    return 0 <= Number(hours) && Number(hours) < 24 && 0 <= Number(minutes) && Number(minutes) < 60;
};
