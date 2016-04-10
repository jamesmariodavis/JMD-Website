// functions for main dropclick menu
function dropclickToggle() {
    document.getElementById("mainDropclick").classList.toggle("w3-show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropclick-button')) {

    var dropclicks = document.getElementsByClassName("dropclick-content");
    var i;
    for (i = 0; i < dropclicks.length; i++) {
      var openDropclick = dropclicks[i];
      if (openDropclick.classList.contains('show')) {
        openDropclick.classList.remove('show');
      }
    }
  }
}