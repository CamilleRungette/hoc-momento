console.log("hello");

var img1 = document.getElementById('team-img0')
var img2 = document.getElementById('team-img1')
var img3 = document.getElementById('team-img2')
var card1 = document.getElementById('team-card0')
var card2 = document.getElementById('team-card1')
var card3 = document.getElementById('team-card2')

console.log(card1);

img1.addEventListener("mouseover", getBigger1);
function getBigger1(){
  img1.style.height = "150%"
  card2.style.width = "25%"
  card3.style.width ="25%"
  img2.style.height = "75%"
  img3.style.height = "75%"

  img1.style.transitionDuration = ".8s"
  img2.style.transitionDuration = ".5s"
  card2.style.transitionDuration = ".5s"
  card3.style.transitionDuration = ".5s"
  img3.style.transitionDuration = ".5s"
}

img1.addEventListener("mouseout", getSmaller1);
function getSmaller1(){
  img1.style.height="100%"
  card2.style.width = "30%"
  card3.style.width ="30%"
  img2.style.height = "100%"
  img3.style.height = "100%"
}

img2.addEventListener("mouseover", getBigger2);
function getBigger2(){
  img2.style.height = "150%"
  card1.style.width = "25%"
  card3.style.width ="25%"
  img1.style.height = "75%"
  img3.style.height = "75%"

  img2.style.transitionDuration = ".8s"
  img1.style.transitionDuration = ".5s"
  card2.style.transitionDuration = ".5s"
  card3.style.transitionDuration = ".5s"
  img3.style.transitionDuration = ".5s"
}

img2.addEventListener("mouseout", getSmaller2);
function getSmaller2(){
  img2.style.height="100%"
  card1.style.width = "30%"
  card3.style.width ="30%"
  img1.style.height = "100%"
  img3.style.height = "100%"
}

img3.addEventListener("mouseover", getBigger3);
function getBigger3(){
  img3.style.height = "150%"
  card1.style.width = "25%"
  card2.style.width ="25%"
  img1.style.height = "75%"
  img2.style.height = "75%"

  img3.style.transitionDuration = ".8s"
  img1.style.transitionDuration = ".5s"
  card2.style.transitionDuration = ".5s"
  card1.style.transitionDuration = ".5s"
  img2.style.transitionDuration = ".5s"
}

img3.addEventListener("mouseout", getSmaller3);
function getSmaller3(){
  img3.style.height="100%"
  card1.style.width = "30%"
  card2.style.width ="30%"
  img1.style.height = "100%"
  img2.style.height = "100%"
}