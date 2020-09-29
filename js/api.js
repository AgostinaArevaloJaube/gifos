const apiKey = '9Kj5g3A9tVMhZr6HUCRe2zGawrHFutqZ';
const searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
const trendingEndpoint = 'https://api.giphy.com/v1/gifs/trending';
// endpoint de los tranding tags
const trendingTagsEndpoint = 'https://api.giphy.com/v1/gifs/trending/searches';

let offsetSearch = 0;

// --------------- Búsqueda --------------- \\

// --- Fetch
const getSearch = async (search) => {
	event.preventDefault();
	const USER_SEARCH = search.value;
	$searchTitle.innerHTML = USER_SEARCH;

	// si el offset está en 0, limpia la galería de gif
	if (offsetSearch === 0) {
		$searchResultGallery.innerHTML = '';
	}

	await fetch(
		`${searchEndpoint}?api_key=${apiKey}&q=${USER_SEARCH}&offset=${offsetSearch}&limit=12&rating=g`
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
	getSearch();
};

// --- Eventos de la búsqueda en HERO
$searchBtn.addEventListener('click', () => getSearch($searchInputHero));
$searchInputHero.addEventListener('input', cleanResultsContianer);
$searchInputHero.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearch($searchInputHero);
	}
});
$verMasbtn.addEventListener('click', verMas);

// --- Eventos de la búsqueda en NAVBAR
$navbarSearchBtn.addEventListener('click', () => getSearch($navbarSearchInput));
$navbarSearchInput.addEventListener('input', cleanResultsContianer);
$navbarSearchInput.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearch($navbarSearchInput);
	}
});

// --------------- Trending --------------- \\
// const getTrendingGif = async () => {
// 	await fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=12&rating=g`)
// 		.then((response) => response.json())
// 		.then((trendings) => {
// 			console.log(trendings);
// 			// displayTrendingGifs(trendings);
// 		})
// 		.catch((err) => console.error(err));
// };

// // getTrendingGif();
