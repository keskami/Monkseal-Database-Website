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
            if (islands.value == "Hawaii"){
                keys[localStorage.i] = "hawaiisighting"
            }
            if (islands.value == "Oahu"){
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
      location.href = 'searchResults.html'
      localStorage.results = JSON.stringify(result)
      console.log(localStorage.results)
  
    } catch (err) {
      console.log(err);
    }
  
  
  
  }