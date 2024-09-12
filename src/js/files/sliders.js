/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Navigation, Thumbs, FreeMode } from 'swiper/modules';
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
// import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.swiper')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.reviews__slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation],
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 16,
			initialSlide: 0,
			speed: 800,
			grabCursor: true,
			autoHeight: true,
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/

			// Кнопки "вліво/вправо"
			navigation: {
				prevEl: '.block-header__button--prev',
				nextEl: '.block-header__button--next',
			},
			// Брейкпоінти
			breakpoints: {
				630: {
					slidesPerView: 2,
					autoHeight: false,
				},
				991.98: {
					slidesPerView: 3,
					spaceBetween: 20,
					autoHeight: false,
				},
			},
			// Події
			on: {

			}
		})
	}

	if (document.querySelector('.main-slider') && document.querySelector('.sub-slider')) {


		const subSlider = new Swiper('.sub-slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, FreeMode],
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 14,
			speed: 600,
			autoHeight: true,
			direction: "vertical",
			freeMode: {
				enabled: true,
				momentum: false,
				momentumBounce: false,
				momentumBounceRatio: 0,
				momentumRatio: 0,
				momentumVelocityRatio: 0,
				sticky: true,
			},

			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/
			// Брейкпоінти
			breakpoints: {
				// 630: {
				// 	slidesPerView: 2,
				// 	autoHeight: false,
				// },
				// 991.98: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// 	autoHeight: false,
				// },
			},
		})

		const mainSlider = new Swiper('.main-slider', { // Вказуємо склас потрібного слайдера
			// Підключаємо модулі слайдера
			// для конкретного випадку
			modules: [Navigation, Thumbs],
			slidesPerView: 1,
			slidesPerGroup: 1,
			spaceBetween: 16,
			initialSlide: 0,
			speed: 600,
			grabCursor: true,
			thumbs: {
				swiper: subSlider,
				autoScrollOffset: 1,
			},
			//touchRatio: 0,
			//simulateTouch: false,
			// loop: true,
			//preloadImages: false,
			//lazy: true,

			/*
			// Ефекти
			effect: 'fade',
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
			*/

			// Пагінація
			/*
			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			*/

			// Скроллбар
			/*
			scrollbar: {
				el: '.swiper-scrollbar',
				draggable: true,
			},
			*/
			// Брейкпоінти
			breakpoints: {
				// 630: {
				// 	slidesPerView: 2,
				// 	autoHeight: false,
				// },
				// 991.98: {
				// 	slidesPerView: 3,
				// 	spaceBetween: 20,
				// 	autoHeight: false,
				// },
			},
		})
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});