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

        // Verificar si el último cálculo guardado es igual al nuevo
        if (historial.length === 0 || historial[historial.length - 1] !== `${expresion} = ${resultado}`) {
            historial.push(`${expresion} = ${resultado}`);
            actualizarHistorial();
        }

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

// Alternar Modo Científico
function toggleModoCientifico() {
    const cientificaContainer = document.getElementById('cientifica-container');
    cientificaContainer.style.display = cientificaContainer.style.display === 'none' ? 'grid' : 'none';
}

// Agregar funciones matemáticas científicas
function agregarFuncion(func) {
    const display = document.getElementById('display');
    let valor = parseFloat(display.value);

    if (isNaN(valor)) return;

    let resultado;
    switch (func) {
        case 'sin': resultado = Math.sin(valor * Math.PI / 180); break;
        case 'cos': resultado = Math.cos(valor * Math.PI / 180); break;
        case 'tan': resultado = Math.tan(valor * Math.PI / 180); break;
        case 'log': resultado = Math.log10(valor); break;
        case 'ln': resultado = Math.log(valor); break;
        case 'sqrt': resultado = Math.sqrt(valor); break;
        case 'exp': resultado = Math.exp(valor); break;
        case 'pi': resultado = Math.PI; break;
        case 'pow': resultado = Math.pow(valor, 2); break;
        case 'inv': resultado = 1 / valor; break;
        default: return;
    }

    display.value = resultado;
}

function limpiarHistorial() {
    historial = [];
    actualizarHistorial();
}

function retroceder() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function toggleTema() {
    document.body.classList.toggle('tema-oscuro');
}