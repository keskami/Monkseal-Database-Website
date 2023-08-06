function myFunction() {
  var x = document.getElementById("verticalMenu");
  if (x.style.height === "350px") {
    x.style.opacity = "0";
    x.style.height = "0";

  } else {
    x.style.opacity = "1";
    x.style.height = "350px";

  }
}

function factOpen(type) {
  var circle = document.getElementById(type + "Fact")
  var modal = document.getElementById(type + "Modal")
  var body = document.getElementById("body")

  body.addEventListener('wheel', preventScroll);

  var offsetTop = circle.offsetTop
  var offsetLeft = circle.offsetLeft
  var scrollTop = window.scrollY
  var distanceTop = offsetTop - scrollTop
  circle.style.transform = "translate(-" + (offsetLeft - 20) + "px,-" + (distanceTop - 20) + "px)"
  modal.style.transitionDelay = '0.6s'
  modal.style.height = "100%"
  circle.addEventListener('transitionend', function () {
    circle.style.transitionDelay = '0.5s'
    circle.style.transform = ''
  });
}

function returnFact(type) {
  var circle = document.getElementById(type + "Fact")
  var modal = document.getElementById(type + "Modal")
  var body = document.getElementById("body")

  body.removeEventListener('wheel', preventScroll);

  modal.style.transitionDelay = ''
  modal.style.height = "0"
  circle.style.transitionDelay = '0s'
}



function preventScroll(e) {
  e.preventDefault();
  e.stopPropagation();

  return false;
}

function fullscreen() {
  document.getElementById("iframe").className = "fullScreen"
  document.getElementById("compressBtn").style.display = "block"
  document.getElementById("expandBtn").style.display = "none"
}

function compressScreen() {
  document.getElementById("iframe").classList.remove("fullScreen")
  document.getElementById("expandBtn").style.display = "block"
  document.getElementById("compressBtn").style.display = "none"
}



