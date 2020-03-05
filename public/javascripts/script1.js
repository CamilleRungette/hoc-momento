//Homepage picture

$(document).ready(function(){
  $('.firstpage').click(function(){
    console.log("hello")
    $('.firstpage').fadeOut(1500)
    $('.index-carroussel').css('height', '105vh')
  })
}) 

/////////////////////////////////////////////////////////////////////////////:
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

////////////////////////////////////////////////////////////////////
// Modal from cultural-action

let trigger = document.getElementsByClassName("trigger");
let trigger1 = document.getElementsByClassName("trigger2")
let modal = document.getElementById("made-modal")
let closeButton = document.getElementById("close-button")
let modalPhoto = document.getElementById("aaction-modal-photo")

console.log(trigger1);


for (i=0; i< trigger.length; i++){
  trigger[i].addEventListener("click", function(){
    let src = this.getAttribute("src")
      showModal(src)
  } )
}

function showModal(src){  
  modal.style.opacity = "1";
  modal.style.zIndex = "1"
  modal.style.transitionDuration ="0.5s"
  modalPhoto.setAttribute('src', src)
}

closeButton.addEventListener("click", closeModal);
function closeModal(){
  modal.style.opacity = "0"
  modal.style.zIndex = "-1"
  modal.style.transitionDuration ="0.5s"
}

// modal.addEventListener("click", thisClose);
// function thisClose(){
//   this.style.opacity = "0"
//   this.style.zIndex = "-1"
//   this.style.transitionDuration ="0.5s"
// }
