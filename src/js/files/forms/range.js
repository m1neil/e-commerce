// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss 
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSlider = document.querySelector('#range');
	const min = priceSlider.dataset.rangeMin ? parseFloat(priceSlider.dataset.rangeMin) : 0
	const max = priceSlider.dataset.rangeMax ? parseFloat(priceSlider.dataset.rangeMax) : 500
	const prefix = priceSlider.dataset.rangePrefix ? priceSlider.dataset.rangePrefix : '$'
	const optionsStart = priceSlider.dataset.rangeStart.split(',')
	const startFirstHandle = optionsStart[0] ? parseFloat(optionsStart[0]) : 50
	const startSecondHandle = optionsStart[1] ? parseFloat(optionsStart[1]) : 200

	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [startFirstHandle, startSecondHandle],
			tooltips: [
				wNumb({ decimals: 0, prefix }),
				wNumb({ decimals: 0, prefix })
			],
			connect: [false, true, false],
			// margin: 40,
			range: { min, max },
		});
	}
}
rangeInit();
