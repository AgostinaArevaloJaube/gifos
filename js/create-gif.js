/*

*Separar todos los elementos del DOM para tenerlos a mano.

Pasitos desglosados:
? click en COMENZAR --> 
	* Se "activa" el STEP 1 ($step1 cambia de estilos) 
		podría hacer una clase para sacar  o poner esos estilos
	* Cambia el titulo($crearGifTitle) 
		'¿Nos das acceso </br>a tu cámara?';
	* Cambia el texto ($crearGifText) 
		'El acceso a tu camara será válido sólo </br>por el tiempo en el que estés creando el GIFO.'
	* Pide el permiso, sale el cartel emergente
	* Desaparece el botón ($buttons).
	* Una vez que acepta, aparece el botón GRABAR 
		($buttons.innerHTML = 'GRABAR'):
		* Cambia STEP 2 ($step1 cambia de estilos)
			idem clases step 1
		* Aparece la previsualización del video
			en una etiqueta video? 

? click en GRABAR
	* Aparece botón FINALIZAR
	* Aparece el timer
		Le saco hidden ($timer)
		función que calcule el tiempo KE
	* Empieza a grabar

? click en FINALIZAR
	* Cambia a botón SUBIR GIFO
		Modifico por $buttons.innerHTML = 'SUBIR GIFO'
	* Cambia a STEP 3
		idem clases step 
	* Apaprece REPETIR CAPTURA
		Le saco hidden ($repeatBtn), se lo pongo al timer ($timer)

? click en SUBIR GIFO
	* SUBIENDO GIFO 
		* función que suba el gif y cambie esto? :
		Aparece SOBRE EL VIDEO el overlay:
		Cambia el titulo: 
		$overlayStatusText.innerHTML = 'Estamos subiendo tu GIFO';

	* GIFO SUBIDO CON ESITO 
		* 1. Cambia el texto e ícono:
			$overlayStatusText.innerHTML = 'GIFO subido con éxito'
			Cambia el ícono: $overlayStatusIcon.src = 'assets/check.svg'
		* 2. Se envía a MIS GIFOS
	
		* 3. Al overlay le aparecen los botones de descargar o copiar link?

? click en REPETIR CAPTURA
	* Vuelve al estado 2? Grabar?
	* Acá habría que resetear textos del bottón a comenzar

*/
$buttonGrabar.style.display = 'none';
$buttonFinalizar.style.display = 'none';
$buttonSubirGif.style.display = 'none';

let recorder;

function getStreamAndRecord() {
	$crearGifTitle.innerHTML = `¿Nos das acceso <br> a tu cámara?`;
	$crearGifText.innerHTML = `El acceso a tu camara será válido sólo <br> por el tiempo en el que estés creando el GIFO.`;
	$buttonComenzar.style.visibility = 'hidden';

	navigator.mediaDevices
		.getUserMedia({
			audio: false,
			video: {
				height: { max: 640 }
			}
		})
		.then((stream) => {
			$crearGifTitle.classList.add('hidden');
			$crearGifText.classList.add('hidden');
			$step1.classList.add('step-active');
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
}

// Cuando clickea grabar, se ejecuta la cámara
$buttonComenzar.addEventListener('click', getStreamAndRecord);
