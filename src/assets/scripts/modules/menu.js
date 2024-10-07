export const menu = () => {
  const body = document.querySelector('.page-body');
  const button = body.querySelector('.navbar-toggle');
  const navbar = body.querySelector('.navbar-collapse');

  button.addEventListener('click', () => {
    body.classList.toggle('page-body--lock');
    button.classList.toggle('active');
    navbar.classList.toggle('show');
  });
};
