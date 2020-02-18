console.log("hello")

$(document).ready(function(){
  $('.firstpage').click(function(){
    console.log("hello")
    $('.firstpage').fadeOut(3000)
    $('.index-carroussel').css('height', '105vh')
  })
}) 