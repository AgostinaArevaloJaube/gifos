// TODO ---------------------- GIF Actions ----------------------  \\

// ---- Favoritear
let arrFavoriteGifs = [];
console.log(arrFavoriteGifs);

const addToFav = (gif, username, title) => {
	let objGif = {
		username: username,
		title: title,
		gif: gif
	};

	arrFavoriteGifs.push(objGif);

	console.log(arrFavoriteGifs);

	// guardarlo en el local storage.
	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
};

const displayFavoriteSection = () => {
	$heroSection.classList.add('hidden');
	$favSection.classList.remove('hidden');
	displayFavoriteGifs();

	if (arrFavoriteGifs == 0) {
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

	for (let i = 0; i < arrFavoriteGifs.length; i++) {
		const gifContainer = document.createElement('div');
		gifContainer.classList.add('gif__container');
		gifContainer.innerHTML = ` 
			<img class="gif" src="${arrFavoriteGifs[i].gif}" alt="${arrFavoriteGifs[i].title}">
		
			<div class="gifActions">
				<div class="gifActions__btn">
					<div class="btn remove" onclick="removeGif('${arrFavoriteGifs[i].gif}')"></div>
					<div class="btn download"></div>
					<div class="btn maximize"></div>
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
displayFavoriteGifs();
$favoritosMenu.addEventListener('click', displayFavoriteSection);

// ---- Descargar
// función por defecto

const downloadGifo = async (url, title) => {
	let blob = await fetch(url).then((img) => img.blob());
	invokeSaveAsDialog(blob, title + '.gif');
};

// ---- Maximizar
// template en HTML, estilarlo y ponerle una función onclick.

// ---- Eliminar en favoritos
const removeGif = (gif) => {
	arrFavoriteGifs.splice(gif, 1);
	localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
	displayFavoriteSection();
};
