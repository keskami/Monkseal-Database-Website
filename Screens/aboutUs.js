let expandButtons = document.querySelectorAll('.circle');
let blueArea = document.getElementsByClassName("blueArea")
var body = document.getElementById("body")
var content = document.getElementsByClassName("numCirc")

body.addEventListener('click', function (event) {
    var count = 0
    for (i = 0; i < 6; i++) {
        check = !expandButtons[i].contains(event.target)
        if (check == true) {
            console.log("outside")
            count++
        }
        if (count == 6) {
            for (i = 0; i < expandButtons.length; i++) {
                expandButtons[i].classList.remove('expanded');
                blueArea[i].style.display = "block";
                expandButtons[i].style.transform = ''
                content[i].textContent = i + 1
            };
        }
    }
})
expandButtons.forEach(expandButton => {
    expandButton.addEventListener('click', e => {
        let button = e.currentTarget;
        button.classList.add('expanded');
        var selected = expandButtons[button.textContent - 1]

        for (i = 0; i < expandButtons.length; i++) {
            if (expandButtons[i] !== button) {
                expandButtons[i].classList.remove('expanded');
                blueArea[i].style.display = "block";
                expandButtons[i].style.transform = ''
                content[i].textContent = i + 1
            }
        };
        blueArea[button.textContent - 1].style.display = "none"

        if (button.textContent == 1) {
            content[button.textContent - 1].textContent = "Spot the Monkseal"
        }
        if (button.textContent == 2) {
            content[button.textContent - 1].textContent = "Observe 50ft Away!"
        }
        if (button.textContent == 3) {
            content[button.textContent - 1].textContent = "Take Note of Seal Characteristics"
        }
        if (button.textContent == 4) {
            content[button.textContent - 1].textContent = "Go To Our 'Find A Seal' Page"
        }
        if (button.textContent == 5) {
            content[button.textContent - 1].textContent = "Fill Out The Questionaire"
        }
        if (button.textContent == 6) {
            content[button.textContent - 1].textContent = "Find Your Seal!"
        }



        var offsetTop = selected.offsetTop
        var offsetLeft = selected.offsetLeft
        selected.style.transform = "translate(-" + (offsetLeft) + "px,-" + (offsetTop) + "px)"
    });
});