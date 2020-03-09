module.exports = {

    db_list: [],

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (this.db_list[event] === undefined) {
            this.db_list[event] = [];
        }

        this.db_list[event].push({"subscriber": subscriber, "handler": handler});
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (this.db_list[event] !== undefined) {
            for (let i = 0; i < this.db_list[event].length; i++) {
                if (this.db_list[event][i].subscriber === subscriber) {
                    this.db_list[event].splice(i, 1);
                    i--;
                }
            }
        }
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (this.db_list[event] !== undefined) {
            for (let i = 0; i < this.db_list[event].length; i++) {
                this.db_list[event][i].handler.bind(this.db_list[event][i].subscriber)();
            }
        }
        return this;
    }
};
