/*

*Separar todos los elementos del DOM para tenerlos a mano.

Pasitos desglosados:
? click en COMENZAR --> 
	* Se "activa" el STEP 1 ($step1 cambia de estilos) ----> LISTO
	* Cambia el titulo($crearGifTitle) ----> LISTO
	* Cambia el texto ($crearGifText) ----> LISTO
	* Pide el permiso, sale el cartel emergente ----> LISTO
	* Desaparece el botón ($buttons). ----> LISTO
	* Una vez que acepta, aparece el botón GRABAR  ----> LISTO
		* Cambia STEP 2 ($step1 cambia de estilos ----> LISTO
		* Aparece la previsualización del video ----> LISTO

? click en GRABAR
	* Aparece botón FINALIZAR ----> LISTO
	! * Aparece el timer
		función que calcule el tiempo KE
	! * Empieza a grabar

? click en FINALIZAR
	* Cambia a botón SUBIR GIFO ----> LISTO
	* Cambia a STEP 3 ----> LISTO
	* Apaprece REPETIR CAPTURA ----> LISTO
	! * Aparece el gif YA GRABADO

? click en SUBIR GIFO
	! * SUBIENDO GIFO 
		* función que suba el gif y cambie esto? :
		Aparece SOBRE EL VIDEO el overlay ---> FALTA CHEQUEAR

	! * GIFO SUBIDO CON ESITO 
		* 1. Cambia el texto e ícono:
			$overlayStatusText.innerHTML = 'GIFO subido con éxito'
			Cambia el ícono: $overlayStatusIcon.src = 'assets/check.svg'
		* 2. Se envía a MIS GIFOS
	
		* 3. Al overlay le aparecen los botones de descargar o copiar link?

? click en REPETIR CAPTURA
	! * Vuelve al estado 2? Grabar?
	! * Acá habría que resetear textos del bottón a comenzar

*/
$buttonGrabar.style.display = 'none';
$buttonFinalizar.style.display = 'none';
$buttonSubirGif.style.display = 'none';
$overlay.style.display = 'none';

let recorder;

const getStreamAndRecord = async () => {
	$crearGifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
	$crearGifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
	$buttonComenzar.style.visibility = 'hidden';
	$step1.classList.add('step-active');

	await navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 640 }
			}
		})
		.then((stream) => {
			$crearGifTitle.classList.add('hidden');
			$crearGifText.classList.add('hidden');
			$step1.classList.remove('step-active');
			$step2.classList.add('step-active');
			$buttonComenzar.style.display = 'none';
			$buttonGrabar.style.display = 'block';
			$video.classList.remove('hidden');
			$video.srcObject = stream;
			$video.play();

			recorder = RecordRTC(stream, {
				type: 'gif',
				frameRate: 1,
				quality: 10,
				width: 360,
				hidden: 240,
				onGifRecordingStarted: function () {
					console.log('started');
				}
			});
		})
		.catch((err) => console.log(err));
};

// Cuando clickea grabar, se ejecuta la cámara
$buttonComenzar.addEventListener('click', getStreamAndRecord);

const createGifo = () => {
	console.log('está grabando');

	$buttonGrabar.style.display = 'none';
	$buttonFinalizar.style.display = 'block';
	$timer.classList.remove('hidden');
	$repeatBtn.classList.add('hidden');
	
	recorder.startRecording();

};

$buttonGrabar.addEventListener('click', createGifo);

const stopCreatingGif = () => {

	recorder.stopRecording(() => {
		$video.classList.add('hidden');
		$recordedGifo.classList.remove('hidden');

		let blob = recorder.getBlob();
        $recordedGifo.src = URL.createObjectURL(recorder.getBlob());
		
	});

	$buttonFinalizar.style.display = 'none';
	$buttonSubirGif.style.display = 'block';
	$timer.classList.add('hidden');
	$repeatBtn.classList.remove('hidden');
}

$buttonFinalizar.addEventListener('click', stopCreatingGif);

// función para subir a Giphy y almacenar el gif en Mis gifos
const uploeadCreatedGif = () => {
	$overlay.style.display = 'flex';
	$step2.classList.remove('step-active');
	$step3.classList.add('step-active');

	// acá falta cambiar el overlay cuando suba el gif con éxito

}


$buttonSubirGif.addEventListener('click', uploeadCreatedGif);

// función para repetir

// $repeatBtn.addEventListener('click', función);


// función para el timer??
