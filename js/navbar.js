// muestra el menu hamburguesa y lo setea de acuerdo al theme elegido
const displayBurgerMenu = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		if ($navbarList.classList.contains('hidden')) {
			$navbarList.classList.remove('hidden');
			$burgerMenu.src = 'assets/close-modo-noct.svg';
		} else {
			$navbarList.classList.add('hidden');
			$burgerMenu.src = 'assets/burger-modo-noct.svg';
		}
	} else {
		if ($navbarList.classList.contains('hidden')) {
			$navbarList.classList.remove('hidden');
			$burgerMenu.src = 'assets/close.svg';
		} else {
			$navbarList.classList.add('hidden');
			$burgerMenu.src = 'assets/burger.svg';
		}
	}
};

// Navbar Events
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

// Navbar Sticky
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
