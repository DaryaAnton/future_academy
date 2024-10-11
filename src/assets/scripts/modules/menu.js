export const menu = () => {
  const body = document.querySelector('.page-body');
  const button = body.querySelector('.navbar-toggle');
  const navbar = body.querySelector('.navbar-collapse');

  const dropdown = body.querySelector('#mobile-dropdown');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');

  button.addEventListener('click', () => {
    body.classList.toggle('page-body--lock');
    button.classList.toggle('active');
    navbar.classList.toggle('show');
  });

  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
    dropdownMenu.classList.toggle('show');
  });
};
