// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener('load', windowLoaded)

function windowLoaded() {
	document.addEventListener('click', documentActions)
	const banner = document.querySelector('.banner-header')
	if (banner) {
		const isShowDiscount = sessionStorage.getItem('show-discount') ?
			parseInt(sessionStorage.getItem('show-discount')) : 1

		if (!isShowDiscount)
			hideBanner(banner)
	}
}

function documentActions(e) {
	const targetElement = e.target
	if (targetElement.closest('.banner-header__close')) {
		sessionStorage.setItem('show-discount', 0)
		hideBanner(targetElement.closest('.banner-header'))
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