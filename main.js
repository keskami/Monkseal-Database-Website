function myFunction() {
    var x = document.getElementById("verticalMenu");
    if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
      x.style.opacity = "0";
      x.style.height = "0";
    } else {
      x.style.visibility = "visible";
      x.style.opacity = "1";
      x.style.height = "350px";
    }
  }

function fullscreen() {
  document.getElementById("iframe").className = "fullScreen"
  document.getElementById("compressBtn").style.display = "block"
  document.getElementById("expandBtn").style.display = "none"
}

function compressScreen(){
  document.getElementById("iframe").classList.remove("fullScreen")
  document.getElementById("expandBtn").style.display = "block"
  document.getElementById("compressBtn").style.display = "none"
}