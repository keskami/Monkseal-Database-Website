var modal = document.getElementById("filterModal")

var btn = document.getElementById("filterButton")

var closeBtn = document.getElementById("close")

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


    islands.value = ""
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