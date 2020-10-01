// TODO ---------------------- Búsqueda ----------------------  \\

let offsetSearch = 0;

// --- Busqueda de gifs
const getSearch = async (search) => {
	event.preventDefault();
	cleanSearchSuggestions();
	$searchInputHero.value = search;
	$navbarSearchInput.value = search;
	$searchTitle.innerHTML = search;

	// si el offset está en 0, limpia la galería de gif
	if (offsetSearch === 0) {
		$searchResultGallery.innerHTML = '';
	}

	//-----------fetch
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
	window.scrollTo({ top: 600, behavior: 'smooth' });

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

// --- Cada vez que se clickee en el botón Ver más, el offset suma 12 gifs más y se vuelve a ejecutar el fetch.
const verMas = () => {
	offsetSearch += 12;
	if ($searchInputHero.value) {
		getSearch($searchInputHero.value);
	} else {
		getSearch($navbarSearchInput.value);
	}
};

// TODO--------------- Search Suggestions --------------- \\

const getSearchSuggestions = async () => {
	cleanSearchSuggestions();
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
		// con los eventos permito que se realicen busquedas al clickear la lupa o el texto
		searchSuggestionItem.innerHTML = `
		<img class="search__btnGray" id="" src="assets/icon-search-gray.svg" alt="Boton Buscar" onclick="getSearch('${suggestions.data[i].name}')">
		<p class="search__Text" onclick="getSearch('${suggestions.data[i].name}')">${suggestions.data[i].name}</p>`;
		$searchSuggestionList.appendChild(searchSuggestionItem);
	}
};

// --- Vuelve los seteos del contenedor a la configuración inicial
const cleanResultsContianer = () => {
	$searchResultContainer.classList.add('hidden');
	$errorContainer.classList.add('hidden');
	$verMasbtn.style.display = 'block';
	$searchResultGallery.innerHTML = '';
	$navbarSearchInput.placeholder = 'Busca GIFOS y más';
	$searchInputHero.placeholder = 'Busca GIFOS y más';
};

// Limpia las sugerencias de búsqueda
const cleanSearchSuggestions = () => {
	$searchSuggestionList.classList.add('hidden');
	$searchSuggestionList.innerHTML = '';
};

// --- Seteos para cuando el buscador está activo
const setActiveSearchBar = () => {
	$searchGrayBtn.classList.remove('hidden');
	$searchCloseBtn.classList.remove('hidden');
	$searchBtn.classList.add('hidden');
	getSearchSuggestions();
};

const setActiveNavbarSearch = () => {
	$navbarSearchGrayBtn.classList.remove('hidden');
	$navbarSearchCloseBtn.classList.remove('hidden');
	$navbarSearchBtn.classList.add('hidden');
};

// --- Seteos para cuando el buscador está inactivo
// Resetea contendeores, valores de los inputs y cambia cruz por lupa.
const setInactiveSearchBar = () => {
	$navbarSearchInput.value = '';
	$searchInputHero.value = '';
	cleanResultsContianer();
	cleanSearchSuggestions();
	$searchBtn.classList.remove('hidden');
	$searchCloseBtn.classList.add('hidden');
	$searchGrayBtn.classList.add('hidden');
};

const setInactiveNavbarSearch = () => {
	$navbarSearchInput.value = '';
	$searchInputHero.value = '';
	cleanResultsContianer();
	$navbarSearchBtn.classList.remove('hidden');
	$navbarSearchBtn.classList.add('hidden');
	$navbarSearchGrayBtn.classList.add('hidden');
};

// ---------- EVENTOS

// --- Eventos de la búsqueda en HERO
$searchGrayBtn.addEventListener('click', () =>
	getSearch($searchInputHero.value)
);
$searchInputHero.addEventListener('input', cleanResultsContianer);
$searchInputHero.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch($searchInputHero.value);
		getSearchSuggestions();
	}
});
$searchGrayBtn.addEventListener('click', getSearchSuggestions);
$searchCloseBtn.addEventListener('click', setInactiveSearchBar);
$searchInputHero.addEventListener('input', setActiveSearchBar);
$searchInputHero.addEventListener('click', setActiveSearchBar);
$verMasbtn.addEventListener('click', verMas);

// --- Eventos de la búsqueda en NAVBAR
$navbarSearchGrayBtn.addEventListener('click', () =>
	getSearch($navbarSearchInput.value)
);
$navbarSearchInput.addEventListener('input', cleanResultsContianer);
$navbarSearchInput.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch($navbarSearchInput.value);
	}
});
$navbarSearchInput.addEventListener('input', setActiveNavbarSearch);
$navbarSearchInput.addEventListener('click', setActiveNavbarSearch);
$navbarSearchCloseBtn.addEventListener('click', setInactiveNavbarSearch);
