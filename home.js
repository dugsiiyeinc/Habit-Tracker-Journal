

const navList = document.querySelector(".nav-list");
const hamburgerMenu = document.querySelector(".hamburger-menu");

function toggleMenu() {
    navList.classList.toggle("expanded");

    // Change button text based on menu state and different icon state
    if (navList.classList.contains("expanded")) {
        hamburgerMenu.textContent = "X";
    } else {
        hamburgerMenu.textContent = "☰"; 
    }
}


