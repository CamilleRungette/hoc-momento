
//===================================================== //

let gallery = document.getElementById('gallery-button')
let modal = document.getElementById('aaction-modal')
let close = document.getElementById('close-icon')

gallery.addEventListener('click', function(){
  modal.style.transitionDuration = ".7s"
  modal.style.zIndex = "2"
  modal.style.opacity = "1"
})

close.addEventListener('click', function(){
  modal.style.transitionDuration = ".7s"
  modal.style.zIndex = "-1"
  modal.style.opacity = "0"
})


$(document).ready(function(){
  $('.carroussel').bxSlider({
   infiniteLoop: true,
   hideControlOnEnd: true
 });
 });