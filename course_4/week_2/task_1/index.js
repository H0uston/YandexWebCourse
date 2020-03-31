'use strict'

module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection()
{
    this._values = [];
    return this;
}


// Методы коллекции
Collection.prototype.values = function ()
{
    return this._values;
};

Collection.prototype.count = function ()
{
    return this._values.length;
};

Collection.prototype.at = function (index)
{
    return this._values[index - 1];
};

Collection.prototype.append = function (value)
{
    if (typeof(value) === "object")
    {
        for (var i = 1; i < value.count() + 1; i++)
        {
            this._values.push(value.at(i));
        }
    }
    else
    {
        this._values.push(value);
    }
};

Collection.prototype.removeAt = function (index)
{
    if (index < 1 || index > this.count())
    {
        return false;
    }
    else
    {
        this._values.splice(index - 1, 1)
        return true;
    }
};

/**
 * Создание коллекции из массива значений
 */
Collection.from = function (values) {
    var col = new Collection();
    col._values = values;
    return col;
};
