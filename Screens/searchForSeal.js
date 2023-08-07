var modal = document.getElementById("filterModal")

var btn = document.getElementById("filterButton")

var closeBtn = document.getElementById("close")

var sealName;

var finalSiblingResults = []


function openModal() {
    console.log("yes")
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function scarsOpen() {
    var arrow = document.getElementById("expandIcon")
    var scarBtns = document.getElementById("scarDropdown")
    if (arrow.style.rotate == "90deg") {
        arrow.style.rotate = "0deg"
        scarBtns.style.display = "none"
    }
    else {
        arrow.style.rotate = "90deg"
        scarBtns.style.display = "block"
    }



}

function bleachOpen() {
    var arrow = document.getElementById("expandIcon2")
    var scarBtns = document.getElementById("bleachDropdown")
    if (arrow.style.rotate == "90deg") {
        arrow.style.rotate = "0deg"
        scarBtns.style.display = "none"
    }
    else {
        arrow.style.rotate = "90deg"
        scarBtns.style.display = "block"
    }
}


function applyFilters() {
    closeModal()
    let inputs = []
    let keys = [];
    if (typeof (Storage) !== "undefined") {
        localStorage.i = 0
        var islands = document.getElementById('islands')
        var tagNum = document.getElementById('tagNum')
        var tagSide = document.getElementById('tagSide')
        var bleachNum = document.getElementById("bleachNum")
        var selectedScars = document.querySelectorAll('input[type="checkbox"]:checked')
        var selectedBleach = document.querySelectorAll('input[id="bleachDropdown"]:checked')

        if (islands.value != "") {
            if (islands.value == "Hawaii") {
                keys[localStorage.i] = "hawaiisighting"
            }
            if (islands.value == "Oahu") {
                keys[localStorage.i] = "oahusighting"
            }
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, "x")
        }
        if (tagNum.value.length != 0) {
            keys[localStorage.i] = tagSide.value
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, tagNum.value)

        }
        if (bleachNum.value.length != 0) {
            keys[localStorage.i] = "sealid"
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, bleachNum.value)

        }

        for (i = 0; i < selectedScars.length; i++) {
            keys[localStorage.i] = selectedScars[i].value
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, "x")

        }
        for (i = 0; i < selectedBleach.length; i++) {
            keys[localStorage.i] = selectedBleach[i].value
            localStorage.i = parseInt(localStorage.i) + 1
            localStorage.setItem("var" + localStorage.i, "x")

        }

        for (l = 0; l < parseInt(localStorage.i); l++) {
            inputs[l] = localStorage.getItem("var" + (l + 1))
        }

        console.log(keys)
        console.log(inputs)

        const combinedObject = keys.reduce((obj, keys, index) => {
            obj[keys] = inputs[index];
            return obj;
        }, {});

        getUser(combinedObject);

        localStorage.filterLength = inputs.length
    } else {
        // Sorry! No Web Storage support..
    }
    inputs = []
    keys = []
}

function changeFilterNum() {
    if (typeof (Storage) !== "undefined") {
        localStorage.i = 0
        var islands = document.getElementById('islands')
        var tagNum = document.getElementById('tagNum')
        var bleachNum = document.getElementById("bleachNum")
        var selectedScars = document.querySelectorAll('input[type="checkbox"]:checked')
        var selectedBleach = document.querySelectorAll('input[id="bleachDropdown"]:checked')

        if (islands.value != "") {
            localStorage.i = parseInt(localStorage.i) + 1
        }
        if (tagNum.value.length != 0) {
            localStorage.i = parseInt(localStorage.i) + 1
        }
        if (bleachNum.value.length != 0) {
            localStorage.i = parseInt(localStorage.i) + 1
        }

        for (i = 0; i < selectedScars.length; i++) {
            localStorage.i = parseInt(localStorage.i) + 1
        }
        for (i = 0; i < selectedBleach.length; i++) {
            localStorage.i = parseInt(localStorage.i) + 1
        }
    } else {
        // Sorry! No Web Storage support..
    }
    filterNum.textContent = localStorage.i
}

