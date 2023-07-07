function myFunction() {
    var x = document.getElementById("verticalMenu");
    if (x.style.visibility === "visible") {
      x.style.visibility = "hidden";
      x.style.opacity = "0";
      x.style.maxHeight = "0";
    
    } else {
      x.style.visibility = "visible";
      x.style.opacity = "1";
      x.style.maxHeight = "350px";
      
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

function openFamilyTree() {
  location.href = "familyTree.html"
}

// Define the Custom Element class
class FamilyTreeParent extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    // Create the HTML structure for the custom element
    const container = document.createElement('div');
    container.className = 'familyTree2';

    const image = document.createElement('img');
    image.className = 'kaenaSeal';
    image.src = this.getAttribute('image');
    image.addEventListener('click', () => this.openFamilyTree());

    const name = document.createElement('p');
    name.textContent = this.getAttribute('name');
    name.addEventListener('click', () => this.openFamilyTree());

    const relation = document.createElement('p');
    relation.className = 'familyTreeRelation';
    relation.textContent = this.getAttribute('relation');
    relation.addEventListener('click', () => this.openFamilyTree());

    container.appendChild(image);
    container.appendChild(name);
    container.appendChild(relation);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/mainStyle.css';

    shadow.appendChild(link);
    shadow.appendChild(container);
  }

  // Define the openFamilyTree method
  openFamilyTree() {
    // Add the logic to open the family tree
    console.log('Opening family tree...');
  }
}

// Register the custom element
customElements.define('family-tree-parent', FamilyTreeParent);
