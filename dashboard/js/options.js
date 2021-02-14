import locations from "./locations.js";

const loadOptions = () => {
		const selectElements = document.querySelectorAll('select.location');

	selectElements.forEach(element => {
		for(let location of locations) {
			const option = document.createElement('option');
			option.value = location.toLowerCase();
			option.textContent = location;
			element.appendChild(option);
		}
	});
};

export default loadOptions();