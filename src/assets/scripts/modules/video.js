export const video = () => {
  const video = document.querySelector('.video');
  const videoBg = video.querySelector('.video__bg');
  const videoPlayer = video.querySelector('.video__player');
  const playButton = video.querySelector('.video__button');

  playButton.addEventListener('click', () => {
    playButton.style.display = 'none';
    videoBg.style.display = 'none';

    videoPlayer.play();
    videoPlayer.controls = true;
    videoPlayer.muted = false;
    videoPlayer.volume = 0.2;
  });
};
