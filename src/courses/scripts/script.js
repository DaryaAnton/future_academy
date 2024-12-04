import '@/assets/scripts/script';
import 'bootstrap/js/src/tab'

import { getData } from '../../assets/scripts/modules/getData';
import { renderCourses } from './modules/renderCourses';
import { filterCourses, monthFilters, monthFiltersWithPreposition } from './modules/filters';
import { errorTabs } from '../../assets/scripts/modules/error';
import { accordeonTabs } from './modules/accordeonTabs';

getData('/courses.json').then((data) => {

  let courses = data;
  let activeAge = 'kids';
  let filteredCourses = filterCourses(courses, activeAge);
  let currentCatId = null;
  const resetBtn = document.querySelectorAll('.tabs__btn.reset');
  const tabButtons = document.querySelectorAll('.nav-link');

  const filterButtons = document.querySelectorAll('.tabs__btn');

  const levelRadios = document.querySelectorAll('input[name="level"]');
  const typeRadios = document.querySelectorAll('input[name="type"]');
  const durationSlider = document.getElementById('months-slider');


  // Обработчики для табов
  const tabClickAge = (age) => {
    activeAge = age;
    filteredCourses = filterCourses(courses, activeAge);
    renderCourses(filteredCourses, activeAge);

    levelRadios.forEach(radio => {
      radio.checked = false;
    });
  
    typeRadios.forEach(radio => {
      radio.checked = false;
    });

    durationSlider.value = 24;
    const initialDuration = durationSlider.value;
    document.getElementById('months-value').innerText = `до ${initialDuration} ${monthFilters(initialDuration)}`;
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const targetTab = event.currentTarget;
  
      if (targetTab.matches('#pills-home-tab')) {
        tabClickAge('kids');
      } else if (targetTab.matches('#pills-profile-tab')) {
        tabClickAge('teenagers');
      } else if (targetTab.matches('#pills-contact-tab')) {
        tabClickAge('adult');
      }
    });
  });

  // Обработчики для кнопок фильтрации
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      currentCatId = parseInt(event.target.getAttribute('data-catId'), 10);
      
      filteredCourses = filterCourses(courses, activeAge, currentCatId);
      renderCourses(filteredCourses, activeAge);
      
      updateFilteredCourses();
    });
  });

  // Обработчики для радио-кнопок
  const updateFilteredCourses = () => {
    const selectedLevel = Array.from(levelRadios).find(radio => radio.checked)?.value || null;
    const selectedType = Array.from(typeRadios).find(radio => radio.checked)?.value || null;
    const selectedDuration = parseInt(durationSlider.value, 10);

    filteredCourses = filterCourses(courses, activeAge, currentCatId, selectedLevel, selectedType, selectedDuration);
    renderCourses(filteredCourses, activeAge);
  };

  levelRadios.forEach(radio => {
    radio.addEventListener('change', updateFilteredCourses);
  });

  typeRadios.forEach(radio => {
    radio.addEventListener('change', updateFilteredCourses);
  });

  durationSlider.addEventListener('input', () => {
    const durationValue = durationSlider.value;
    const monthsWord = monthFiltersWithPreposition(durationValue);
    document.getElementById('months-value').innerText = `до ${durationValue} ${monthsWord}`;
    updateFilteredCourses();
  });
  const initialDuration = durationSlider.value;
  document.getElementById('months-value').innerText = `до ${initialDuration} ${monthFiltersWithPreposition(initialDuration)}`;

  // reset
  resetBtn.forEach(reset => {
    reset.addEventListener('click', () => {
      currentCatId = null;
      filteredCourses = filterCourses(courses, activeAge);
      renderCourses(filteredCourses, activeAge);

      levelRadios.forEach(radio => {
        radio.checked = false;
      });

      typeRadios.forEach(radio => {
        radio.checked = false;
      });
        
      durationSlider.value = 24;
      const initialDuration = durationSlider.value;
      document.getElementById('months-value').innerText = `до ${initialDuration} ${monthFiltersWithPreposition(initialDuration)}`;
    });

    renderCourses(filteredCourses, activeAge);
  })
}).catch(error => {
      console.error('Ошибка при загрузке курсов:', error);
      errorTabs()
  });

  accordeonTabs()