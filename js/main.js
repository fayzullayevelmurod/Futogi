// burger
let header_burger = document.querySelector('.header_burger');
let header_burger_btn = document.querySelector('.header_burger_btn');
let header_menu = document.querySelector('.header_menu');

header_burger.addEventListener('click', () => {
  header_menu.classList.toggle('active');
  header_burger_btn.classList.toggle('active');
})
// burger

// footer_media
let footer_link_btn_one = document.querySelector('.footer_link_btn_one');
let list_links_one = document.querySelector('.list_links_one');
let list_links_two = document.querySelector('.list_links_two');
let footer_link_btn_two = document.querySelector('.footer_link_btn_two');
let footer_link_btn_one_icon = document.querySelector('.footer_link_btn_one img');
let footer_link_btn_two_icon = document.querySelector('.footer_link_btn_two img');

footer_link_btn_one.addEventListener('click', () => {
  list_links_one.classList.toggle('active');
  footer_link_btn_one_icon.classList.toggle('active');
});

footer_link_btn_two.addEventListener('click', () => {
  list_links_two.classList.toggle('active');
  footer_link_btn_two_icon.classList.toggle('active');
});
// footer_media


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