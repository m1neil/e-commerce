// Підключення з node_modules
import * as noUiSlider from 'nouislider';

// Підключення стилів з scss/base/forms/range.scss 
// у файлі scss/forms/forms.scss

// Підключення стилів з node_modules
// import 'nouislider/dist/nouislider.css';

export function rangeInit() {
	const priceSlider = document.querySelector('#range');
	if (priceSlider) {
		noUiSlider.create(priceSlider, {
			start: [50, 200],
			tooltips: [
				wNumb({ decimals: 0, prefix: '$' }),
				wNumb({ decimals: 0, prefix: '$' })
			],
			connect: [false, true, false],
			margin: 23,
			range: {
				'min': 0,
				'max': 500
			},
		});
	}
}
rangeInit();
