/*
В зависимости от типа клетки, захват которой происходит, нужно выбирать вопросы из разных категорий,
за что отвечает переменная mode: "red" - красный захватывает нейтральную или захватывают клетку красного,
"blue' - синий захватывает нейтральную клетку или захватывают клетку синего
Если клетка захвачена ранее и игроком выбрана категория, на которую нужно ответить для захвата,
то информация об этом хранится в переменной defenceCategory
(я подразумеваю, что игрок может не выбирать конкретную категорию и оставить её выбор
на усмотрение случайности из банка вопросов его категорий)
defenceCategory имеет значение "any" если не указана конкретная категория или клетка нейтральная
или строку с названием категории если она указана.
 */

function selectRandomQuestion(mode, defenceCategory = "any") {
    if (defenceCategory === "any") {
        if (mode === "red") {
            takeQuestion(preferencesRed[Math.floor(Math.random()*preferencesRed.length)]);
        } else if (mode === "blue") {
            takeQuestion(preferencesBlue[Math.floor(Math.random()*preferencesBlue.length)]);
        }
    } else {
        takeQuestion(defenceCategory);
    }
}

function takeQuestion(preferredCategory) {
    let questions = questionBank[categories.indexOf(preferredCategory)];
    let selectedIndex = Math.floor(Math.random()*questions.length);
    let selectedQuestion = questions[selectedIndex];
    removeQuestionFromBank(questions, selectedIndex);
    return fillQuestionForms(selectedQuestion);
}

function removeQuestionFromBank(questions, index) {
    questions.splice(index, 1);
}

function fillQuestionForms(selectedQuestion) {
    let rightAnswerIndex = Math.floor(Math.random() * 4);
    let A, B, C, D;
    let questionText = selectedQuestion.questionText;
    let wrongAnswers = selectedQuestion.wrongAnswers;
    wrongAnswers = shuffleWrongAnswers(wrongAnswers);
    let id = selectedQuestion.id;
    switch (rightAnswerIndex) {
        case 0:
            A = selectedQuestion.rightAnswer;
            B = wrongAnswers[0];
            C = wrongAnswers[1];
            D = wrongAnswers[2];
            break;
        case 1:
            A = wrongAnswers[0];
            B = selectedQuestion.rightAnswer;
            C = wrongAnswers[1];
            D = wrongAnswers[2];
            break;
        case 2:
            A = wrongAnswers[0];
            B = wrongAnswers[1];
            C = selectedQuestion.rightAnswer;
            D = wrongAnswers[2];
            break;
        case 3:
            A = wrongAnswers[0];
            B = wrongAnswers[1];
            C = wrongAnswers[2];
            D = selectedQuestion.rightAnswer;
            break;
    }
    return {
        id,
        questionText,
        rightAnswerIndex,
        A,
        B,
        C,
        D
    };
}

/*
 перемешиваем случайным образом все неправильные ответы с помощью
 алгоритма Тасования Фишера-Йетса и оставляем первые три попавшихся
 */
function shuffleWrongAnswers(wrongs) {
    let currentIndex = wrongs.length;
    let randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // меняем местами значения, соответствующие индексам
        [wrongs[currentIndex], wrongs[randomIndex]] = [wrongs[randomIndex], wrongs[currentIndex]];
    }
    return wrongs.slice(0, 3)
}