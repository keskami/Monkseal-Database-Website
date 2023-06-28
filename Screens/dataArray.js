
var island = null;
var bleachNumber = null;
let inputs = [null,  null, null, null, null]

function selectIsland() {
    island = document.querySelector('.btn.generalBtn.selected').textContent;
    location.href = 'bleachNumber1.html';
    console.log(island)
}

function selectBleachNumber() {
    bleachNumber = document.getElementsByClassName('bleachInput').value
    console.log(inputs[1]);
    location.href = 'recognizableScars1.html'
    console.log(bleachNumber)
}



function results() {
    location.href = 'searchResults.html'
    inputs = [island, bleachNumber, null, null, null];
    console.log(inputs)
}





