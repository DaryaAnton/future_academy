export const filterCourses = (courses, activeAge, catId = null, level = null, type = null, duration = null) => {

  let filteredCourses = courses.filter(course => course.age === activeAge);

  if (catId !== null) {
    filteredCourses = filteredCourses.filter(course => course.categoryId === catId);
  }
  
  if (level && level !== 'Любой') {
    filteredCourses = filteredCourses.filter(course => course.level === level);
  }
  
  if (type && type !== 'Любой') {
    filteredCourses = filteredCourses.filter(course => course.type === type);
  }
  
  if (duration) {
    filteredCourses = filteredCourses.filter(course => course.duration <= duration);
  }
  
  return filteredCourses;
};

export const monthFilters = (count) => {
  const lastNum = count % 10;
  const lastTwoNum = count % 100;

  if (lastNum === 1 && lastTwoNum !== 11) {
      return 'месяц';
  } else if (lastNum >= 2 && lastNum <= 4 && (lastTwoNum < 12 || lastTwoNum > 14)) {
      return 'месяца';
  } else {
      return 'месяцев';
  }
}