// TODO ---------------------- Trending Styles ----------------------  \\
// Setea los botones previo y next, de acuerdo al estado y al theme elegido
const setTrendingBtn = () => {
	if (localStorage.getItem('dark-mode') === 'true') {
		$previousBtn.src = 'assets/button-slider-left-md-noct.svg';
		$nextBtn.src = 'assets/button-slider-right-md-noct.svg';
	} else {
		$previousBtn.src = 'assets/button-slider-left.svg';
		$nextBtn.src = 'assets/Button-Slider-right.svg';
	}
};

$previousBtn.addEventListener('mouseover', () => {
	$previousBtn.src = 'assets/button-slider-left-hover.svg';
});

$nextBtn.addEventListener('mouseover', () => {
	$nextBtn.src = 'assets/Button-Slider-right-hover.svg';
});

$previousBtn.addEventListener('mouseout', setTrendingBtn);
$nextBtn.addEventListener('mouseout', setTrendingBtn);

// TODO ---------------------- Trending API ----------------------  \\

// TODO ------- Trending tags

const getTrendingTags = async () => {
	await fetch(`${trendingTagsEndpoint}?api_key=${apiKey}`)
		.then((response) => response.json())
		.then((trendingTags) => {
			console.log(trendingTags);
			displayTrendingTags(trendingTags);
		})
		.catch((err) => console.log(err));
};

getTrendingTags();

const displayTrendingTags = (trendingTags) => {
	for (let i = 0; i < 6; i++) {
		const trendingTagItem = document.createElement('span');
		trendingTagItem.classList.add('trending__item');
		trendingTagItem.setAttribute(
			'onclick',
			`getSearch("${trendingTags.data[i]}")`
		);
		trendingTagItem.innerHTML = `${trendingTags.data[i]}`;
		$trendingTagList.appendChild(trendingTagItem);
	}
};

// TODO ------- Trending slider
const getTrendingGif = async () => {
	if (window.innerWidth < 768) {
		await fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=12&rating=g`)
			.then((response) => response.json())
			.then((trendings) => {
				console.log(trendings);
				displayTrendingGifs(trendings);
			})
			.catch((err) => console.error(err));
	} else {
		await fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=3&rating=g`)
			.then((response) => response.json())
			.then((trendings) => {
				console.log(trendings);
				displayTrendingGifs(trendings);
			})
			.catch((err) => console.error(err));
	}
};

getTrendingGif();

// const displayTrendingGifsMobile = (trendings) => {
// 	for (let i = 0; i < trendings.data.length; i++) {
// 		const gifContainer = document.createElement('div');
// 		gifContainer.classList.add('gif__container');
// 		gifContainer.innerHTML = `
// 		<img class="gif" src="${trendings.data[i].images.original.url}" alt="${trendings.data[i].title}">

// 		<div class="gifActions">
// 			<div class="gifActions__btn">
// 				<img src="assets/icon-fav.svg" class="favorite" alt="Botón para agregar a mis favoritos">
// 				<img src="assets/icon-download.svg" class="download" alt="Botón para descargar">
// 				<img src="assets/icon-max-normal.svg" class="maximize" alt="Botón para maximizar">
// 			</div>
// 			<div class="gif__info">
// 				<p class="gif_user">${trendings.data[i].username}</p>
// 				<p class="gif_title">${trendings.data[i].title}</p>
// 			</div>
// 		</div>
// 		`;
// 		$trendingSlider.appendChild(gifContainer);
// 	}
// };

const displayTrendingGifs = (trendings) => {
	for (let i = 0; i < trendings.data.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
		<img class="gif" src="${trendings.data[i].images.original.url}" alt="${trendings.data[i].title}">
	
		<div class="gifActions">
			<div class="gifActions__btn">
				<img src="assets/icon-fav.svg" class="favorite" alt="Botón para agregar a mis favoritos">
				<img src="assets/icon-download.svg" class="download" alt="Botón para descargar">
				<img src="assets/icon-max-normal.svg" class="maximize" alt="Botón para maximizar">
			</div>
			<div class="gif__info">
				<p class="gif_user">${trendings.data[i].username}</p>
				<p class="gif_title">${trendings.data[i].title}</p>
			</div>
		</div>
		`;
		
		if (window.innerWidth < 768) {
			$trendingSliderMobile.appendChild(gifContainer);
		} else {
			$trendingSlider.appendChild(gifContainer);
		}
	}
};
