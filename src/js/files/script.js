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
	initRating()
	initMoveTabLine()
	document.addEventListener('click', documentActions)

	function documentActions(e) {
		const targetElement = e.target

		if (targetElement.closest('.banner-header__close')) {
			document.documentElement.style.setProperty('--header-banner-height', '0rem')
			_slideUp(targetElement.closest('.banner-header'), 400)
			// sessionStorage.setItem('hide-discount', true) // ! Не забудь раскоментить
		}

		if (targetElement.closest('.actions-review__button')) {
			const wrapper = targetElement.closest('.actions-review')
			const activeButton = document.querySelector('.actions-review.--open')
			if (activeButton && activeButton !== wrapper)
				activeButton.classList.remove('--open')
			wrapper.classList.toggle('--open')
		} else if (!targetElement.closest('.actions-review') && document.querySelector('.actions-review.--open'))
			document.querySelector('.actions-review.--open').classList.remove('--open')

		// is touch actions and tablet
		if (isTouch) {
			if (targetElement.closest('.main-header__link--search')) {
				document.documentElement.classList.toggle('search-show')
				const openSubMenu = document.querySelector('.menu__item.--open')
				if (openSubMenu) openSubMenu.classList.remove('--open')
				if (document.documentElement.classList.contains('menu-open'))
					menuClose()
			} else if (!targetElement.closest('.header'))
				document.documentElement.classList.remove('search-show')

			if (isTablet) {
				if (targetElement.closest('[data-spoller-trigger]')) {
					const parentBlock = targetElement.closest('[data-spoller-block]')
					parentBlock.classList.toggle('--open')
					const openSubMenu = document.querySelector('[data-spoller-block].--open')
					if (openSubMenu && openSubMenu !== parentBlock)
						openSubMenu.classList.remove('--open')
					if (parentBlock.classList.contains('--open') &&
						document.documentElement.classList.contains('search-show'))
						document.documentElement.classList.remove('search-show')
				} else if (!targetElement.closest('.menu__item')) {
					const openSubMenu = document.querySelector('[data-spoller-block].--open')
					if (openSubMenu) openSubMenu.classList.remove('--open')
				}
			}

			if (!isTablet) {
				if (targetElement.closest('[data-spoller-trigger]')) {
					const spollerWrapper = targetElement.closest('[data-spoller-block]')
					if (!spollerWrapper.querySelector('._slide')) {
						const spollerButton = targetElement.closest('[data-spoller-trigger]')
						const titleSpoller = spollerButton.parentElement
						titleSpoller.classList.toggle('--open')
						_slideToggle(titleSpoller.nextElementSibling, 400)
					}
				} else if (!document.documentElement.classList.contains('menu-open')) {
					const titles = document.querySelectorAll('.menu__title.--open')
					if (titles.length) {
						titles.forEach(title => {
							title.classList.remove('--open')
							_slideUp(title.nextElementSibling, 400)
						})
					}
				}
			}
		}

		if (targetElement.closest('.tabs__title') && targetElement.closest('[data-tabs-line]')) {
			const itemNavigation = targetElement.closest('.tabs__title')
			const navigation = targetElement.closest('[data-tabs-line]')
			navigation.style.setProperty('--position-left', `${itemNavigation.offsetLeft / navigation.offsetWidth * 100}%`)
		}
	}
}

function initMenuSpoller() {
	const spollers = document.querySelectorAll('[data-spoller-block]')
	if (!spollers.length) return
	const mediaSpollers = Array.from(spollers)
		.filter(spoller => spoller.dataset.spollerBlock.split(',')[0])

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

function initRating() {
	const ratingBlocks = document.querySelectorAll('[data-rating]')
	if (!ratingBlocks.length) return

	ratingBlocks.forEach(item => {
		const value = item.dataset.rating.split('.')
		const whole = value[0] ? parseInt(value[0]) : 5
		let remainder = value[1] ? parseInt(value[1]) : 0
		remainder = remainder > 10 ? remainder / 10 : remainder
		const ratingSize = item.dataset.ratingSize ? parseInt(item.dataset.ratingSize) : 17

		const body = document.createElement('div')
		body.classList.add('rating__body')

		for (let numberStar = 0; numberStar < whole; numberStar++) {
			body.append(getStar(ratingSize, ratingSize))
		}

		if (remainder) {
			const width = ratingSize * remainder / 0.10 / 100
			body.append(getStar(width, ratingSize))
		}

		item.append(body)

		if (item.hasAttribute('data-rating-value')) {
			item.insertAdjacentHTML('beforeend', `
				<div class="rating__value">${value[0]}.${value[1] || '0'}/<span>5</span></div>
			`)
		}
	})

	function getStar(width = 17, height = 17, initSize = height) {
		const star = document.createElement('div')
		star.classList.add('rating__star')
		star.style.width = `${width / 16}rem`
		star.style.height = `${height / 16}rem`
		star.insertAdjacentHTML('beforeend', `<img style="width: ${initSize / 16}rem; height: ${initSize / 16}rem; object-fit: contain" src="img/icons/star.svg">`)
		return star
	}
}

function initMoveTabLine() {
	const navigationTab = document.querySelector('[data-tabs-line]')
	if (!navigationTab) return
	const activeTab = navigationTab.querySelector('._tab-active')
	if (!activeTab) return

	navigationTab.classList.add('_init-line')
	navigationTab.style.setProperty('--position-left', `${activeTab.offsetLeft / navigationTab.offsetWidth * 100}%`)
}