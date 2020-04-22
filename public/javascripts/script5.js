////////////////////////////////////////////////////////////////
///////// Adding article in form

let plus = document.getElementById('addField');
let linkField = document.getElementById('linkField');

plus.addEventListener('click', function(){
  console.log("click");
  let bigDiv = document.createElement('div');  
    bigDiv.setAttribute('class', "hundred form-flex link-div");

// Selection div :
  let lilDiv3 =  document.createElement('div')
    lilDiv3.setAttribute('class', "ten")

  let selectDiv = document.createElement('select');
    selectDiv.setAttribute('name', "type");
  let optionPdf = document.createElement('option');
    optionPdf.setAttribute('value', 'pdf');
    optionPdf.textContent = "PDF";
  selectDiv.appendChild(optionPdf);

  let optionArticle = document.createElement('option');
    optionArticle.setAttribute('value', 'article');
    optionArticle.textContent = "Article";
  selectDiv.appendChild(optionArticle); 
  
  let optionVideo = document.createElement('option');
    optionVideo.setAttribute('value', 'video');
    optionVideo.textContent = "Vidéo";
  selectDiv.appendChild(optionVideo);

  lilDiv3.appendChild(selectDiv)

// Name of the link input
  let lilDiv1 = document.createElement('div')
    lilDiv1.setAttribute('class', "INPUT-30")

  let input1 = document.createElement('input')
    input1.setAttribute('type', 'text');
    input1.setAttribute('class', 'made-form input-dashboard');
    input1.setAttribute('placeholder', "Nom de l'article");
    input1.setAttribute('name', 'nameLink');

  lilDiv1.appendChild(input1)

// Link input
  let lilDiv2 = document.createElement('div')
    lilDiv2.setAttribute('class', "input-50")

  let input2 = document.createElement('input')
    input2.setAttribute('type', 'text');
    input2.setAttribute('class', 'made-form input-dashboard');
    input2.setAttribute('placeholder', "Lien");
    input2.setAttribute('name', 'link');

  lilDiv2.appendChild(input2)

    bigDiv.appendChild(lilDiv3);
    bigDiv.appendChild(lilDiv1);
    bigDiv.appendChild(lilDiv2);
    
  linkField.insertBefore(bigDiv, linkField.childNodes[3] )
})

///////////////////////////////////////////////////////////////
///////////// Showing the legend in action form

let questionMark = document.getElementById('questionMark')
if (questionMark){
let legend = document.getElementById('legend')

questionMark.addEventListener('click', function(){
  if (legend.classList[1] === "close"){
    legend.style.opacity = "1";
    legend.style.zIndex = "2";
    legend.style.display = "block"
    legend.classList.remove("close")
    legend.classList.add("open")    
  } else {
    legend.style.opacity = "0";
    legend.style.zIndex = "-1";
    legend.classList.remove("open")
    legend.classList.add("close")  
  }
})
}

//////////////////////////////////////////////////////////////////
//////////// Adding period input in show form

let plusPeriod = document.getElementById('addPeriodField');
let periodField = document.getElementById('periodField');
let placeField = document.getElementById('placeField');
let cityField = document.getElementById('cityField');

if (plusPeriod){
  plusPeriod.addEventListener('click', function(){
    let bigDiv = document.createElement('div');  

    let input1 = document.createElement('input')
      input1.setAttribute('type', 'text');
      input1.setAttribute('class', 'made-form input-dashboard');
      input1.setAttribute('placeholder', "Septembre - Février 2020 ...");
      input1.setAttribute('name', 'period');

    bigDiv.appendChild(input1)
    periodField.insertBefore(bigDiv, periodField.firstElementChild)

    console.log("NOUVELLE PERIODE");

    let bigDiv1 = document.createElement('span');  
     
    let input2 = document.createElement('input')
      input2.setAttribute('type', 'text');
      input2.setAttribute('class', 'made-form input-dashboard');
      input2.setAttribute('placeholder', "Acc.mie Fratellini ...");
      input2.setAttribute('name', 'place');

    bigDiv1.appendChild(input2)
    placeField.insertBefore(bigDiv1, placeField.firstElementChild)


    let bigDiv2 = document.createElement('span')

    let input3 = document.createElement('input')
      input3.setAttribute('type', 'text');
      input3.setAttribute('class', 'made-form input-dashboard');
      input3.setAttribute('placeholder', "Saint-Denis, ...");
      input3.setAttribute('name', 'city');

    bigDiv2.appendChild(input3)
    cityField.insertBefore(bigDiv2, cityField.firstElementChild )
  })
}

//////////////////////////////////////////////////////////////////
//////////// Deleting a performance

let minus = document.getElementsByClassName('delete-perf');

for (let i=0; i< minus.length; i++){
  minus[i].addEventListener('click', function(){
    let period = this.parentNode.getAttribute("data-period");  
    let place = this.parentNode.getAttribute("data-place");
    let city = this.parentNode.getAttribute("data-city");

    let inputPeriod = document.createElement('input');
      inputPeriod.setAttribute('type', 'hidden');
      inputPeriod.setAttribute('value', period);
      inputPeriod.setAttribute('name', 'deletePeriod');
    let inputPlace = document.createElement('input');
      inputPlace.setAttribute('type', 'hidden');
      inputPlace.setAttribute('value', place);
      inputPlace.setAttribute('name', 'deletePlace');
    let inputCity = document.createElement('input');
      inputCity.setAttribute('type', 'hidden');
      inputCity.setAttribute('value', city);
      inputCity.setAttribute('name', 'deleteCity');

    this.parentNode.parentNode.appendChild(inputPeriod)
    this.parentNode.parentNode.appendChild(inputCity)
    this.parentNode.parentNode.appendChild(inputPlace)
    
    this.parentNode.remove()
  })
}

//////////////////////////////////////////////////////////////////
//////////// Deleting a link

let minusLink = document.getElementsByClassName('delete-link');
let bigDiv = document.getElementsByClassName('inputDiv');

for (let i=0; i<minusLink.length; i++){
  minusLink[i].addEventListener('click', function(){
    let link = this.previousElementSibling.getAttribute('data-link');
    
    let input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('value', link);
      input.setAttribute('name', 'deleteLink');

    this.parentNode.remove()

    bigDiv[i].appendChild(input);
    console.log(bigDiv[i]);
  })
}
