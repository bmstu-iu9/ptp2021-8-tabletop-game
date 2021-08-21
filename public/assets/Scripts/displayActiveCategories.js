// функция передаёт информацию о всех загруженных категориях, которую можно показать игрокам

// пример вызова - нужно потом убрать
let activeCategories = ["Science", "PopCulture", "Sports"];
let string = activeCategoriesToString(activeCategories);
console.log(string);

function activeCategoriesToString(activeCategories) {
    let output = "В этом матче могут встретиться вопросы из категорий:\n";
    for (let i = 0; i < activeCategories.length; i++) {
        /*
         этот свич по сути переводит системные названия категорий в нормальные русские
         при добавлении/удалении категорий вопросов сюда нужно вносить соответствующие изменения
         */
        switch (activeCategories[i]) {
            case "Science":
                output += "-Наука\n";
                break;
            case "PopCulture":
                output += "-Поп-культура\n";
                break;
            case "Sports":
                output += "-Спорт\n";
                break;
        }
    }
    return output;
}