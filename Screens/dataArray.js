let inputs = [null, null, null, null, null]


function selectIsland() {
    if (typeof (Storage) !== "undefined") {
        localStorage.island = document.querySelector('.btn.generalBtn.selected').textContent
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.island)
    location.href = 'bleachNumber1.html';
}

function selectBleachNumber() {
    if (typeof (Storage) !== "undefined") {
        localStorage.bleachNumber = document.querySelector('.bleachInput').value
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.bleachNumber);
    location.href = 'recognizableScars1.html'
}

function selectScarLocation() {
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        localStorage.scarLength = selected.length
        for (i = 0; i < selected.length; i++) {
            localStorage.setItem('scarLocation' + i, selected[i].id)
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
            localStorage.setItem('naturalBleachLocation' + i, selected[i].id)
        }
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.naturalBleachLocation0);
    location.href = 'sealTags1.html'
}




function results() {
    if (typeof (Storage) !== "undefined") {
        localStorage.tagNumber= document.querySelector('.bleachInput').value
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.tagNumber);

    inputs[0] = localStorage.island
    inputs[1] = localStorage.bleachNumber
    inputs[2] = localStorage.tagNumber
    for (i = 0; i < parseInt(localStorage.scarLength); i++) {
        inputs[i + 3] = localStorage.getItem('scarLocation' + i)
    }
    for (i = 0; i < parseInt(localStorage.bleachLength); i++) {
        inputs[i + 3 + parseInt(localStorage.scarLength)] = localStorage.getItem('naturalBleachLocation' + i)
    }
    
    console.log(inputs)
    location.href = 'searchResults.html'
    //add code for grabbing data from database here. 
    //the array for all results is in "input"


    inputs = [null, null, null, null, null]
}





