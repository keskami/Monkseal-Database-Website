let expandButtons = document.querySelectorAll('.circle');

expandButtons.forEach(expandButton => {
  expandButton.addEventListener('click', e => {
    let button = e.currentTarget;
    expandButtons.forEach(btn => btn !== button && btn.classList.remove('expanded'));
    button.classList.add('expanded');
  });
});