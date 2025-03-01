let historial = [];
let resultadoMostrado = false;

// Alternar menú lateral
function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    menu.classList.toggle('active');
}

//Cerrar el menu si hacemos click fuera de él
document.addEventListener('click', function (event) {
    const menu = document.getElementById('menu-lateral');
    const botonMenu = document.querySelector('.menu-btn');

    if(!menu.contains(event.target) && !botonMenu.contains(event.target)) {
        menu.classList.remove('active');
    }
});

// Alternar la visibilidad del historial
function toggleHistorial() {
    const historialContainer = document.getElementById('historial-container');
    historialContainer.style.display = historialContainer.style.display === 'none' ? 'block' : 'none';
}

// Agregar valores al display
function agregarValor(valor) {
    const display = document.getElementById('display');

    if (resultadoMostrado && !isNaN(valor)) {
        display.value = '';
        resultadoMostrado = false;
    }

    if (["Error", "undefined"].includes(display.value)) {
        display.value = '';   
        if (["+","-","*","/"].includes(valor)) {
            return;
        }
    }
    display.value += valor;
}

// Calcular resultado y agregarlo al historial
function calcularResultado() {
    const display = document.getElementById('display');
    try {
        const expresion = display.value;
        const resultado = eval(expresion);

        historial.push(`${expresion} = ${resultado}`);
        actualizarHistorial();

        display.value = resultado;
        resultadoMostrado = true;
    } catch (error) {
        display.value = 'Error';
        resultadoMostrado = true;
    }
}

// Limpiar el display
function borrar() {
    document.getElementById('display').value = '';
}

// Actualizar historial en la interfaz
function actualizarHistorial() {
    const historialLista = document.getElementById('historial-lista');
    historialLista.innerHTML = "";

    historial.forEach(calculo => {
        const li = document.createElement("li");
        li.innerText = calculo;
        historialLista.appendChild(li);
    });

    historialLista.scrollTop = historialLista.scrollHeight;
}
