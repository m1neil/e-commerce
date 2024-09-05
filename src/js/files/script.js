// Підключення функціоналу "Чертоги Фрілансера"
import { document } from "postcss";
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	const isTouch = document.documentElement.classList.contains('touch')
	const banner = document.querySelector('.banner-header')
	const isTablet = window.matchMedia(`(min-width: ${767.98 / 16}em)`).matches
	if (banner) {
		const isShowDiscount = sessionStorage.getItem('show-discount') ?
			parseInt(sessionStorage.getItem('show-discount')) : 1

		if (!isShowDiscount)
			hideBanner(banner)
	}

	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target

		if (targetElement.closest('.banner-header__close')) {
			sessionStorage.setItem('show-discount', 0)
			hideBanner(targetElement.closest('.banner-header'))
		}

		if (!document.documentElement.classList.contains('menu-open') &&
			targetElement.closest('.main-header__link.--icon-search'))
			document.documentElement.classList.toggle('search-show')
		else if (!targetElement.closest('.header'))
			document.documentElement.classList.remove('search-show')

		// is touch actions and tablet
		if (isTouch) {
			if (isTablet) {
				if (targetElement.closest('[data-spoller-trigger]')) {
					const parentBlock = targetElement.closest('[data-spoller-block]')
					parentBlock.classList.toggle('--open')

					if (parentBlock.classList.contains('--open') &&
						document.documentElement.classList.contains('search-show'))
						document.documentElement.classList.remove('search-show')

				} else if (!targetElement.closest('.menu__item')) {
					const openSubMenu = document.querySelector('[data-spoller-block].--open')
					if (openSubMenu)
						openSubMenu.classList.remove('--open')
				}
			}

			if (document.documentElement.classList.contains('menu-open'))
				document.documentElement.classList.remove('search-show')
		}


	}
}



function hideBanner(banner) {
	banner.style.overflow = 'hidden'
	banner.style.transitionProperty = 'padding-block, height'
	banner.style.transitionDuration = '0.5s'
	banner.style.height = `${banner.scrollHeight / 16}rem`
	banner.offsetHeight
	banner.style.height = 0
	banner.style.paddingBlock = 0
	setTimeout(() => {
		banner.remove()
	}, 500);
}

function initMenuSpoller() {
	const spollers = document.querySelectorAll('[data-spoller-block]')
	if (!spollers.length) return
	// const mediaSpollers = Array.from(spollers).filter(spoller => spoller.dataset.spollerBlock.split(',')[0])
}