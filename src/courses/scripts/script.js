import '@/assets/scripts/script';
import 'bootstrap/js/src/tab'

import { getData } from '../../assets/scripts/modules/getData';
import { renderCourses } from '../../assets/scripts/modules/renderCourses';
import { filterCourses, monthFilters } from '../../assets/scripts/modules/filterCourses';
import { errorTabs } from '../../assets/scripts/modules/error';
import { accordeonTabs } from '../../assets/scripts/modules/accordeonTabs';

getData('/courses.json').then((data) => {
  let courses = data;
  let activeAge = 'kids';
  let filteredCourses = filterCourses(courses, activeAge);
  let currentCatId = null;
  const resetBtn = document.querySelectorAll('.tabs__btn.reset');

  renderCourses(filteredCourses, activeAge);

  // Обработчики для табов
  document.querySelector('#pills-home-tab').addEventListener('click', () => {
    activeAge = 'kids';
    filteredCourses = filterCourses(courses, activeAge);
    renderCourses(filteredCourses, activeAge);
  });

  document.querySelector('#pills-profile-tab').addEventListener('click', () => {
    activeAge = 'teenagers';
    filteredCourses = filterCourses(courses, activeAge);
    renderCourses(filteredCourses, activeAge);
  });

  document.querySelector('#pills-contact-tab').addEventListener('click', () => {
    activeAge = 'adult';
    filteredCourses = filterCourses(courses, activeAge);
    renderCourses(filteredCourses, activeAge);
  });

  // Обработчики для кнопок фильтрации
  const filterButtons = document.querySelectorAll('.tabs__btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      currentCatId = parseInt(event.target.getAttribute('data-catId'), 10);
      
      filteredCourses = filterCourses(courses, activeAge, currentCatId);
      renderCourses(filteredCourses, activeAge);
      
      updateFilteredCourses(); 
    });
  });

  // Обработчики для радио-кнопок
  const levelRadios = document.querySelectorAll('input[name="level"]');
  const typeRadios = document.querySelectorAll('input[name="type"]');
  const durationSlider = document.getElementById('months-slider');

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
    const monthsWord = monthFilters(durationValue);
    document.getElementById('months-value').innerText = `${durationValue} ${monthsWord}`;
    updateFilteredCourses();
  });
  const initialDuration = durationSlider.value;
  document.getElementById('months-value').innerText = `${initialDuration} ${monthFilters(initialDuration)}`;

  //reset
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
      document.getElementById('months-value').innerText = `${initialDuration} ${monthFilters(initialDuration)}`;
    });
  })
}).catch(error => {
      console.error('Ошибка при загрузке курсов:', error);
      errorTabs()
  });

  accordeonTabs()