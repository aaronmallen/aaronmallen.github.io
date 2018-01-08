function toggleNav() {
  var sidenav = document.getElementById('sidenav');
  var main    = document.getElementById('sidenavTarget');
  if (sidenav.classList.contains('-closed')) {
    main.classList.add('-sidenavOpen');
    sidenav.classList.replace('-closed', '-open');
  } else {
    main.classList.remove('-sidenavOpen');
    sidenav.classList.replace('-open', '-closed');
  }
}
