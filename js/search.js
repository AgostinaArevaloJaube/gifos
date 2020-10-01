// ---------------------- Búsqueda ----------------------  \\

let offsetSearch = 0;

// --- Fetch
const getSearch = async (search) => {
	event.preventDefault();
	limpiarBusqueda();
	$searchInputHero.value = search;
	$navbarSearchInput.value = search;
	$searchTitle.innerHTML = search;

	// si el offset está en 0, limpia la galería de gif
	if (offsetSearch === 0) {
		$searchResultGallery.innerHTML = '';
	}

	await fetch(
		`${searchEndpoint}?api_key=${apiKey}&q=${search}&offset=${offsetSearch}&limit=12&rating=g`
	)
		.then((response) => response.json())
		.then((results) => {
			console.log(results); //! sacar este console log antes de entregar

			// si no encuentra ningún resultado muestra un mensaje de error
			if (results.data == 0) {
				displayErrorSearch();
			} else {
				displaySearchGif(results);
			}
		})
		.catch((err) => console.log(err));
};

// --- Mostrar gif
const displaySearchGif = (results) => {
	$searchResultContainer.classList.remove('hidden');
	$verMasbtn.classList.remove('hidden');

	if (offsetSearch === 0) {
		window.scrollTo({ top: 600, behavior: 'smooth' });
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
		<img class="gif" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
	
		<div class="gifActions">
			<div class="gifActions__btn">
				<img src="assets/icon-fav.svg" class="favorite" alt="Botón para agregar a mis favoritos">
				<img src="assets/icon-download.svg" class="download" alt="Botón para descargar">
				<img src="assets/icon-max-normal.svg" class="maximize" alt="Botón para maximizar">
			</div>
			<div class="gif__info">
				<p class="gif_user">${results.data[i].username}</p>
				<p class="gif_title">${results.data[i].title}</p>
			</div>
		</div>
		`;
		$searchResultGallery.appendChild(gifContainer);
	}
};

// --- Mostrar mensaje de error de búsqueda
const displayErrorSearch = () => {
	$searchResultContainer.classList.remove('hidden');
	$errorContainer.classList.remove('hidden');
	$verMasbtn.style.display = 'none';

	$errorContainer.innerHTML = `
	<div class="error__container" id="error-container">
		<img class="" id="error-search" src="assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" >
		<h4 class="error-search-text">Intenta con otra búsqueda.</h4>
	</div>
	`;
};

// --- Vuelve los seteos a la configuración inicial
const cleanResultsContianer = () => {
	$searchResultContainer.classList.add('hidden');
	$errorContainer.classList.add('hidden');
	$verMasbtn.style.display = 'block';
	$searchResultGallery.innerHTML = '';
	$navbarSearchInput.placeholder = 'Busca GIFOS y más';
	$searchInputHero.placeholder = 'Busca GIFOS y más';
};

// --- Cada vez que se clickee en el botón Ver más, el offset suma 12 gifs más y se vuelve a ejecutar el fetch
const verMas = () => {
	offsetSearch += 12;
	if ($searchInputHero.value) {
		getSearch($searchInputHero.value);
	} else {
		getSearch($navbarSearchInput.value);
	}
};

// --- Eventos de la búsqueda en HERO
$searchBtn.addEventListener('click', () => getSearch($searchInputHero.value));
$searchInputHero.addEventListener('input', cleanResultsContianer);
$searchInputHero.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearch($searchInputHero.value);
	}
});
$verMasbtn.addEventListener('click', verMas);

// --- Eventos de la búsqueda en NAVBAR
$navbarSearchBtn.addEventListener('click', () =>
	getSearch($navbarSearchInput.value)
);
$navbarSearchInput.addEventListener('input', cleanResultsContianer);
$navbarSearchInput.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearch($navbarSearchInput.value);
	}
});

// TODO--------------- Search Suggestions --------------- \\

const getSearchSuggestions = async () => {
	limpiarBusqueda();
	$searchSuggestionList.classList.remove('hidden');
	const USER_INPUT = $searchInputHero.value;

	if (USER_INPUT.length >= 1) {
		await fetch(
			// `https://api.giphy.com/v1/tags/related/${USER_INPUT}?api_key=${apiKey}&limit=4`
			`${searchAutocomplete}?api_key=${apiKey}&q=${USER_INPUT}&limit=4&rating=g`
		)
			.then((response) => response.json())
			.then((suggestions) => {
				console.log(suggestions);
				displaySuggestions(suggestions);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

const displaySuggestions = (suggestions) => {
	// acá cambiar los estilos
	for (let i = 0; i < 4; i++) {
		const searchSuggestionItem = document.createElement('li');
		searchSuggestionItem.classList.add('SearchSuggestions__item');
		searchSuggestionItem.innerHTML = `<p onclick="getSearch('${suggestions.data[i].name}')">${suggestions.data[i].name}</p>`;
		$searchSuggestionList.appendChild(searchSuggestionItem);
	}

	//
};

$searchBtn.addEventListener('click', getSearchSuggestions);
$searchInputHero.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearchSuggestions();
	}
});
// $searchInputHero.addEventListener('keyup', getSearchSuggestions);

// limpiar la busqueda
// autocompletado mientras escribe
// que cuando clickee o haga enter vaya al resultado

const limpiarBusqueda = () => {
	$searchSuggestionList.classList.add('hidden');
	$searchSuggestionList.innerHTML = '';
};

$searchInputHero.addEventListener('input', getSearchSuggestions);
