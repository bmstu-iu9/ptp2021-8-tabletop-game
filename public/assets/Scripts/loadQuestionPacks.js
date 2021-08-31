/*
Положим, что у нас есть массивы preferencesRed и preferencesBlue с избранными категориями вопросов игроков
и массив categories, содержащий строковые названия всех доступных категорий
Тут мы загружаем все необходимые категории вопросов в банк вопросов в начале игры
 */

// преференсы для примера, по итогу это должно всё заполняться в начале игры на основе того, что выбрали игроки
let preferencesRed = [];
let preferencesBlue = [];
let categories = ["Games", "Literature", "Memes", "Movies", "Music", "Science", "Sports", "Variety"];
let test;
let activeCategories;
let questionBank;

function addPreferences() {
    let tmp

    for (let i = 0; i < 4; i++) {
        tmp = document.getElementById('player1-select' + (i + 1))
        preferencesRed[i] = categoryNameToSystemName(tmp.options[tmp.selectedIndex].text)
    }

    for (let i = 0; i < 4; i++) {
        tmp = document.getElementById('player2-select' + (i + 1))
        preferencesBlue[i] = categoryNameToSystemName(tmp.options[tmp.selectedIndex].text)
    }

    test = loadQuestionPacks(preferencesRed, preferencesBlue, categories)
    activeCategories = test.activeCategories
    questionBank = test.questionBank
    test = null
    console.log(preferencesRed)
    console.log(preferencesBlue)
}

function loadQuestionPacks(preferencesRed, preferencesBlue, categories) {
// activeCategories - все загруженные по итогу категории (уникальное объединение preferencesRed и preferencesBlue
    let activeCategories = new Set([
        ...preferencesRed,
        ...preferencesBlue
    ]);

    let questionBank = [];
    for (let i = 0; i < categories.length; i++) {
        if ((preferencesRed.includes(categories[i])) || (preferencesBlue.includes(categories[i]))) {
            questionBank.push(getQuestionPack(categories[i]));
        }
    }

    // Возвращаем объект, в котором поля соответствуют переменным - банк вопросов и массив всех загруженных категорий
    return {questionBank:questionBank, activeCategories:activeCategories};
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
    // выполняем XMLHttpRequest для получения файла и обрабатываем его
    let requestURL = "assets/questionPacks/" + catName + ".txt";
    let request = new XMLHttpRequest();

    request.open("GET", requestURL, false);

    request.send();

    request.onload = function() {
        if ((request.status !== 200) && (request.status !== 4)) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
            alert(`Ошибка ${request.status}: ${request.statusText}`);
        }
    };

    request.onerror = function() {
        alert("Запрос не удался");
    };

    let fileContent = request.responseText;
    let questions = fileContent.split(/\r?\n/);
    let questionPack = [];
    for (let i = 0; i < questions.length; i++) {
        questionPack.push(getQuestion(questions[i], catName));
    }
    return {
        catName,
        questionPack
    };
}

function getQuestion(question, catName) {
    let questionData = question.split("|");
    if (questionData.length < 4) {
        console.log("Недостаточно данных в вопросе в категории " + catName);
        return -1;
    }
    let questionText = questionData[0];
    let rightAnswer = questionData[1];
    let wrongAnswers = questionData.slice(2, questionData.length);
    return {
        questionText,
        rightAnswer,
        wrongAnswers
    };
}

//addPreferences()