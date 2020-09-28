const apiKey = '9Kj5g3A9tVMhZr6HUCRe2zGawrHFutqZ';
const searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
const trendingEndpoint = 'https://api.giphy.com/v1/gifs/trending';
// endpoint de los tranding tags
const trendingTagsEndpoint = 'https://api.giphy.com/v1/gifs/trending/searches';

let offset = 0;

// --------------- Búsqueda
// --- Fetch
const getSearch = async () => {
	event.preventDefault();
	$searchTitle.innerHTML = $searchInputHero.value;

	if (offset === 0) {
		$searchResultGallery.innerHTML = '';
	}

	await fetch(
		`${searchEndpoint}?api_key=${apiKey}&q=${$searchInputHero.value}&offset=${offset}&limit=12&rating=g`
	)
		.then((response) => response.json())
		.then((results) => {
			console.log(results);

			if (results.data == 0) {
				$searchResultGallery.innerHTML = `
				<div class="error__container">
			<img class="" id="error-search" src="assets/icon-busqueda-sin-resultado.svg" alt="Busqueda sin resultado" >
			<h4 class="error-search-text">Intenta con otra búsqueda.</h4>
			</div>
				`;
			} else {
				displaySearchGif(results);
			}
		})
		.catch((err) => console.error(err));
};

// --- Mostrar gif
const displaySearchGif = (results) => {
	for (let i = 0; i < results.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
		<img class="gif" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
		`;

		$searchResultGallery.appendChild(gifContainer);
	}
};

const verMas = () => {
	offset += 12;
	getSearch();
};

// --- Eventos
$searchBtn.addEventListener('click', getSearch);
$searchInputHero.addEventListener('keypress', function (e) {
	if (e.keyCode === 13) {
		getSearch();
	}
});
$verMasbtn.addEventListener('click', verMas);

// // trending gifs
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
