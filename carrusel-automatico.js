const pista = document.getElementById('pista');
const contenedorPuntos = document.getElementById('puntos');
const botonAnterior = document.getElementById('anterior');
const botonSiguiente = document.getElementById('siguiente');

const imagenes = pista.querySelectorAll('img');
const total = imagenes.length;
let actual = 0;
const intervaloMs = 5000;
let temporizador = null;

// Crear un punto por cada imagen
imagenes.forEach((_, indice) => {
  const punto = document.createElement('button');
  punto.setAttribute('aria-label', `Ir a la imagen ${indice + 1}`);
  punto.addEventListener('click', () => irA(indice));
  contenedorPuntos.appendChild(punto);
});

const puntos = contenedorPuntos.querySelectorAll('button');

function actualizarVista() {
  pista.style.transform = `translateX(-${actual * 100}%)`;
  puntos.forEach((punto, indice) => {
    punto.classList.toggle('activo', indice === actual);
  });
}

function irA(indice) {
  actual = (indice + total) % total;
  actualizarVista();
  reiniciarAutoplay();
}

function siguienteImagen() {
  irA(actual + 1);
}

function anteriorImagen() {
  irA(actual - 1);
}

function iniciarAutoplay() {
  temporizador = setInterval(siguienteImagen, intervaloMs);
}

function reiniciarAutoplay() {
  clearInterval(temporizador);
  iniciarAutoplay();
}

botonSiguiente.addEventListener('click', siguienteImagen);
botonAnterior.addEventListener('click', anteriorImagen);

actualizarVista();
iniciarAutoplay();
