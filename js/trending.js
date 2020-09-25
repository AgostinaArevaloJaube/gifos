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
