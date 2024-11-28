import { monthFilters } from "./filterCourses";

export const renderCourses = (courses, activeAge) => {

  const tabKidsWrapper = document.querySelector('[data-age=kids]');
  const tabTeenagersWrapper = document.querySelector('[data-age=teenagers]');
  const tabAdultWrapper = document.querySelector('[data-age=adult]');

  tabKidsWrapper.innerHTML = '';
  tabTeenagersWrapper.innerHTML = '';
  tabAdultWrapper.innerHTML = '';


  const renderCard = courses.filter(course => course.age === activeAge);
  

  const backgroundClasses = [
    'event-list__bg_blue-light',
    'event-list__bg_orange-lighter',
    'event-list__bg_yellow',
    'event-list__bg_green',
    'event-list__bg_purple',
    'event-list__bg_sky',
    'event-list__bg_yellow-soft',
    'event-list__bg_pink',
    'event-list__bg_orange'
  ];
  
  if (renderCard.length === 0) {
    const noCoursesMessage = `<p class="text-center">Таких курсов пока нет.</p>`;
    
    if (activeAge === 'kids') {
      tabKidsWrapper.innerHTML = noCoursesMessage;
    } else if (activeAge === 'teenagers') {
      tabTeenagersWrapper.innerHTML = noCoursesMessage;
    } else if (activeAge === 'adult') {
      tabAdultWrapper.innerHTML = noCoursesMessage;
    }
    return;
  }

  renderCard.forEach((course, index) => {
    const bgClass = backgroundClasses[index % backgroundClasses.length];
    const monthsWord = monthFilters(course.duration);

    const courseElement = `
      <a href="${course.link}" data-catName="${course.categoryId}"
        class="card mb-2 me-1 pb-3 pt-2 ps-2 pe-2 ${bgClass}" style="flex: 1 0 48%; max-width: 100%;">
        <div class="card-body">
          <p class="event-list__tag">${course.tag}</p>

          <div class="d-flex align-items-center mb-2">
            <img class="me-2" src="${course.icon}" alt="phone">
            <h5 class="card-title">${course.title}</h5>
          </div>

          <p class="card-text event-list__tag">${course.description}</p>
          <p class="event-list__date">${course.duration} ${monthsWord}</p>
        </div>
      </a>
    `;
    

    if (activeAge === 'kids') {
      tabKidsWrapper.innerHTML += courseElement;
    } else if (activeAge === 'teenagers') {
      tabTeenagersWrapper.innerHTML += courseElement;
    } else if (activeAge === 'adult') {
      tabAdultWrapper.innerHTML += courseElement;
    }
  });
};