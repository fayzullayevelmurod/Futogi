
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