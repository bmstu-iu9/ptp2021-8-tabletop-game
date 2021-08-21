bs = 0
rs = 0
function changeScopeRed (){
    var redScope = document.getElementById("red-scope")
    redScope.innerHTML = rs
    rs++
    var newR = document.getElementById("new-r")
    newR.innerHTML = "+ 1"
    newR.style.color = "red"
    setTimeout(function (){
        newR.style.color = "transparent"
    }, 800)
}
function changeScopeBlue () {
    var blueScope = document.getElementById("blue-scope")
    blueScope.innerHTML = bs
    bs++
    var newB = document.getElementById("new-b")
    newB.innerHTML = "+ 1"
    newB.style.color = "blue"
    setTimeout(function (){
        newB.style.color = "transparent"
    }, 800)
}
setInterval(changeScopeRed, 1500)
setInterval(changeScopeBlue, 1500)