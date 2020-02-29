/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {  // Приводим все строки к нижнему регистру
        hashtags[i] = hashtags[i].toLowerCase();
    }
    for (var i = 0; i < hashtags.length; i++) {  // Удаляем повторяющаяся строки
        if (hashtags.indexOf(hashtags[i], i + 1) !== -1) {  // Если встречается текущий элемент после текущего
            hashtags.splice(hashtags.indexOf(hashtags[i], i + 1), 1);  // Удаляем повторяющаяся элемент
            i--;  // после удаления длина массива стала меньше
        }
    }

    return hashtags.join(', ');  // Соединяем строки через запятую
};