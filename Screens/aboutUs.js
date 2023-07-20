let expandButtons = document.querySelectorAll('.circle');
let blueArea = document.getElementsByClassName("blueArea")
var body = document.getElementById("body")

expandButtons.forEach(expandButton => {
    expandButton.addEventListener('click', e => {
        let button = e.currentTarget;
        button.classList.add('expanded');
        var selected = document.querySelector(".expanded")

        for (i = 0; i < expandButtons.length; i++) {
            if (expandButtons[i] !== button) {
                expandButtons[i].classList.remove('expanded');
                blueArea[i].style.display = "block";
                selected.style.transform = ''
            }
        };
        body.addEventListener('wheel', preventScroll, { passive: false });
        blueArea[button.textContent - 1].style.display = "none"

        var offsetTop = selected.offsetTop
        var offsetLeft = selected.offsetLeft
        selected.style.transform = "translate(-" + (offsetLeft) + "px,-" + (offsetTop) + "px)"
    });
});