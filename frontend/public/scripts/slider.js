let swiper = new Swiper(".swiper-container", {
    speed:800,
    slidesPerView: 3,
    spaceBetween: 50,
    loop: true,
    autoplay: {
         // مدت زمان (بر حسب میلی‌ثانیه) بین انتقال اسلایدها (3 ثانیه)
        disableOnInteraction: false, // ادامه Autoplay پس از تعامل کاربر
      },
    breakpoints: {  
        0: {
          slidesPerView: 1,
          spaceBetween: 14,},
        768: {
          slidesPerView: 2,
          spaceBetween: 20, },
        1024: {
        slidesPerView: 3,
        spaceBetween: 20, },
      },
  });