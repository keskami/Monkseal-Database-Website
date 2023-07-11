let inputs = []
let keys = [];

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
        localStorage.setItem("key" + localStorage.i, 'sealid')
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
    console.log(keys)
    location.href = 'sealTags1.html'
}






function results() {
    if (typeof (Storage) !== "undefined") {
        localStorage.i = parseInt(localStorage.i) + 1
        localStorage.setItem("var" + localStorage.i, document.querySelector('.bleachInput').value)
        localStorage.setItem("key" + localStorage.i, 'lefttag')
    } else {
        // Sorry! No Web Storage support..
    }

    for (l = 0; l < parseInt(localStorage.i); l++) {
        inputs[l] = localStorage.getItem("var" + (l + 1))
        keys[l] = localStorage.getItem("key" + (l + 1))
    }


    const scarSearch = 'scar';
    const bleachSearch = 'bleach';
    const islands = ['Hawai‘i', 'Kaho‘olawe', 'Kauai', 'Lanai', 'Moloka‘i', 'Ni‘ihau', 'Maui', 'Oahu'];
    const sendIslands = ['hawaiisighting', 'kahoolawesighting', 'kauaisighting', 'lanaisighting', 'molokaisighting', 'niihausighting', 'mauisighting', 'oahusighting'];
    
    for (let i = 0; i < inputs.length; i++) {
      if ((inputs[i].includes(scarSearch)) || (inputs[i].includes(bleachSearch))) {
        keys[i] = inputs [i]
        inputs [i] = 'x'
      }
      for (let k = 0; k < islands.length; k++) {
      if(inputs[i] == islands[k]){
            keys[i] = sendIslands[k]
            inputs[i] = 'x'
      }
      }
    }

    console.log(keys)
    console.log(inputs)

    const combinedObject = keys.reduce((obj, keys, index) => {
        obj[keys] = inputs[index];
        return obj;
      }, {});
      
      
     

    getUser(combinedObject);

    
    inputs = []
    keys = []
}




function results1() {

    for (l = 0; l < parseInt(localStorage.i); l++) {
        inputs[l] = localStorage.getItem("var" + (l + 1))
        keys[l] = localStorage.getItem("key" + (l + 1))
    }


    const scarSearch = 'scar';
    const bleachSearch = 'bleach';
    const islands = ['Hawai‘i', 'Kaho‘olawe', 'Kauai', 'Lanai', 'Moloka‘i', 'Ni‘ihau', 'Maui', 'Oahu'];
    const sendIslands = ['hawaiisighting', 'kahoolawesighting', 'kauaisighting', 'lanaisighting', 'molokaisighting', 'niihausighting', 'mauisighting', 'oahusighting'];
    
    for (let i = 0; i < inputs.length; i++) {
      if ((inputs[i].includes(scarSearch)) || (inputs[i].includes(bleachSearch))) {
        keys[i] = inputs [i]
        inputs [i] = 'x'
      }
      for (let k = 0; k < islands.length; k++) {
      if(inputs[i] == islands[k]){
            keys[i] = sendIslands[k]
            inputs[i] = 'x'
      }
      }
    }

    console.log(keys)
    console.log(inputs)

    const combinedObject = keys.reduce((obj, keys, index) => {
        obj[keys] = inputs[index];
        return obj;
      }, {});
      
      
     

    getUser(combinedObject);



    inputs = []
    keys = []
}


async function getUser(jsonBody) {
    try {
      const response = await fetch('http://localhost:3000/api/v1/monkseals/find', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        mode: 'cors',
        body: JSON.stringify(jsonBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(JSON.stringify(result));
      location.href = 'searchResults.html'
    } catch (err) {
      console.log(err);
    }
  }