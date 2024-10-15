import { Splide } from '@splidejs/splide';

export const cardSlider = () => {

  const splide = new Splide('.splide', {
    pagination: false,
    arrows: false,
    perPage: 4,
    breakpoints: {
      992: {
        perPage: 3,
      },
      768: {
        perPage: 2,
      },
      576: {
        perPage: 1,
      },
    }
  });
  const bar = splide.root.querySelector('.my-carousel-progress-bar');

  splide.on('mounted move', function () {
    const end = splide.Components.Controller.getEnd() + 1;
    const rate = Math.min((splide.index + 1) / end, 1);
    bar.style.width = String(100 * rate) + '%';
  });

  splide.mount();
}