// Definición de las reacciones químicas con coeficientes estequiométricos correctos
const reaccionesQuimicas = [
    { 
        reactivos: [{nombre: 'H2', coeficiente: 2}, {nombre: 'O2', coeficiente: 1}],
        productos: [{nombre: 'H2O', coeficiente: 2}]
    },
    { 
        reactivos: [{nombre: 'CH4', coeficiente: 1}, {nombre: 'O2', coeficiente: 2}],
        productos: [{nombre: 'CO2', coeficiente: 1}, {nombre: 'H2O', coeficiente: 2}]
    },
    { 
        reactivos: [{nombre: 'C3H8', coeficiente: 1}, {nombre: 'O2', coeficiente: 5}],
        productos: [{nombre: 'CO2', coeficiente: 3}, {nombre: 'H2O', coeficiente: 4}]
    },
    { 
        reactivos: [{nombre: 'Al', coeficiente: 2}, {nombre: 'Fe2O3', coeficiente: 1}],
        productos: [{nombre: 'Al2O3', coeficiente: 1}, {nombre: 'Fe', coeficiente: 2}]
    },
    { 
        reactivos: [{nombre: 'FeS2', coeficiente: 4}, {nombre: 'O2', coeficiente: 11}],
        productos: [{nombre: 'Fe2O3', coeficiente: 2}, {nombre: 'SO2', coeficiente: 8}]
    },
    { 
        reactivos: [{nombre: 'NH3', coeficiente: 4}, {nombre: 'O2', coeficiente: 5}],
        productos: [{nombre: 'NO', coeficiente: 4}, {nombre: 'H2O', coeficiente: 6}]
    },
    { 
        reactivos: [{nombre: 'H2', coeficiente: 3}, {nombre: 'N2', coeficiente: 1}],
        productos: [{nombre: 'NH3', coeficiente: 2}]
    },
    { 
        reactivos: [{nombre: 'C2H6', coeficiente: 2}, {nombre: 'O2', coeficiente: 7}],
        productos: [{nombre: 'CO2', coeficiente: 4}, {nombre: 'H2O', coeficiente: 6}]
    },
    { 
        reactivos: [{nombre: 'Mg', coeficiente: 1}, {nombre: 'HCl', coeficiente: 2}],
        productos: [{nombre: 'MgCl2', coeficiente: 1}, {nombre: 'H2', coeficiente: 1}]
    },
    { 
        reactivos: [{nombre: 'Na', coeficiente: 2}, {nombre: 'H2O', coeficiente: 2}],
        productos: [{nombre: 'NaOH', coeficiente: 2}, {nombre: 'H2', coeficiente: 1}]
    }
];

let currentReaccion = 0; // Índice de la reacción actual

// Función para generar la reacción química actual en el HTML
function generarReaccionActual() {
    const reaccionesContainer = document.getElementById('reacciones');
    reaccionesContainer.innerHTML = ''; // Limpiar contenido previo

    const reaccion = reaccionesQuimicas[currentReaccion];
    const divReaccion = document.createElement('div');
    divReaccion.classList.add('reaccion');
    divReaccion.innerHTML = `<h3>Reacción ${currentReaccion + 1}</h3>`;

    // Generar campos de entrada para los reactivos
    reaccion.reactivos.forEach((reactivo, i) => {
        divReaccion.innerHTML += `<input class="input-coeficiente" type="text" maxlength="2" placeholder="">${reactivo.nombre}`;
        if (i < reaccion.reactivos.length - 1) {
            divReaccion.innerHTML += ' + ';
        } else {
            divReaccion.innerHTML += ' --> ';
        }
    });

    // Generar campos de entrada para los productos
    reaccion.productos.forEach((producto, i) => {
        divReaccion.innerHTML += `<input class="input-coeficiente" type="text" maxlength="2" placeholder="">${producto.nombre}`;
        if (i < reaccion.productos.length - 1) {
            divReaccion.innerHTML += ' + ';
        }
    });

    // Espacio antes del botón de verificar
    divReaccion.innerHTML += '<br><br>';

    // Botón de verificar
    const btnVerificar = document.createElement('button');
    btnVerificar.textContent = 'Verificar';
    btnVerificar.classList.add('btn-verificar');
    btnVerificar.onclick = () => {
        verificarReaccion();
    };
    divReaccion.appendChild(btnVerificar);

    reaccionesContainer.appendChild(divReaccion);
}

// Función para verificar la reacción química actual
function verificarReaccion() {
    const inputs = document.querySelectorAll('.reaccion input');
    let esBalanceada = true;

    inputs.forEach((input, i) => {
        const valorUsuario = parseInt(input.value);
        const coeficienteCorrecto = reaccionesQuimicas[currentReaccion].reactivos.concat(reaccionesQuimicas[currentReaccion].productos)[i].coeficiente;

        if (isNaN(valorUsuario) || valorUsuario <= 0 || valorUsuario !== coeficienteCorrecto) {
            esBalanceada = false;
            return;
        }
    });

    if (esBalanceada) {
        // Reproducir sonido de éxito
        const audioExito = document.getElementById('audio-exito');
        audioExito.currentTime = 0; // Reiniciar el audio si ya está en reproducción
        audioExito.play();

        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = 'La Reacción está correctamente Balanceada';

        // Mostrar botón de siguiente si no es la última reacción
        if (currentReaccion < reaccionesQuimicas.length - 1) {
            const btnSiguiente = document.createElement('button');
            btnSiguiente.textContent = 'Siguiente Reacción';
            btnSiguiente.classList.add('btn-siguiente');
            btnSiguiente.onclick = () => {
                mensaje.textContent = '';
                currentReaccion++;
                generarReaccionActual();
            };
            mensaje.appendChild(btnSiguiente);
        }

        // Verificar si ha completado todas las reacciones
        if (currentReaccion === reaccionesQuimicas.length - 1) {
            mensaje.textContent = '¡Felicitaciones, lo has logrado!';
        }
    } else {
        const mensaje = document.getElementById('mensaje');
        mensaje.textContent = 'La reacción no está Balanceada en masa';
    }
}

// Función para iniciar el juego
function iniciarJuego() {
    // Reproducir sonido de inicio
    const audioInicio = document.getElementById('audio-inicio');
    audioInicio.currentTime = 0; // Reiniciar el audio si ya está en reproducción
    audioInicio.play();

    // Ocultar el mensaje inicial
    const mensajeInicial = document.getElementById('mensaje-inicial');
    mensajeInicial.style.display = 'none';

    // Generar la primera reacción química
    generarReaccionActual();
}

// Al cargar la página, mostrar el mensaje inicial
document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el mensaje inicial
    const mensajeInicial = document.getElementById('mensaje-inicial');
    mensajeInicial.style.display = 'block';
});

