var palabrasContestadas = 0;
var contadorElemento = document.getElementById('contador');
const image = document.getElementById('image');


function incrementarContador() {
    palabrasContestadas++;
    contadorElemento.textContent = palabrasContestadas;
}
// Código JavaScript

var esferasContainer = document.getElementById('esferasContainer');
var esferas = [];
var esferasCount = 26;

// Calcular el ángulo de separación entre las esferas
var angleStep = (2 * Math.PI) / esferasCount;

// Generar las esferas y posicionarlas en el contenedor
for (var i = 0; i < esferasCount; i++) {
    var angle = -Math.PI / 2 + i * angleStep; // Comenzar en la posición de la letra A (-Math.PI / 2)
    var radius = 350; /* Ajusta el radio del círculo */

    var x = Math.cos(angle) * radius;
    var y = Math.sin(angle) * radius;

    var esfera = document.createElement('div');
    esfera.classList.add('esfera');
    esfera.textContent = String.fromCharCode(65 + i); // Letras del alfabeto en mayúscula (A-Z)

    esfera.style.left = (400 + x - 60) + 'px'; /* Ajusta el centrado horizontal de las esferas */
    esfera.style.top = (400 + y - 60) + 'px'; /* Ajusta el centrado vertical de las esferas */

    esferasContainer.appendChild(esfera);
    esferas.push(esfera);
}

// Verificar si el navegador soporta la API de MediaDevices
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Obtener acceso a la webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            var video = document.getElementById('webcam');
            video.srcObject = stream;
            video.play();
            video.style.display = 'block';
                image.style.display = 'none';
        })
        .catch(function(error) {
            console.error('Error al acceder a la webcam: ', error);
            video.style.display = 'none';
            image.style.display = 'block';
        });
} else {
    console.error('La API de MediaDevices no es soportada por este navegador.');
}

// Obtener todas las esferas
var esferas = document.querySelectorAll('.esfera');

// Agregar evento click a las esferas
esferas.forEach(function(esfera) {
    esfera.addEventListener('click', function() {
        // Remover la clase "selected" de todas las esferas
        esferas.forEach(function(esfera) {
            esfera.classList.remove('selected');
        });

        // Agregar la clase "selected" a la esfera seleccionada
        this.classList.add('selected');
    });
});


var acceptButton = document.getElementById('acceptButton');
var rejectButton = document.getElementById('rejectButton');
var timerButton = document.getElementById('timerButton');

var esferas = Array.from(document.querySelectorAll('.esfera'));
var esferasLength = esferas.length;
var selectedEsferaIndex = 0;

acceptButton.addEventListener('click', function() {
    var selectedEsfera = esferas[selectedEsferaIndex];

    // Cambiar el color de la esfera a verde y marcarla como contestada
    selectedEsfera.classList.add('green');
    selectedEsfera.classList.add('answered');
    incrementarContador();

    // Seleccionar la siguiente esfera no contestada
    selectNextAvailableEsfera();
});

rejectButton.addEventListener('click', function() {
    var selectedEsfera = esferas[selectedEsferaIndex];

    // Cambiar el color de la esfera a rojo y marcarla como contestada
    selectedEsfera.classList.add('red');
    selectedEsfera.classList.add('answered');

    // Seleccionar la siguiente esfera no contestada
    selectNextAvailableEsfera();
});

var timerRunning = false;
var timerSeconds = 300;
var timerInterval;
var timerElement = document.querySelector('.timer');

timerButton.addEventListener('click', function() {
    if (timerRunning) {
        stopTimer();
        timerRunning = false;
        selectNextAvailableEsfera(); // Seleccionar la siguiente esfera al iniciar el temporizador

    } else {
        startTimer();
        timerRunning = true;
    }
});

function selectNextAvailableEsfera() {
    var initialSelectedEsferaIndex = selectedEsferaIndex;
    var allEsferasAnswered = true; // Variable para verificar si todas las esferas han sido contestadas

    // Encontrar la siguiente esfera no contestada
    do {
        selectedEsferaIndex++;
        if (selectedEsferaIndex >= esferasLength) {
            selectedEsferaIndex = 0;
        }

        // Si se alcanza el índice de la esfera seleccionada inicialmente, significa que no hay más esferas disponibles
        if (selectedEsferaIndex === initialSelectedEsferaIndex) {
            // Si todas las esferas han sido contestadas, mostrar un mensaje de finalización
            if (allEsferasAnswered) {
                alert("¡Finalizado!"); // Puedes cambiar esto por cualquier otra acción que desees realizar
            }
            return; // No seleccionar ninguna esfera
        }

        // Verificar si la esfera actual ha sido contestada
        if (!esferas[selectedEsferaIndex].classList.contains('answered')) {
            allEsferasAnswered = false;
        }
    } while (esferas[selectedEsferaIndex].classList.contains('answered'));

    // Remover la clase "selected" de todas las esferas
    esferas.forEach(function(esfera) {
        esfera.classList.remove('selected');
    });

    // Agregar la clase "selected" a la siguiente esfera no contestada
    esferas[selectedEsferaIndex].classList.add('selected');
}
function startTimer() {
    timerInterval = setInterval(function() {
        timerSeconds--;
        // Actualizar el elemento en el DOM con el valor del temporizador
        timerElement.textContent = timerSeconds;

        if (timerSeconds === 0) {
            stopTimer();
            // Se ha alcanzado el final del tiempo, realizar acciones necesarias
            // ...
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}
