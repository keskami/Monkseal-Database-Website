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
    var arrow =  document.getElementById("expandIcon")
    var scarBtns = document.getElementById("scarDropdown")
    if (arrow.style.rotate == "90deg"){
        arrow.style.rotate = "0deg"
        scarBtns.style.display = "none"
    }
    else{
        arrow.style.rotate = "90deg"
        scarBtns.style.display = "block"
    }
    
    

}

function bleachOpen() {
    var arrow =  document.getElementById("expandIcon2")
    var scarBtns = document.getElementById("bleachDropdown")
    if (arrow.style.rotate == "90deg"){
        arrow.style.rotate = "0deg"
        scarBtns.style.display = "none"
    }
    else{
        arrow.style.rotate = "90deg"
        scarBtns.style.display = "block"
    }
    
    

}