/**
 * @param {String} date
 * @returns {Object}
 */
module.exports = function (date) {
    var timeDate = {
        _value: new Date(date),
        add: function(num, type) {
            if (/^\d+$/.test(num)) {
                if (type === 'years') {
                    this.getDate().setFullYear(this.getDate().getFullYear() + num)
                } else if (type === 'months') {
                    this.getDate().setMonth(this.getDate().getMonth() + num);
                } else if (type === 'days') {
                    this.getDate().setDate(this.getDate().getDate() + num);
                } else if (type === 'hours') {
                    this.getDate().setHours(this.getDate().getHours() + num);
                } else if (type === 'minutes') {
                    this.getDate().setMinutes(this.getDate().getMinutes() + num);
                } else {
                    throw new TypeError;
                }
            } else {
                throw new TypeError;
            }
            return this;
        },
        subtract: function(num, type) {
            if (/^\d+$/.test(num)) {
                if (type === 'years') {
                    this.getDate().setFullYear(this.getDate().getFullYear() - num)
                } else if (type === 'months') {
                    this.getDate().setMonth(this.getDate().getMonth() - num);
                } else if (type === 'days') {
                    this.getDate().setDate(this.getDate().getDate() - num);
                } else if (type === 'hours') {
                    this.getDate().setHours(this.getDate().getHours() - num);
                } else if (type === 'minutes') {
                    this.getDate().setMinutes(this.getDate().getMinutes() - num);
                } else {
                    throw new TypeError;
                }
            } else {
                throw new TypeError;
            }
            return this;
        },
        getDate: function() {
            return this._value;
        }
    };
    Object.defineProperty(timeDate, 'value', {
        get: function() {
            let years = String(this.getDate().getFullYear());
            let months = (String(this.getDate().getMonth() + 1) < 10) ? ('0' + String(this.getDate().getMonth() + 1)) : String(this.getDate().getMonth() + 1);
            let days = (String(this.getDate().getDate()) < 10) ? ('0' + String(this.getDate().getDate())) : String(this.getDate().getDate());
            let hours = (String(this.getDate().getHours()) < 10) ? ('0' + String(this.getDate().getHours())) : String(this.getDate().getHours());
            let minutes = (String(this.getDate().getMinutes()) < 10) ? ('0' + String(this.getDate().getMinutes())) : String(this.getDate().getMinutes());
            let str = years + '-' + months + '-' + days + ' ' + hours + ':' + minutes;
            return str;
        }
    });
    return timeDate;
};
