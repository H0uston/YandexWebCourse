/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    let res = [];
    let hashtag = '';
    while (tweet.indexOf('#') !== -1) {  // Пока в строке есть хештеги
        tweet = tweet.slice(tweet.indexOf('#'));  // Стираем всё, что до хештега
        if (tweet.indexOf(' ') !== -1) {  // Если после хештега есть какой-то текст
            hashtag = tweet.slice(1, tweet.indexOf(' '));  // То выбираем всё до пробела, кроме первого символа – #
            tweet = tweet.slice(tweet.indexOf(' ') + 1);  // Стираем хештег из строки
        } else {
            hashtag = tweet.slice(1, tweet.length);  // Иначе выбираем всю оставшуются строку, кроме первого символа – #
            tweet = tweet.slice(tweet.length)  // Стираем всю оставшуюся строку
        }
        res.push(hashtag);  // Добавляем в массив
    }
    return res;
};
