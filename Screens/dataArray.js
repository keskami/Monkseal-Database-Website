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
    let id = []
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        for (i = 0; i < selected.length; i++) {
            id = id.concat(selected[i].id)
        }
        localStorage.scarLocation = id
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.scarLocation);
    location.href = 'naturalBleach1.html'
}

function selectNaturalBleachLocation() {
    let id = []
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        for (i = 0; i < selected.length; i++) {
            id = id.concat(selected[i].id)
        }
        localStorage.naturalBleachLocation = id
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.naturalBleachLocation);
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
    inputs[2] = localStorage.scarLocation
    inputs[3] = localStorage.naturalBleachLocation
    inputs[4] = localStorage.tagNumber
    console.log(inputs)
    location.href = 'searchResults.html'
    //add code for grabbing data from database here. 
    //the array for all results is in "input"


    inputs = [null, null, null, null, null]
}





