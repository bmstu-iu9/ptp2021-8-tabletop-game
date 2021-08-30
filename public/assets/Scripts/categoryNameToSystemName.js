// переводим русские названия, полученные с главной страниц, в соответствующие названия на английском
function categoryNameToSystemName(catName){
    switch (catName) {
        case "Игры":
            return "Games";
        case "Литература":
            return "Literature";
        case "Мемы":
            return "Memes";
        case "Кино":
            return "Movies";
        case "Музыка":
            return "Music";
        case "Наука":
            return "Science";
        case "Спорт":
            return "Sports";
        case "Разное":
            return "Variety";
    }
}