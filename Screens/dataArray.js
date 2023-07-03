let inputs = []

function selectIsland() {
    if (typeof (Storage) !== "undefined") {
        localStorage.i = 1
        localStorage.setItem("var" + localStorage.i, document.querySelector('.btn.generalBtn.selected').textContent)

    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.var1)
    location.href = 'bleachNumber1.html';
}


function selectBleachNumber() {
    if (typeof (Storage) !== "undefined") {
        localStorage.i = parseInt(localStorage.i) + 1
        localStorage.setItem("var" + localStorage.i, document.querySelector('.bleachInput').value)
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.var2);
    location.href = 'recognizableScars1.html'
}

function selectScarLocation() {
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        localStorage.scarLength = selected.length
        for (i = 0; i < selected.length; i++) {
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, selected[i].id)
        }
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.scarLocation0);
    location.href = 'naturalBleach1.html'
}

function selectNaturalBleachLocation() {
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        localStorage.bleachLength = selected.length
        for (i = 0; i < selected.length; i++) {
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, selected[i].id)
        }
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.naturalBleachLocation0);
    location.href = 'sealTags1.html'
}




function results() {
    if (typeof (Storage) !== "undefined") {
        localStorage.i = parseInt(localStorage.i) + 1
        localStorage.setItem("var" + localStorage.i, document.querySelector('.bleachInput').value)
    } else {
        // Sorry! No Web Storage support..
    }

    for (l = 0; l < parseInt(localStorage.i); l++) {
        inputs[l] = localStorage.getItem("var" + (l + 1))
    }


    console.log(inputs)
    location.href = 'searchResults.html'
    //add code for grabbing data from database here. 
    //the array for all results is in "input"


    inputs = []
}

function results1() {
    for (l = 0; l < parseInt(localStorage.i); l++) {
        inputs[l] = localStorage.getItem("var" + (l + 1))
    }


    console.log(inputs)
    location.href = 'searchResults.html'
    //add code for grabbing data from database here. 
    //the array for all results is in "input"


    inputs = []
}




