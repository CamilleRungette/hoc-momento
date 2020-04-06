//////////////////////////////////////////////////////////////////
//////////// Show item in dashboard

let arrowDown = document.getElementsByClassName('increase'); 
let items = document.getElementsByClassName('items');
let arrowUp = document.getElementsByClassName('decrease');

for (i=0; i < arrowDown.length; i++){
  arrowDown[i].addEventListener("click", function(){
    this.parentNode.parentNode.classList.remove("action-item");
    this.nextElementSibling.style.opacity = "1";
    this.style.opacity = "0";
    this.style.display = "none";
  })
}


for (i=0; i < arrowUp.length; i++){
  arrowUp[i].addEventListener("click", function(){
    this.parentNode.parentNode.classList.add("action-item");
    this.previousElementSibling.style.display = "block";
    this.previousElementSibling.style.opacity = "1";
    this.style.opacity = "0";
  })
}