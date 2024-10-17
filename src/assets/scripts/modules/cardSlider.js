import { Splide } from '@splidejs/splide';

export const cardSlider = () => {
  const sliders = document.querySelectorAll('.splide');

  sliders.forEach((slider) => {
    const attributeSplide = JSON.parse(slider.getAttribute('data-splide'));

    const splide = new Splide(slider, {
      pagination: false,
      arrows: false,
      gap: '15px',
      ...attributeSplide,
    });

    const bar = slider.querySelector('.my-carousel-progress-bar');

    // if (bar) {
      splide.on('mounted move', function () {
        const end = splide.Components.Controller.getEnd() + 1;
        const rate = Math.min((splide.index + 1) / end, 1);
        bar.style.width = String(100 * rate) + '%';
      });
    // }

    splide.mount();
  });
}