function clearModal() {
    var islands = document.getElementById('islands')
    var tagNum = document.getElementById('tagNum')
    var bleachNum = document.getElementById("bleachNum")
    var selected = document.getElementsByName("checkbox")
    var tagSide = document.getElementById("tagSide")


    islands.value = ""
    tagSide.value = ""
    tagNum.value = ""
    bleachNum.value = ""
    for (var i = 0; i < selected.length; i++) {
        selected[i].checked = false;
    }

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
        localStorage.results = JSON.stringify(result)
        console.log(localStorage.results)

    } catch (err) {
        console.log(err);
    }
    revealSeals()



}

function revealSeals(e) {

    let arrayResults = JSON.parse(localStorage.results)
    var resultDiv = document.getElementById('resultText');
    resultDiv.innerHTML = ""
    if (arrayResults.length == 0) {
        location.href = "notFound.html"
    }

    for (i = 0; i < arrayResults.length; i++) {
        var div = document.createElement('div');
        div.classList = "searchedSeal"

        var sealLabel = document.createElement('div');
        sealLabel.classList = "sealLabel"

        var img = document.createElement('img');
        if (arrayResults[i].image == null) {
            img.src = "/img/waterMonk.jpg"
        }
        else {
            img.src = arrayResults[i].image
        }
        img.id = i


        var name = document.createElement('p')
        if (arrayResults[i].name == null) {
            name.innerHTML = "No Name"
        }
        else {
            name.innerHTML = arrayResults[i].name
        }
        name.classList.add("name")


        var sealID = document.createElement('p')
        var ID = document.createElement('span')
        var num = document.createElement('span')

        sealID.classList = "sealID"
        ID.innerHTML = "Seal ID"
        ID.style.color = "#a1a1a1"
        num.innerHTML = arrayResults[i].sealid
        num.style.color = "#0399d9"
        num.classList = "sealNum"


        img.addEventListener("click", sealProfile)
        resultDiv.appendChild(div)
        div.appendChild(img)
        div.appendChild(sealLabel)
        sealLabel.appendChild(name)
        sealLabel.appendChild(sealID)
        sealID.appendChild(ID)
        sealID.appendChild(num)
    }

}

