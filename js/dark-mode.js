// Switch Theme Event

const switchTheme = () => {
	document.body.classList.toggle('darkMode');

	// Guarda la elección en el localStorage
	if (document.body.classList.contains('darkMode')) {
		localStorage.setItem('dark-mode', true);
	} else {
		localStorage.setItem('dark-mode', false);
	}
};

$switchThemeBtn.addEventListener('click', switchTheme);

// consulta cual es el modo elegido y setea las propiedades nocturnas
const setLocalStorageTheme = () => {
	if (localStorage.getItem('dark-mode') == 'true') {
		document.body.classList.add('darkMode');
		$switchThemeBtn.textContent = 'Modo Diurno';
		$logo.src = 'assets/logo-mobile-modo-noct.svg';
		$crearGifBtn.src = 'assets/CTA-crar-gifo-modo-noc.svg';
		$burgerMenu.src = 'assets/burger-modo-noct.svg';
		$navbarSearchBtn.src = 'assets/icon-search-mod-noc.svg';
		$navbarSearchCloseBtn.src = 'assets/close-modo-noct.svg';
		$searchBtn.src = 'assets/icon-search-mod-noc.svg';
		$searchCloseBtn.src = 'assets/close-modo-noct.svg';
		$previousBtn.src = 'assets/button-slider-left-md-noct.svg';
		$nextBtn.src = 'assets/button-slider-right-md-noct.svg';
		$camera.src = 'assets/camara-modo-noc.svg';
		$celuloide.src = 'assets/pelicula-modo-noc.svg';
	} else {
		document.body.classList.remove('darkMode');
		$switchThemeBtn.textContent = 'Modo Nocturno';
	}
};

setLocalStorageTheme();
