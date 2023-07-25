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
      keys[i] = inputs[i]
      inputs[i] = 'x'
    }
    for (let k = 0; k < islands.length; k++) {
      if (inputs[i] == islands[k]) {
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
      keys[i] = inputs[i]
      inputs[i] = 'x'
    }
    for (let k = 0; k < islands.length; k++) {
      if (inputs[i] == islands[k]) {
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
    location.href = 'searchResults.html'
    localStorage.results = JSON.stringify(result)
    console.log(localStorage.results)

  } catch (err) {
    console.log(err);
  }



}

function revealSeals(e) {
  revealBtn = document.getElementById("reveal")
  sealCount = document.getElementById("sealCount")

  let arrayResults = JSON.parse(localStorage.results)
  var resultDiv = document.getElementById('resultText');

  revealBtn.style.display = 'none'
  sealCount.innerHTML = arrayResults.length

  if (arrayResults.length == 0) {
    location.href = "notFound.html"
  }

  for (i = 0; i < arrayResults.length; i++) {
    var div = document.createElement('div');
    div.id = "resultImgDiv"

    var img = document.createElement('img');
    if (arrayResults[i].image == null) {
      img.src = "/img/waterMonk.jpg"
    }
    else {
      img.src = arrayResults[i].image
    }
    img.classList.add("img-monk")
    img.id = i

    var name = document.createElement('p')
    if (arrayResults[i].name == null) {
      name.innerHTML = "No Name"
    }
    else {
      name.innerHTML = arrayResults[i].name
    }
    name.classList.add("nameDisplay")

    img.addEventListener("click", sealProfile)
    resultDiv.appendChild(div)
    div.appendChild(img)
    div.appendChild(name)
  }



}

function sealProfile(e) {
  let arrayResults = JSON.parse(localStorage.results)
  var name = document.getElementById("name")
  var id = document.getElementById("id")
  var bleachID = document.getElementById("bleachID")
  var identifiers = document.getElementById("identifiers")
  var scarring = document.getElementById("scarring")
  scarring.replaceChildren()
  var bleach = document.getElementById("bleach")
  bleach.replaceChildren()
  var island = document.getElementById("island")
  island.replaceChildren()
  var birthplace = document.getElementById("birthplace")
  var resultDiv = document.getElementById("resultText")
  var modal = document.getElementById("sealProfileModal")
  var img = document.getElementById("img-seal")

  modal.style.display = "block" //display profile
  resultDiv.style.display = "none" //hide images
  name.innerHTML = arrayResults[e.target.id].name //change name of seal
  id.innerHTML = arrayResults[e.target.id].sealid
  bleachID.innerHTML = arrayResults[e.target.id].sealid
  identifiers.innerHTML = arrayResults[e.target.id].identifiers
  for (i = 11; i < 19; i++) {
    var scar = document.createElement('p')
    scar.innerHTML = null
    if (Object.values(arrayResults[e.target.id])[i] == 'x') {
      scar.innerHTML = Object.keys(arrayResults[e.target.id])[i]
    }
    else {
      scar.innerHTML = null
    }
    scarring.appendChild(scar)
  }
  for (i = 20; i < 28; i++) {
    var bleachMarks = document.createElement('p')
    bleachMarks.innerHTML = null
    if (Object.values(arrayResults[e.target.id])[i] == 'x') {
      bleachMarks.innerHTML = Object.keys(arrayResults[e.target.id])[i]
    }
    else {
      bleachMarks.innerHTML = null
    }
    bleach.appendChild(bleachMarks)
  }
  for (i = 29; i < 35; i++) {
    var islandSightings = document.createElement('p')
    islandSightings.innerHTML = null
    if (Object.values(arrayResults[e.target.id])[i] == 'x') {
      islandSightings.innerHTML = Object.keys(arrayResults[e.target.id])[i]
    }
    else {
      islandSightings.innerHTML = null
    }
    island.appendChild(islandSightings)
  }
  birthplace.innerHTML = arrayResults[e.target.id].birthisland
  img.src = arrayResults[e.target.id].image

}

function hideProfile() {
  var resultDiv = document.getElementById("resultText")
  document.getElementById("sealProfileModal").style.display = 'none'
  resultDiv.style.display = "block"
}
