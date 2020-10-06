// TODO ---------------------- GIF Actions ----------------------  \\

// ---- Favoritear ---- \\
let arrFavoriteGifs = [];

const addToFav = (gif, username, title) => {
	let objGif = {
		username: username,
		title: title,
		gif: gif
	};

	arrFavoriteGifs.push(objGif);

	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
	displayFavoriteGifs();
};

const displayFavoriteSection = (event) => {
	event.preventDefault();
	$heroSection.classList.add('hidden');
	$favSection.classList.remove('hidden');
	window.scrollTo({ top: 0, behavior: 'smooth' });
	displayFavoriteGifs();

	if (arrFavoriteGifs == 0 || arrFavoriteGifs == null) {
		$noFavsContainer.classList.remove('hidden');
		$favContainer.classList.add('hidden');
	} else {
		$noFavsContainer.classList.add('hidden');
		$favContainer.classList.remove('hidden');
	}
};

const displayFavoriteGifs = () => {
	$favContainer.innerHTML = '';

	arrFavoriteGifs = JSON.parse(localStorage.getItem('FavoriteGifs'));

	if (arrFavoriteGifs == null) {
		arrFavoriteGifs = [];
	} else {
		for (let i = 0; i < arrFavoriteGifs.length; i++) {
			const gifContainer = document.createElement('div');
			gifContainer.classList.add('gif__container');
			gifContainer.innerHTML = ` 
			<img class="gif" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')" src="${arrFavoriteGifs[i].gif}" alt="${arrFavoriteGifs[i].title}">
		
			<div class="gifActions">
				<div class="gifActions__btn">
					<div class="btn remove" onclick="removeGif('${arrFavoriteGifs[i].gif}')"></div>
					<div class="btn download" onclick="downloadGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].title}')"></div>
					<div class="btn maximize" onclick="maximizeFavoriteGif('${arrFavoriteGifs[i].gif}','${arrFavoriteGifs[i].username}','${arrFavoriteGifs[i].title}')"></div>
				</div>
				<div class="gif__info">
					<p class="gif_user">${arrFavoriteGifs[i].username}</p>
					<p class="gif_title">${arrFavoriteGifs[i].title}</p>
				</div>
			</div>
			`;
			$favContainer.appendChild(gifContainer);
		}
	}
};

$favoritosMenu.addEventListener('click', displayFavoriteSection);

// ---- Descargar ---- \\

const downloadGif = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
};

// ---- Maximizar ---- \\

const maximizeGif = (gif, username, title) => {
	$maximizedGifSection.classList.remove('hidden');
	$maximizedGifSection.classList.add('maximizedGif');
	$maximizedGifSection.innerHTML = '';
	const maximizedGifContainer = document.createElement('div');
	maximizedGifContainer.classList.add('maximizedGif__container');
	maximizedGifContainer.innerHTML = `
	<div class="close-btn" id="close-max-btn" onclick="closeMaximized()"></div>

	<div class="maxGif_Container">
		<img class="gifMax" src="${gif}" alt="${title}">
	</div>

	<div class="gifMaxActions">
		<div class="gif__info">
			<p class="gif_user">${username}</p>
			<p class="gif_title">${title}</p>
		</div>
		<div class="gifMaxActions__btn">
			<div class="buttonsMax favoriteMax" onclick="addToFav('${gif}', '${username}', '${title}')"></div>
			<div class="buttonsMax downloadMax" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	$maximizedGifSection.appendChild(maximizedGifContainer);
};

const maximizeFavoriteGif = (gif, username, title) => {
	$maximizedGifSection.classList.remove('hidden');
	$maximizedGifSection.classList.add('maximizedGif');
	$maximizedGifSection.innerHTML = '';
	const maximizedGifContainer = document.createElement('div');
	maximizedGifContainer.classList.add('maximizedGif__container');
	maximizedGifContainer.innerHTML = `
	<div class="close-btn" id="close-max-btn" onclick="closeMaximized()"></div>

	<div class="maxGif_Container">
		<img class="gifMax" src="${gif}" alt="${title}">
	</div>

	<div class="gifMaxActions">
		<div class="gif__info">
			<p class="gif_user">${username}</p>
			<p class="gif_title">${title}</p>
		</div>
		<div class="gifMaxActions__btn">
			<div class="buttonsMax removeMax" onclick="removeGif('${gif}')"></div>
			<div class="buttonsMax downloadMax" onclick="downloadGif('${gif}','${title}')"></div>
			</div>
	</div>`;
	$maximizedGifSection.appendChild(maximizedGifContainer);
};

const closeMaximized = () => {
	$maximizedGifSection.classList.add('hidden');
	$maximizedGifSection.classList.remove('maximizedGif');
};

// ---- Eliminar en favoritos ---- \\

const removeGif = (gif) => {
	arrFavoriteGifs.splice(gif, 1);
	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
	displayFavoriteSection(event);
	closeMaximized();
};

// ---- Eliminar en Mis gifos ---- \\
