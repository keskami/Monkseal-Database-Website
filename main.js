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