function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Move this outside the function so it runs when the page loads
let lastScrollTop = 0;
const desktopNav = document.getElementById('desktop-nav');
const hamburgerNav = document.getElementById('hamburger-nav');
const scrollThreshold = 100;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down - hide both navbars
            desktopNav.classList.add('navbar-hidden');
            hamburgerNav.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show both navbars
            desktopNav.classList.remove('navbar-hidden');
            hamburgerNav.classList.remove('navbar-hidden');
        }
        lastScrollTop = scrollTop;
    }
});