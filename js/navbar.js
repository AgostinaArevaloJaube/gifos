const displayBurgerMenu = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		if ($navbar__list.classList.contains('hidden')) {
			$navbar__list.classList.remove('hidden');
			$burgerMenu.src = 'assets/close-modo-noct.svg';
		} else {
			$navbar__list.classList.add('hidden');
			$burgerMenu.src = 'assets/burger-modo-noct.svg';
		}
	} else {
		if ($navbar__list.classList.contains('hidden')) {
			$navbar__list.classList.remove('hidden');
			$burgerMenu.src = 'assets/close.svg';
		} else {
			$navbar__list.classList.add('hidden');
			$burgerMenu.src = 'assets/burger.svg';
		}
	}
};
$burgerMenu.addEventListener('click', displayBurgerMenu);

$crearGifBtn.addEventListener('click', () => {
	$crearGifBtn.src = 'assets/CTA-crear-gifo-active.svg';
});

$crearGifBtn.addEventListener('mouseover', () => {
	$crearGifBtn.src = 'assets/CTA-crear-gifo-hover.svg';
});

$crearGifBtn.addEventListener('mouseout', () => {
	$crearGifBtn.src = 'assets/button-crear-gifo.svg';
});

// TODO displayBurgerMenu original, sin tener en cuenta el modo nocturno. Lo dejo por si tengo que cambiarlo.
// if ($navbar__list.classList.contains('hidden')) {
// 	$navbar__list.classList.remove('hidden');
// 	$burgerMenu.src = 'assets/close.svg';

// } else {
// 	$navbar__list.classList.add('hidden');
// 	$burgerMenu.src = 'assets/burger.svg';
// }

function stickyNav() {
	if (document.documentElement.scrollTop > 100) {
		if (window.innerWidth < 1024) {
			$navbarSearchContainer.classList.add('hiddenSearchBar');
		} else {
			$navbarSearchContainer.classList.remove('hiddenSearchBar');
			$headerContainer.style.boxShadow =
				'0 9px 8px -10px rgba(148,147,147,0.9)';
		}
	} else {
		$navbarSearchContainer.classList.add('hiddenSearchBar');
		$headerContainer.style.boxShadow = 'none';
	}
}

window.addEventListener('scroll', stickyNav);
