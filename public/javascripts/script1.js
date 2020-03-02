console.log("hello")

//Homepage picture

$(document).ready(function(){
  $('.firstpage').click(function(){
    console.log("hello")
    $('.firstpage').fadeOut(1500)
    $('.index-carroussel').css('height', '105vh')
  })
}) 


// Small carrousel from cultural-action

let photos = document.getElementsByClassName("aaction-photo");
let parent = document.getElementById("aaction-photos")
let buttonLeft = document.getElementById("aaction-left-arrow")
let buttonRight = document.getElementById("aaction-right-arrow")

buttonLeft.addEventListener("click", changeIndexRight);
function changeIndexRight(){
  console.log("coucou");
  let movingPhoto = photos[photos.length-1]
  parent.insertBefore(movingPhoto, photos[0])  
}

buttonRight.addEventListener("click", changeIndexLeft);
function changeIndexLeft(){
  console.log("coucou");
  let movingPhoto = photos[0]
  parent.insertBefore(movingPhoto, photos[photos.length-1])
}



// let cards = document.getElementsByClassName("col-md-4")
// let parent = document.getElementsByClassName("row")[1]
// let bouton = document.querySelector("main").querySelectorAll("a")[1]

// bouton.addEventListener("click", changeIndexCard);
// function changeIndexCard(){
// let movingCard = cards[cards.length-1]
// parent.insertBefore(movingCard, cards[0])
// }
