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
В случае, если вопросы из выбранной категории исчерпаны, я проверяю, есть ли в каких-нибудь из оставшихся
категорий игрока не разыгранные вопросы, иначе проверяю то же самое для категорий уже другого игрока, если
вопросов нет нигде, то всё плохо
 */

function selectRandomQuestion(mode, defenceCategory = "any") {
    if (defenceCategory === "any") {
        if (mode === "red") {
            takeQuestion(preferencesRed[Math.floor(Math.random()*preferencesRed.length)], "red");
        } else if (mode === "blue") {
            takeQuestion(preferencesBlue[Math.floor(Math.random()*preferencesBlue.length)], "blue");
        }
    } else {
        takeQuestion(defenceCategory, mode);
    }
}

function takeQuestion(preferredCategory, mode) {
    let questions;
    for (let i = 0; i < questionBank.length; i++) {
        if (questionBank[i].catName === preferredCategory) {
            questions = questionBank[i].questionPack;
            break;
        }
    }

    // проверка на наличие не разыгранных вопросов
    if (questions.length < 1) {
        if (mode === "red") {
            checkEmptyCategories("red")
        } else if (mode === "blue") {
            checkEmptyCategories("blue")
        }
    }

    // выбираем случайный вопрос из категории, удаляем его из банка и заполняем нужные переменные
    let selectedIndex = Math.floor(Math.random()*questions.length);
    let selectedQuestion = questions[selectedIndex];
    removeQuestionFromBank(questions, selectedIndex);
    return fillQuestionForms(selectedQuestion);
}

function checkEmptyCategories(mode) {
    if (mode === "red") {
        for (let i = 0; i < preferencesRed.length; i++) {
            for (let j = 0; j < questionBank.length; j++) {
                if ((preferencesRed[i] === questionBank[j].catName) &&
                    (questionBank[j].questionPack.length > 0)) {
                    takeQuestion(preferencesRed[i], mode);
                }
            }
        }
    } else if (mode === "blue") {
        for (let i = 0; i < preferencesBlue.length; i++) {
            for (let j = 0; j < questionBank.length; j++) {
                if ((preferencesBlue[i] === questionBank[j].catName) &&
                    (questionBank[j].questionPack.length > 0)) {
                    takeQuestion(preferencesBlue[i], mode);
                }
            }
        }
    }

    /*
    если управление перешло сюда, значит во всех категориях игрока, соответствующего mode, нет
    не разыгранных вопросов,
    смотрим вопросы в категориях другого игрока
    */

    if (mode === "red") {
        for (let i = 0; i < preferencesBlue.length; i++) {
            for (let j = 0; j < questionBank.length; j++) {
                if ((preferencesBlue[i] === questionBank[j].catName) &&
                    (questionBank[j].questionPack.length > 0)) {
                    takeQuestion(preferencesBlue[i], mode);
                }
            }
        }
    } else if (mode === "blue") {
        for (let i = 0; i < preferencesRed.length; i++) {
            for (let j = 0; j < questionBank.length; j++) {
                if ((preferencesRed[i] === questionBank[j].catName) &&
                    (questionBank[j].questionPack.length > 0)) {
                    takeQuestion(preferencesRed[i], mode);
                }
            }
        }
    }

    /*
    Если уж код дошёл сюда, то доступных вопросов нет ни в одной избранной категории любого из
    игроков и всё плохо
     */
    alert("вопросы кончились, всё плохо");
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