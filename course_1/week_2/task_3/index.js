// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    let cmd = command.split(' ')[0];  // Читаем команду из строки

    if (cmd === 'ADD') {  // Если команда ADD
        let owner = command.split(' ')[1];  // Выбираем имя
        let phones = command.split(' ')[2].split(',');  // Выбираем телефоны и разбиваем в массив
        if (!phoneBook.hasOwnProperty(owner)) {  // Если такого пользователя нет в книге
            phoneBook[owner] = [];  // Добавляем его
        }
        phoneBook[owner] = phoneBook[owner].concat(phones);  // Добавляем телефоны к текущим
    } else if (cmd === 'REMOVE_PHONE') {
        let res_value = false;  // Файт того, что никто не был удалён
        let phone = command.split(' ')[1];  // Выбираем телефон
        for (let i = 0; i < Object.keys(phoneBook).length; i++) {  // Проходим по всем именам
            if (phoneBook[Object.keys(phoneBook)[i]].indexOf(phone) !== -1) {  // Если встретился нужный телефон
                phoneBook[Object.keys(phoneBook)[i]].splice(phoneBook[Object.keys(phoneBook)[i]].indexOf(phone), 1);  // Удаляем его
                if (phoneBook[Object.keys(phoneBook)[i]].length === 0) {  // Если у имена не осталось телефонов
                    delete phoneBook[Object.keys(phoneBook)[i]];  // Удаляем имя
                }
                res_value = true;  // Факт того, что удалили телефон. Лучше не возвращать сразу, так как может ещё встретится
            }
        }
        return res_value;
    } else if (cmd === 'SHOW') {
        let res = [];
        for (let i = 0; i < Object.keys(phoneBook).length; i++) {
            res.push(Object.keys(phoneBook)[i] + ': ' + phoneBook[Object.keys(phoneBook)[i]].join(', '));  // Добавляем строку
        }
        res.sort();  // Сортируем по именам
        return res;
    }
};
