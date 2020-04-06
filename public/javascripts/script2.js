////////////////////////////////////////////////////:
////////////////Effet photo sur page equipe

let photo = document.getElementsByClassName('team-img')
let infos = document.getElementsByClassName('team-infos')

for (let i=0; i< photo.length; i++){
  infos[i].addEventListener('mouseover', function(){
    this.style.opacity = "1"
    this.style.transitionDuration = ".7s"
  })
}

for (let i=0; i< photo.length; i++){
  infos[i].addEventListener('mouseleave', function(){
    this.style.opacity = "0"
    this.parentNode.style.transitionDuration = ".7s"
  })
}

// for (let i=0; i< photo.length; i++){
//   photo[i].addEventListener('click', function(){
//     this.nextElementSibling.style.opacity = "1";
//     this.nextElementSibling.style.transitionDuration = ".8s"
//   })
// }

// for (let i=0; i< infos.length; i++){
//   console.log("hello");
  
//   infos[i].addEventListener('mouseleave', function(){
//     console.log("bye");
//     this.style.opacity = "0";
//     this.style.transitionDuration = ".8s"

//   })
// }