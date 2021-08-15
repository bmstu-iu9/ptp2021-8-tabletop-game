/*
Положим, что у нас есть массивы preferencesRed и preferencesBlue с избранными категориями вопросов игроков
и массив categories, содержащий строковые названия всех доступных категорий
Тут мы загружаем все необходимые категории вопросов в банк вопросов в начале игры
 */

// для примера, по итогу это должно всё заполняться в начале игры на основе того, что выбрали игроки
preferencesRed = ["Science"];
preferencesBlue = ["PopCulture"];
categories = ["Science", "PopCulture", "Sports"];

let questionBank = [];
let id = -1; // на всякий случай
for (let i = 0; i < categories.length; i++) {
    if ((preferencesRed.includes(categories[i])) || (preferencesBlue.includes(categories[i]))) {
        questionBank.push(getQuestionPack(categories[i]));
    }
}

/*
Загружаем один пакет вопросов
Я использую формат вида
ТекстВопроса1|ПравильныйОтвет|НеправильныйОтвет1|...|НеправильныйОтветN
ТекстВопроса2|ПравильныйОтвет|НеправильныйОтвет1|...|НеправильныйОтветN
И так далее
Строки разделяются символами перевода строки (и возможно символом возврата каретки)
!!! Только проследите чтобы в конце файлов не оставались символы перевода, иначе будет плохо(
Фича: неправильных ответов может быть сколь угодно много, главное чтобы минимум 3
Выбор неправильных ответов, которые станут вариантами ответа в вопросе, будет происходить
на этапе непосредственно перед заданием вопроса игрокам (я там рандомизирую массив
неправильных ответов и первые три элемента раскидаю в слоты ответов, не занятые правильным ответом.
 */

function getQuestionPack(catName) {
    const fs = require("fs");
    let fileContent = fs.readFileSync("../question" +
        "Packs/" + catName + ".txt", "utf8");
    let questions = fileContent.split(/\r?\n/);
    let questionPack = [];
    for (let i = 0; i < questions.length; i++) {
        id++;
        questionPack.push(getQuestion(questions[i]));
    }
    return questionPack;
}

function getQuestion(question) {
    let questionData = question.split("|");
    if (questionData.length < 4) {
        console.log("Недостаточно данных в вопросе №" + id);
        return -1;
    }
    let questionText = questionData[0];
    let rightAnswer = questionData[1];
    let wrongAnswers = questionData.slice(2, questionData.length);
    return {
        id,
        questionText,
        rightAnswer,
        wrongAnswers
    };
}