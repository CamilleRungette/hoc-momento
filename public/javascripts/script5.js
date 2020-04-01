// Adding article input in form

let plus = document.getElementById('addField');
let linkField = document.getElementById('linkField');

plus.addEventListener('click', function(){
  console.log("click");
  let bigDiv = document.createElement('div');  
    bigDiv.setAttribute('class', "col-12 d-flex link-div");

  let lilDiv1 = document.createElement('div')
    lilDiv1.setAttribute('class', "col-5")

  let input1 = document.createElement('input')
    input1.setAttribute('type', 'text');
    input1.setAttribute('class', 'made-form');
    input1.setAttribute('placeholder', "Nom de l'article");
    input1.setAttribute('name', 'nameLink');

  lilDiv1.appendChild(input1)

  let lilDiv2 = document.createElement('div')
    lilDiv2.setAttribute('class', "col-6")

  let input2 = document.createElement('input')
    input2.setAttribute('type', 'text');
    input2.setAttribute('class', 'made-form');
    input2.setAttribute('placeholder', "Lien");
    input2.setAttribute('name', 'link');

  lilDiv2.appendChild(input2)

    bigDiv.appendChild(lilDiv1)
    bigDiv.appendChild(lilDiv2)

  linkField.insertBefore(bigDiv, linkField.firstElementChild )
})

// Showing the legend in action form

let questionMark = document.getElementById('questionMark')
let legend = document.getElementById('legend')

questionMark.addEventListener('click', function(){
  if (legend.classList[1] === "close"){
    legend.style.opacity = "1";
    legend.style.zIndex = "2";
    legend.classList.remove("close")
    legend.classList.add("open")    
  } else {
    legend.style.opacity = "0";
    legend.style.zIndex = "-1";
    legend.classList.remove("open")
    legend.classList.add("close")  
  }
})