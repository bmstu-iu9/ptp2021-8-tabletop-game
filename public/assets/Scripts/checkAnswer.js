// просто проверяем, совпал ли ответ игрока с правильным
function checkAnswer(question, playerAnswer) {
    return ((playerAnswer === "A") && question.rightAnswerIndex === 0) ||
        ((playerAnswer === "B") && question.rightAnswerIndex === 1) ||
        ((playerAnswer === "C") && question.rightAnswerIndex === 2) ||
        ((playerAnswer === "D") && question.rightAnswerIndex === 3);
}