

let trigger = document.getElementsByClassName("trigger");
let modal = document.getElementById("made-modal2")
let closeButton = document.getElementById("close-button")
let modalPhoto = document.getElementById("aaction-modal-photo")
let rest = document.getElementById('actions-list')

console.log(rest);


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
