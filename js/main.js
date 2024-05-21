// burger
let header_burger = document.querySelector('.header_burger');
let header_burger_btn = document.querySelector('.header_burger_btn');
let header_menu = document.querySelector('.header_menu');

header_burger.addEventListener('click', () => {
  header_menu.classList.toggle('active');
  header_burger_btn.classList.toggle('active');
})
// burger


// home slider
let swiper = new Swiper(".homeSwiper", {
    spaceBetween: 20,
    centeredSlides: true,
    initialSlide: 1,
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".home-button-next",
        prevEl: ".home-button-prev",
    },
});
// home slider