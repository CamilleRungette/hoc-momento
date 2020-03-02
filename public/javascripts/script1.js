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

