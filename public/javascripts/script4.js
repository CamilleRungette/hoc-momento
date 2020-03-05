

let trigger = document.getElementsByClassName("trigger");
let modal = document.getElementById("made-modal2")
let closeButton = document.getElementById("close-button")
let photo = document.getElementsByClassName('event-photo')
let id = document.getElementsByClassName('id')



for (i=0; i< trigger.length; i++){
  trigger[i].addEventListener("click", showModal )
}

closeButton.addEventListener("click", closeModal);
function closeModal(){
  modal.style.opacity = "0"
  modal.style.zIndex = "-1"
  modal.style.transitionDuration ="0.5s"
}

function showModal(src, id, name, link){
  console.log(link);
  

  photo[0].setAttribute("src", src)

  modal.style.opacity = "1";
  modal.style.zIndex = "1"
  modal.style.transitionDuration ="0.5s"
}