// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";
import { _slideToggle, _slideUp, _slideDown, menuClose } from "./functions.js";

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	const isTouch = document.documentElement.classList.contains('touch')
	const banner = document.querySelector('.banner-header')
	let isTablet
	const mediaTablet = window.matchMedia(`(min-width: ${767.98 / 16}em)`)
	mediaTablet.addEventListener('change', e => {
		isTablet = e.matches
	})
	isTablet = mediaTablet.matches

	if (banner) {
		const isHideBanner = sessionStorage.getItem('hide-discount') ?
			true : false

		if (isHideBanner) {
			document.documentElement.style.setProperty('--header-banner-height', '0rem')
			_slideUp(banner, 400)
		}
	}

	initMenuSpoller()
	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target

		if (targetElement.closest('.banner-header__close')) {
			document.documentElement.style.setProperty('--header-banner-height', '0rem')
			_slideUp(targetElement.closest('.banner-header'), 400)
			sessionStorage.setItem('hide-discount', true)
		}

		// is touch actions and tablet
		if (isTouch) {

			if (targetElement.closest('.main-header__link--search')) {
				document.documentElement.classList.toggle('search-show')
				const openSubMenu = document.querySelector('.menu__item.--open')
				if (openSubMenu)
					openSubMenu.classList.remove('--open')
				if (document.documentElement.classList.contains('menu-open'))
					menuClose()
			} else if (!targetElement.closest('.header'))
				document.documentElement.classList.remove('search-show')

			if (isTablet) {
				if (targetElement.closest('[data-spoller-trigger]')) {
					const parentBlock = targetElement.closest('[data-spoller-block]')
					const openSubMenu = document.querySelector('[data-spoller-block].--open')
					if (openSubMenu && openSubMenu !== parentBlock)
						openSubMenu.classList.remove('--open')

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

			if (!isTablet) {
				if (targetElement.closest('[data-spoller-trigger]')) {
					const spollerWrapper = targetElement.closest('[data-spoller-block]')
					if (!spollerWrapper.querySelector('_slide')) {
						const spollerButton = targetElement.closest('[data-spoller-trigger]')
						const titleSpoller = spollerButton.parentElement
						titleSpoller.classList.toggle('--open')
						_slideToggle(titleSpoller.nextElementSibling, 400)
					}
				} else if (!document.documentElement.classList.contains('menu-open')) {
					const titles = document.querySelectorAll('.menu__title.--open')
					if (titles.length)
						titles.forEach(title => {
							title.classList.remove('--open')
							_slideUp(title.nextElementSibling, 400)
						})
				}
			}
		}
	}
}

function initMenuSpoller() {
	const spollers = document.querySelectorAll('[data-spoller-block]')
	if (!spollers.length) return
	const mediaSpollers = Array.from(spollers).filter(spoller => spoller.dataset.spollerBlock.split(',')[0])

	if (mediaSpollers.length) {
		const breakpoints = []
		mediaSpollers.forEach(block => {
			const options = block.dataset.spollerBlock.split(',')
			const value = options[0] ? options[0] : 767.98
			const typeMedia = options[1] ? options[1] : 'max'

			breakpoints.push({
				item: block,
				value,
				typeMedia
			})
		})

		let mediaQueries = breakpoints.map(({ value, typeMedia }) => {
			return `(${typeMedia}-width: ${value / 16}em),${value},${typeMedia}`
		})
		mediaQueries = new Set(mediaQueries)

		mediaQueries.forEach(media => {
			const options = media.split(',')
			const textMediaRequest = options[0],
				value = options[1],
				typeMedia = options[2]
			const currentSpollers = breakpoints.filter(breakpoint => {
				return breakpoint.value === value && breakpoint.typeMedia === typeMedia
			})

			const mediaRequest = window.matchMedia(textMediaRequest)
			mediaRequest.addEventListener('change', e => setSpollerTabIndex(e.matches, currentSpollers))
			if (mediaRequest.matches)
				setSpollerTabIndex(mediaRequest.matches, currentSpollers)
		})

	}
}

function setSpollerTabIndex(matches, spollers) {
	spollers.forEach(({ item }) => {
		const buttons = item.querySelectorAll('[data-spoller-trigger]')
		if (!buttons.length) return

		matches ?
			toggleShowSubMenu(buttons, _slideUp, false) :
			toggleShowSubMenu(buttons, _slideDown)
	})

}

function toggleShowSubMenu(buttons, hideOrShowContent, isAddTabindex = true) {
	buttons.forEach(button => {
		if (isAddTabindex) {
			button.setAttribute('tabindex', -1)
			button.parentElement.classList.remove('--open')
		} else {
			button.removeAttribute('tabindex')
		}

		const content = button.parentElement.nextElementSibling
		hideOrShowContent(content, 0)
	})
}