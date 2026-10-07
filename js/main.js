//Seleccionar elementos por su id
const btnMenu = document.getElementById("btn-menu");
const menuNav = document.getElementById("menu-nav");

btnMenu.addEventListener ( "click", () => {
menuNav.classList.toggle("hidden");
menuNav.classList.toggle("flex");
});