/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    let new_copy = JSON.parse(JSON.stringify(collection));
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i][0] === 'filterIn') {
            new_copy = filterObject(new_copy, arguments[i][1], arguments[i][2]);
        }
    }

    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i][0] === 'select') {
            new_copy = selectObject(new_copy, arguments[i][1]);
        }
    }

    return new_copy;
}

function filterObject(collection, property, values) {
    for (let j = 0; j < collection.length; j++) {
        if (values.indexOf(collection[j][property]) === -1) {
            collection.splice(j, 1);
            j--;
        }
    }
    return collection;
}

function selectObject(collection, fields) {
    for (let i = 0; i < collection.length; i++) {
        let keys = Object.keys(collection[i]);
        for (let j = 0; j < keys.length; j++) {
            if (fields.indexOf(keys[j]) === -1) {
                delete collection[i][keys[j]];
            }
        }
    }

    return collection;
}

/**
 * @params {String[]}
 */
function select() {
    let fields = [].slice.call(arguments);
    return ["select", fields];
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {
    return ["filterIn", property, values];
}

module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
