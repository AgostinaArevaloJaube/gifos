// ----------------------  Trending Styles ----------------------  \\
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


// ----------------------  Trending API ----------------------  \\

const getTrendingGif = async () => {
	await fetch(`${trendingEndpoint}?api_key=${apiKey}&limit=12&rating=g`)
		.then((response) => response.json())
		.then((trendings) => {
			console.log(trendings);
			displayTrendingGifs(trendings);
		})
		.catch((err) => console.error(err));
};

getTrendingGif();


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
		$trendingSlider.appendChild(gifContainer);
	}
}

