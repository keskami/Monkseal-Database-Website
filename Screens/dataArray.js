let inputValues = [null, null, null, null, null]
let inputKeys = [null, null, null, null, null]


function selectIsland() {
    let unsendableIslands = ["Hawai‘i", "Kaho‘olawe", "Kauai", "Lanai", "Moloka‘i", "Ni‘ihau", "Maui", "Oahu"]
    let sendableIslands = ["hawaiisighting", "kahoolawesighting", "kauisighting", "lanaisighting", "molokaisighting", "niihausighting", "mauisighting", "oahusighting"]
    if (typeof (Storage) !== "undefined") {
        localStorage.islandKey = document.querySelector('.btn.generalBtn.selected').textContent
        localStorage.islandValue = "x"
        
        for (i=0; i < sendableIslands.length; i++){
            if (localStorage.islandKey == unsendableIslands[i]){
                localStorage.islandKey = sendableIslands[i]
            }
        }
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.islandKey)
    location.href = 'bleachNumber1.html';
}

function selectBleachNumber() {
    if (typeof (Storage) !== "undefined") {
        localStorage.bleachKey = "sealid"
        localStorage.bleachNumberValue = document.querySelector('.bleachInput').value
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.bleachNumberValue);
    location.href = 'recognizableScars1.html'
}

function selectScarLocation() {
    let id = []
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        for (i = 0; i < selected.length; i++) {
            id = id.concat(selected[i].id)
        }
        localStorage.scarLocationKey = id
        localStorage.scarLocationValue = "x"
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.scarLocationKey);
    location.href = 'naturalBleach1.html'
}

function selectNaturalBleachLocation() {
    let id = []
    if (typeof (Storage) !== "undefined") {
        const selected = document.getElementsByClassName('selected')
        for (i = 0; i < selected.length; i++) {
            id = id.concat(selected[i].id)
        }
        localStorage.naturalBleachLocationKey = id
        localStorage.naturalBleachLocationValue = "x"
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.naturalBleachLocationKey);
    location.href = 'sealTags1.html'
}


async function getUser(jsonBody) {
    try {
      const response = await fetch('http://localhost:3000/api/v1/monkseals/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

function results() {
    if (typeof (Storage) !== "undefined") {
        localStorage.tagNumberValue = document.querySelector('.bleachInput').value
        localStorage.tagNumberKey = "lefttag"
    } else {
        // Sorry! No Web Storage support..
    }
    console.log(localStorage.tagNumberValue);

    inputValues[0] = (localStorage.islandValue)
    inputValues[1] = localStorage.bleachNumberValue
    inputValues[2] = localStorage.scarLocationValue
    inputValues[3] = localStorage.naturalBleachLocationValue
    inputValues[4] = localStorage.tagNumberValue

    inputKeys[0] = localStorage.islandKey
    inputKeys[1] = localStorage.bleachKey 
    inputKeys[2] = localStorage.scarLocationKey
    inputKeys[3] = localStorage.naturalBleachLocationKey
    inputKeys[4] = localStorage.tagNumberKey

    

    console.log(inputValues, inputKeys)
    


    var obj = {};
    for (var i = 0; i < inputKeys.length; i++) {
       obj[inputKeys[i]] = inputValues[i];
    }

    console.log(JSON.stringify(obj))
    getUser(obj);


    inputKeys = [null, null, null, null, null]
    inputValues = [null, null, null, null, null]
  
}




  


  