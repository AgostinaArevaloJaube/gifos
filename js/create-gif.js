const setDarkModeStuff = () => {
	if (localStorage.getItem('dark-mode') == 'true') {
		$camera.src = 'assets/camara-modo-noc.svg';
		$celuloide.src = 'assets/pelicula-modo-noc.svg';
	} 
};

setDarkModeStuff();