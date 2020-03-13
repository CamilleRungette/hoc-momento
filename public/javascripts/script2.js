console.log("hello");

var img1 = document.getElementById('team-img0')
var img2 = document.getElementById('team-img1')
var img3 = document.getElementById('team-img2')
var card1 = document.getElementById('team-card0')
var card2 = document.getElementById('team-card1')
var card3 = document.getElementById('team-card2')

card1.addEventListener("click", getBigger1);
function getBigger1(){
  img1.style.height = "150%"
  card2.style.width = "25%"
  card3.style.width ="25%"
  img2.style.height = "75%"
  img3.style.height = "75%"
  img1.nextElementSibling.style.opacity = "1";
  img1.nextElementSibling.style.zIndex = "0";


  img1.style.transitionDuration = ".8s"
  img2.style.transitionDuration = ".7s"
  card2.style.transitionDuration = ".7s"
  card3.style.transitionDuration = ".7s"
  img3.style.transitionDuration = ".7s"
}

card1.addEventListener("mouseleave", getSmaller1);
function getSmaller1(){ 
  img1.style.height="100%"
  card2.style.width = "30%"
  card3.style.width ="30%"
  img2.style.height = "100%"
  img3.style.height = "100%"
  img1.nextElementSibling.style.opacity = "0";
  img1.nextElementSibling.style.zIndex = "-1";
}

card2.addEventListener("click", getBigger2);
function getBigger2(){
  img2.style.height = "150%"
  card1.style.width = "25%"
  card3.style.width ="25%"
  img1.style.height = "75%"
  img3.style.height = "75%"
  img2.nextElementSibling.style.opacity = "1";
  img2.nextElementSibling.style.zIndex = "0";
  

  img2.style.transitionDuration = ".8s"
  img1.style.transitionDuration = ".7s"
  card2.style.transitionDuration = ".7s"
  card3.style.transitionDuration = ".7s"
  img3.style.transitionDuration = ".7s"
}

card2.addEventListener("mouseleave", getSmaller2);
function getSmaller2(){
  img2.style.height="100%"
  card1.style.width = "30%"
  card3.style.width ="30%"
  img1.style.height = "100%"
  img3.style.height = "100%"
  img2.nextElementSibling.style.opacity = "0";
  img2.nextElementSibling.style.zIndex = "-1";

}

img3.addEventListener("mouseover", getBigger3);
function getBigger3(){
  img3.style.height = "150%"
  card1.style.width = "25%"
  card2.style.width ="25%"
  img1.style.height = "75%"
  img2.style.height = "75%"

  img3.style.transitionDuration = ".8s"
  img1.style.transitionDuration = ".7s"
  card2.style.transitionDuration = ".7s"
  card1.style.transitionDuration = ".7s"
  img2.style.transitionDuration = ".7s"
}

img3.addEventListener("mouseout", getSmaller3);
function getSmaller3(){
  img3.style.height="100%"
  card1.style.width = "30%"
  card2.style.width ="30%"
  img1.style.height = "100%"
  img2.style.height = "100%"
}

let photo = document.getElementsByClassName('team-img')

// for (let i=0; i< photo.length; i++){
//   photo[i].addEventListener('click', function(){
//     this.nextElementSibling.style.opacity = "1";
//     this.nextElementSibling.style.zIndex = "0";
//   })
// }