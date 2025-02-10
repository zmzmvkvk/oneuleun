document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.getElementById("hamburgerMenu");
  const navBar = document.getElementById("nav-wrap");

  hamburgerMenu.addEventListener("click", () => {
      navBar.classList.toggle("active");
  });
});
