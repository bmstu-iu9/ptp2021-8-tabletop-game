// функция передаёт информацию о всех загруженных категориях, которую можно показать игрокам

// пример вызова - нужно потом убрать
let preferencesRed = ["Science", "Sports", "Memes"];
let preferencesBlue = ["PopCulture", "Sports"];
let activeCategories = new Set([
    ...preferencesRed,
    ...preferencesBlue
]);
let string = activeCategoriesToString(activeCategories);
console.log(string);

function activeCategoriesToString(activeCategories) {
    let output = "В этом матче могут встретиться вопросы из категорий:\n";
    activeCategories.forEach(function(value) {
        /*
         этот свич по сути переводит системные названия категорий в нормальные русские
         при добавлении/удалении категорий вопросов сюда нужно вносить соответствующие изменения
         */
        switch (value) {
            case "Science":
                output += "-Наука\n";
                break;
            case "Variety":
                output += "-Разное\n";
                break;
            case "Sports":
                output += "-Спорт\n";
                break;
            case "Memes":
                output += "-Мемы\n";
                break;
            case "Games":
                output += "-Игры\n";
                break;
            case "Music":
                output += "-Музыка\n";
                break;
            case "Movies":
                output += "-Кино\n";
                break;
            case "Literature":
                output += "-Литература\n";
                break;
        }
    });
    return output;
}