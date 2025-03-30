// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
      mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
      });
    }
  });