export const accordeonTabs = () => {
	const accordeonElement = document.querySelector('.tabs-filter__accordion-title');

	accordeonElement.addEventListener('click', () => {
		const content = document.querySelector('.tabs-filter__accordion-content');

		if (content.style.display === 'none' || content.style.display === '') {
			content.style.display = 'block';
		} else {
			content.style.display = 'none';
		}
	});
}