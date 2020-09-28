// const apiKey = '9Kj5g3A9tVMhZr6HUCRe2zGawrHFutqZ';
// const searchEndpoint = 'https://api.giphy.com/v1/gifs/search';
// const trendingEndpoint = 'https://api.giphy.com/v1/gifs/trending';
// // endpoint de los tranding tags
// const trendingTagsEndpoint = 'https://api.giphy.com/v1/gifs/trending/searches';

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

// // --------------- Búsqueda
// // --- Fetch
// const getSearch = async () => {
// 	event.preventDefault();

// 	$searchTitle.innerHTML = $searchInputHero.value;

// 	await fetch(
// 		`${searchEndpoint}?api_key=${apiKey}&q=${$searchInputHero.value}&limit=12&rating=g`
// 	)
// 		.then((response) => response.json())
// 		.then((results) => {
// 			console.log(results);
// 			displaySearchGif(results);
// 		})
// 		.catch((err) => console.error(err));
// };

// // --- Mostrar gif
// const displaySearchGif = (results) => {
// 	for (let i = 0; i < results.data.length; i++) {
// 		const gifContainer = document.createElement('div');
// 		gifContainer.classList.add('gif__container');
// 		gifContainer.innerHTML = ` 
// 		<img class="gif" src="${results.data[i].images.original.url}" alt="${results.data[i].title}">
// 		`;

// 		$searchResultGallery.appendChild(gifContainer);
// 	}
// };

// // --- Eventos
// $searchBtn.addEventListener('click', getSearch);
// $searchInputHero.addEventListener('keypress', function (e) {
// 	if (e.keyCode === 13) {
// 		getSearch();
// 	}
// });