async function sealProfile(e) {
    finalSiblingResults = [];
    var motherImage = document.getElementById("motherImage")
    var mother = document.getElementById("mother")
    var motherRelation = document.getElementById("motherRelation")
    var dividerLine = document.getElementById("dividerLine")
    mother.style.display = 'block';
    motherImage.style.display = 'block';
    motherRelation.style.display = 'block';
    dividerLine.style.display = 'flex';

    let arrayResults = JSON.parse(localStorage.results)
    console.log(arrayResults[e.target.id].sealid)

    sealName = arrayResults[e.target.id].name
    localStorage.sealName = JSON.stringify(sealName)

    const targetKey = "mother";
    const searchResults = String(searchForKey(arrayResults[e.target.id], targetKey));
    console.log("Results for key '" + targetKey + "':", searchResults);

    if (searchResults.length > 2) {

    var motherKey = "sealid"
    var motherObject = { [motherKey]: searchResults };
    console.log(motherObject)

    await getUser2(motherObject);
    let motherResult =  JSON.parse(localStorage.motherResults)
    console.log(motherResult)

    if (motherResult.length > 0){
    var mother = document.getElementById("mother")
    var motherImage = document.getElementById("motherImage")
    if ( motherResult[0].name == null) {
        mother.innerHTML = "No Name";
    }
    mother.innerHTML = motherResult[0].name
    motherImage.src = motherResult[0].image
  

    console.log("dog" + mother)
    }else{
        var motherImage = document.getElementById("motherImage")
        var mother = document.getElementById("mother")
        var motherRelation = document.getElementById("motherRelation")
        var dividerLine = document.getElementById("dividerLine")
        mother.style.display = 'none';
        motherImage.style.display = 'none';
        motherRelation.style.display = 'none';
        dividerLine.style.display = 'none';
    }
    }else{
        var motherImage = document.getElementById("motherImage")
        var mother = document.getElementById("mother")
        var motherRelation = document.getElementById("motherRelation")
        var dividerLine = document.getElementById("dividerLine")
        mother.style.display = 'none';
        motherImage.style.display = 'none';
        motherRelation.style.display = 'none';
        dividerLine.style.display = 'none';
    }
    
    const siblingResult = []
    const targetKey2 = "siblings";
    var searchResults2 = String(searchForKey(arrayResults[e.target.id], targetKey2));
    console.log("Results for key '" + targetKey2 + "':", searchResults2);
   

    if (searchResults2.length > 1) {
        
        var splitSearch2 = searchResults2.split(",");
        console.log(splitSearch2)
        var siblingNumber = document.getElementById("siblingNumber")
        siblingNumber.innerHTML = splitSearch2.length
      
        var silbingKey = "sealid"
        var siblingObject;
        var siblingResultPlace;
        
        for (i = 0; i < splitSearch2.length; i++){
            splitSearch2[i] = splitSearch2[i].replaceAll(' ', '');
            siblingObject = { [silbingKey]: splitSearch2[i] };
            console.log(siblingObject)
            siblingResultPlace = getUser3(siblingObject)
            siblingResult[i] = siblingResultPlace
        }
        console.log (siblingResult)
       

        Promise.all(siblingResult)
  .then((fulfilledResults) => {
    fulfilledResults.forEach((result) => {
        finalSiblingResults.push(result);
    });
    console.log(finalSiblingResults)
    console.log(finalSiblingResults[0][0].name)
    siblingResult = null



  })
  .catch((err) => {
    console.error(err);
  });


       
    }else{
        var siblingNumber = document.getElementById("siblingNumber")
        siblingNumber.innerHTML = ("0")

    }


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
    var familyTreeLabel = document.getElementById("familyTreeLabel")
    var sealFamilyTreeImage = document.getElementById("sealFamilyTreeImage")
    var sealName2 = document.getElementById("sealName2")

    

    modal.style.display = "block" //display profile
    resultDiv.style.display = "none" //hide images
    name.innerHTML = arrayResults[e.target.id].name //change name of seal
    id.innerHTML = arrayResults[e.target.id].sealid
    bleachID.innerHTML = arrayResults[e.target.id].sealid
    identifiers.innerHTML = arrayResults[e.target.id].identifiers
    sealFamilyTreeImage.src = arrayResults[e.target.id].image
    sealName2.innerHTML = arrayResults[e.target.id].name
    if (arrayResults[e.target.id].name !== null){
        familyTreeLabel.innerHTML = (arrayResults[e.target.id].name+"'s Family Tree")
    }else{
        familyTreeLabel.innerHTML = ("Family Tree")
        sealName2.innerHTML = ("No Name")
    }


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

function searchForKey(obj, targetKey, results = []) {
    if (typeof obj !== "object" || obj === null) {
      return results;
    }
  
    if (obj.hasOwnProperty(targetKey)) {
      results.push(obj[targetKey]);
    }
  
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        searchForKey(obj[key], targetKey, results);
      }
    }
  
    return results;
  }
  
  async function getUser2(jsonBody) {

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
        localStorage.motherResults = JSON.stringify(result)
        console.log(localStorage.motherResults)

    } catch (err) {
        console.log(err);
    }
}



async function getUser3(jsonBody) {
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
       const parsedResult0 = JSON.stringify(result)
       const parsedResult = JSON.parse(parsedResult0)
        
        return parsedResult;

    } catch (err) {
        console.log(err);
    }
}

function openFamilyTree() {
    location.href = "familyTree.html"
    console.log(finalSiblingResults)
    console.log(finalSiblingResults[0][0].name)
    localStorage.finalSiblings = JSON.stringify(finalSiblingResults)
   
  
  }

  
  

class FamilyTreeParent extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create the HTML structure for the custom element
      const container = document.createElement('div');
      container.className = 'familyTree2';
  
      const image = document.createElement('img');
      image.className = 'kaenaSeal';
      image.src = this.getAttribute('image');
      image.addEventListener('click', () => this.openFamilyTree());
  
      const name = document.createElement('p');
      name.textContent = this.getAttribute('name');
      name.addEventListener('click', () => this.openFamilyTree());
  
      const relation = document.createElement('p');
      relation.className = 'familyTreeRelation';
      relation.textContent = this.getAttribute('relation');
      relation.addEventListener('click', () => this.openFamilyTree());
  
      container.appendChild(image);
      container.appendChild(name);
      container.appendChild(relation);
  
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/mainStyle.css';
  
      shadow.appendChild(link);
      shadow.appendChild(container);
    }
  
    // Define the openFamilyTree method
    openFamilyTree() {
      // Add the logic to open the family tree
      console.log('Opening family tree...');
    }
  }



  customElements.define('family-tree-parent', FamilyTreeParent);