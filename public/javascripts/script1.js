// Nav bar dropdown menu

var icon = document.getElementById('icon');
var drop = document.getElementById('dropdown-menu');

console.log("OK");
icon.addEventListener('click', function(){
  if (drop.classList[1] === "close"){
    drop.style.display = "block"    
    drop.classList.remove("close")
    drop.classList.add("open")
  } else if (drop.classList[1] === "open"){
    drop.style.display = "none"    
    drop.classList.remove("open")
    drop.classList.add("close")
  }
})