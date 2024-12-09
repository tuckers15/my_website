function loadNavbar() {
  fetch("components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the navbar:", error));
}

function loadTitelCard() {
  fetch("components/titlecard.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("titlecard").innerHTML = data;
    })
    .catch((error) => console.error("Error loading the navbar:", error));
}

loadNavbar();
loadTitelCard();
