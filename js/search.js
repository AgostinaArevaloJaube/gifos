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

	if (results.data.length < 12) {
		$verMasbtn.style.display = 'none';
	}

	for (let i = 0; i < results.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
		<img class="gif" onclick="maximizeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
	
		<div class="gifActions">
			<div class="gifActions__btn">
				<div class="btn favorite" onclick="addToFav('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
				<div class="btn download" onclick="downloadGif('${results.data[i].images.original.url}','${results.data[i].title}')"></div>
				<div class="btn maximize" onclick="maximizeGif('${results.data[i].images.original.url}','${results.data[i].username}','${results.data[i].title}')"></div>
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
	$errorContainer.innerHTML = `
	<div class="error__container" id="error-container">
	<img class="" id="error-search" src="assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" >
	<h4 class="error-search-text">Intenta con otra búsqueda.</h4>
	</div>
	`;
	$verMasbtn.style.display = 'none';
};

// --- Cada vez que se clickee en el botón Ver más, el offset suma 12 gifs más y se vuelve a ejecutar el fetch.
const verMasButton = () => {
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
			`${searchAutocomplete}?api_key=${apiKey}&q=${USER_INPUT}&limit=4&rating=g`
		)
			.then((response) => response.json())
			.then((suggestions) => {
				displaySuggestions(suggestions);
			})
			.catch((err) => {
				console.log(err);
			});
	}
};

const displaySuggestions = (suggestions) => {
	for (let i = 0; i < suggestions.data.length; i++) {
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
	$searchSuggestionsContainer.classList.remove('hidden');
	$searchContainer.classList.add('searchActive');
	$searchSuggestionsContainer.classList.add('searchActiveContainer');
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
	$searchSuggestionsContainer.classList.add('hidden');
	$searchBtn.classList.remove('hidden');
	$searchCloseBtn.classList.add('hidden');
	$searchGrayBtn.classList.add('hidden');
	$searchContainer.classList.remove('searchActive');
};
654;
const setInactiveNavbarSearch = () => {
	$navbarSearchInput.value = '';
	$searchInputHero.value = '';
	cleanResultsContianer();
	$navbarSearchBtn.classList.remove('hidden');
	$navbarSearchCloseBtn.classList.add('hidden');
	$navbarSearchGrayBtn.classList.add('hidden');
};

// ---------- EVENTOS

// --- Eventos de la búsqueda en HERO
$searchGrayBtn.addEventListener('click', () => {
	getSearch($searchInputHero.value);
});
$searchInputHero.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch($searchInputHero.value);
	}
});
$searchInputHero.addEventListener('click', setActiveSearchBar);
$searchInputHero.addEventListener('input', setActiveSearchBar);
$searchInputHero.addEventListener('input', getSearchSuggestions);
$searchInputHero.addEventListener('input', cleanResultsContianer);

$searchCloseBtn.addEventListener('click', setInactiveSearchBar);
$verMasbtn.addEventListener('click', verMasButton);

// --- Eventos de la búsqueda en NAVBAR
$navbarSearchGrayBtn.addEventListener('click', () => {
	getSearch($navbarSearchInput.value);
});
$navbarSearchInput.addEventListener('keypress', (event) => {
	if (event.keyCode === 13) {
		getSearch($navbarSearchInput.value);
	}
});
$navbarSearchInput.addEventListener('click', setActiveNavbarSearch);
$navbarSearchInput.addEventListener('input', setActiveNavbarSearch);
$navbarSearchCloseBtn.addEventListener('click', setInactiveNavbarSearch);
$navbarSearchInput.addEventListener('input', cleanResultsContianer);
