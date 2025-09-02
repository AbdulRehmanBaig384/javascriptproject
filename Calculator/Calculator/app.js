function press(e) {
    var getInp = document.querySelector('.calculator_input')
    getInp.value += e
}

function eq() {
    var getInp = document.querySelector('.calculator_input')
    getInp.value = eval(getInp.value)
}

function ac() {
    var getInp = document.querySelector('.calculator_input')
    getInp.value = ""
}

function del() {
    var getInp = document.querySelector('.calculator_input')
    getInp.value = getInp.value.slice(0, -1)
}