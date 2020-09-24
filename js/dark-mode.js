

$switchThemeBtn.addEventListener('click', () => {
	document.body.classList.toggle('darkMode');

	// Guarda la elección en el localStorage
	if (document.body.classList.contains('darkMode')) {
		localStorage.setItem('dark-mode', true);
	} else {
		localStorage.setItem('dark-mode', false);
	}
});

// consulta cual es el modo elegido y setea las propiedades nocturnas
if (localStorage.getItem('dark-mode') === 'true') {
	document.body.classList.add('darkMode');
	$switchThemeBtn.textContent = 'Modo Diurno';
	$logo.src = 'assets/logo-mobile-modo-noct.svg';
	$crearGifBtn.src = 'assets/CTA-crar-gifo-modo-noc.svg';
	$burgerMenu.src = 'assets/burger-modo-noct.svg';
	$navbarSearchIcon.src = 'assets/icon-search-mod-noc.svg';
	$searchIcon.src = 'assets/icon-search-mod-noc.svg';

} else {
	document.body.classList.remove('darkMode');
	$switchThemeBtn.textContent = 'Modo Nocturno';
}



