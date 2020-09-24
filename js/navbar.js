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

// TODO displayBurgerMenu original, sin tener en cuenta el modo nocturno
// if ($navbar__list.classList.contains('hidden')) {
// 	$navbar__list.classList.remove('hidden');
// 	$burgerMenu.src = 'assets/close.svg';

// } else {
// 	$navbar__list.classList.add('hidden');
// 	$burgerMenu.src = 'assets/burger.svg';
// }

function stickyNav() {
	
}