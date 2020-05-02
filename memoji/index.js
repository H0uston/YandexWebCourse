const COUNT_OF_SAME_CARDS = 2;
const USED_EMOJI = ["🐶", "🐰", "🐓", "🐭", "🐹", "🐱"];

function getShuffledArray()
{
    let cards_indexes = [];
    let shuffle = function (array) {
        let currentIndex = array.length;
        let temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;

    };

    for (let i = 0, len = USED_EMOJI.length; i < len; i++) {
        for (let j = 0, len2 = COUNT_OF_SAME_CARDS; j < len2; j++) {
            cards_indexes.push(i);
        }
    }

    return shuffle(cards_indexes.slice());
}

setTimeout(() => {
    setValuesOfCards();
    addingListeners();
});

function setValuesOfCards() {
    let tagsWithText = document.querySelectorAll(".back-card > p");
    let shuffled_indexes = getShuffledArray();
    for (let i = 0, len = tagsWithText.length; i < len; i++) {
        tagsWithText[i].innerText = USED_EMOJI[shuffled_indexes[i]];
    }
}

let gameInfo = {isStarted: false, currentCards: [], left: USED_EMOJI.length * COUNT_OF_SAME_CARDS};
let timerGlobal = undefined;

function startTimer()
{
    timerGlobal = setInterval(takeSecond, 1000);
}

function takeSecond()
{
    let timer = document.getElementById("timer");
    let currentTime = timer.innerText;
    let minutesAndSeconds = (currentTime.split(":")).map(x => parseInt(x));
    if (minutesAndSeconds[0] === 0 && minutesAndSeconds[1] === 0)
    {
        stopGame();
        stopTimer(false);
    }
    else if (minutesAndSeconds[0] === 1 && minutesAndSeconds[1] === 0)
    {
        timer.innerText = "00:59"
    }
    else if (minutesAndSeconds[1] !== 0 && minutesAndSeconds[1] > 10)
    {
        timer.innerText = "00:" + (minutesAndSeconds[1] - 1);
    }
    else
    {
        timer.innerText = "00:0" + (minutesAndSeconds[1] - 1);
    }
}

function stopTimer()
{
    clearInterval(timerGlobal);
}

function stopGame(result)
{
    let menu = document.getElementById("result-background");
    menu.style.display = "block";
    let button = document.getElementById("restart-button");
    button.addEventListener("click", function (event) {
        menu.style.display = "none";
        restartGame();
    }, true);
    if (result)
    {
        let title = menu.querySelector(".result > p");
        title.innerText = "Win";
    }
    else
    {
        let title = menu.querySelector(".result > p");
        title.innerText = "Lose";
    }
}

function restartGame()
{
    gameInfo = {isStarted: false, currentCards: [], left: USED_EMOJI.length * COUNT_OF_SAME_CARDS};
    closeAll();
    setTimeout(setValuesOfCards, 1000);
    let timer = document.getElementById("timer");
    timer.innerText = "01:00";
}

function closeAll()
{
    let gameField = document.getElementsByClassName("card");
    let childs = Array.from(gameField);
    for (let i = 0, len = childs.length; i < len; i++)
    {
        childs[i].classList.remove("blocked");
        childs[i].classList.remove("wrong");
        childs[i].classList.remove("rotated");
    }
}

function addingListeners()
{
    let gameField = document.getElementById("game-field");
    gameField.addEventListener("click", function (event)
    {
        if (!gameInfo.isStarted)
        {
            startTimer();
            gameInfo.isStarted = true;
        }

        event.stopPropagation();
        let target = event.target;
        let card = undefined;
        if (target.tagName === 'p')
        {
            card = target.parentNode.parentNode;
        } else {
            card = target.parentNode;
        }

        if (card.classList.contains('blocked'))
        {
            return;
        }

        if (card.className === "card")
        {
            card.classList.add("rotated");
        }
        else if (card.className === "card rotated")
        {
            card.classList.remove("rotated");
        } else {
            return;
        }

        if (gameInfo.currentCards.length === 0) {
            gameInfo.currentCards.push(card);
        } else if (gameInfo.currentCards.length === 1) {
            if (gameInfo.currentCards[0].dataset.id === card.dataset.id) {
                gameInfo.currentCards.pop();
            } else if (gameInfo.currentCards[0].innerText === card.innerText) {
                gameInfo.currentCards[0].classList.add("blocked");
                card.classList.add("blocked");
                gameInfo.currentCards.splice(0, gameInfo.currentCards.length);
                gameInfo.left -= 2;
            } else {
                gameInfo.currentCards[0].classList.add("wrong");
                card.classList.add("wrong");
                gameInfo.currentCards.push(card);
            }
        } else {
            for (let i = 0; i < gameInfo.currentCards.length; i++) {
                gameInfo.currentCards[i].classList.remove('wrong');
                if (gameInfo.currentCards[i].dataset.id !== card.dataset.id) {
                    gameInfo.currentCards[i].classList.remove('rotated');
                    gameInfo.currentCards.splice(i, 1);
                    i--;
                }
            }

            if (gameInfo.currentCards.length === 0) {
                gameInfo.currentCards.push(card);
            }
        }

        if (gameInfo.left === 0) {
            stopTimer();
            stopGame(true);
        }
    }, true);
}
