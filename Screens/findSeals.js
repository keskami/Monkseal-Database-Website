let productButtons = document.querySelectorAll('button.btn');

productButtons.forEach(productButton => {
  productButton.addEventListener('click', e => {
    let button = e.currentTarget;
    productButtons.forEach(btn => btn !== button && btn.classList.remove('selected'));
    button.classList.toggle('selected');
  });
});