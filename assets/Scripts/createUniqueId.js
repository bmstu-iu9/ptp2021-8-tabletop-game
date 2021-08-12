// создает уникальный код комнаты, чтобы игроки могли присоединяться друг к другу

function createId(length) {
    let resId = ""
    let charArr = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"

    for (let i = 0; i < charArr.length; i++) {
        resId += charArr.charAt(Math.floor(Math.random() * charArr.length))
    }

    return resId
}