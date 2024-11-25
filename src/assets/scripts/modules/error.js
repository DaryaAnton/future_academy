export const errorTabs = () => {
  const errorImage = `<img src="/images/error/error.svg" alt="error" style="width: 42%;">`;
  const tabKidsWrapper = document.querySelector('[data-age=kids]');
  const tabTeenagersWrapper = document.querySelector('[data-age=teenagers]');
  const tabAdultWrapper = document.querySelector('[data-age=adult]');

  tabKidsWrapper.classList.remove('justify-content-between');
  tabKidsWrapper.classList.add('justify-content-center');
  
  tabTeenagersWrapper.classList.remove('justify-content-between');
  tabTeenagersWrapper.classList.add('justify-content-center');
  
  tabAdultWrapper.classList.remove('justify-content-between');
  tabAdultWrapper.classList.add('justify-content-center');

  tabKidsWrapper.innerHTML = errorImage;
  tabTeenagersWrapper.innerHTML = errorImage;
  tabAdultWrapper.innerHTML = errorImage;
}