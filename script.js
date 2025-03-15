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

    if (resultadoMostrado) {
        if (!isNaN(valor) || valor === '.') {
            display.value = '';
        }
        resultadoMostrado = false;
    }

    if (["Error", "undefined"].includes(display.value)) {
        display.value = '';
        if (["+", "-", "*", "/"].includes(valor)) {
            return;
        }
    }

    display.value += valor;
}

// Calcular resultado y agregarlo al historial
function calcularResultado() {
    const display = document.getElementById('display');
    let expresion = display.value.trim();

    // ✅ Evitar evaluación si ya hay "Error"
    if (expresion === "Error" || expresion === "undefined") {
        display.value = '';
        resultadoMostrado = false;
        return;
    }

    try {
        // 🧠 Reemplazos para funciones matemáticas
        expresion = expresion.replace(/π/g, 'Math.PI');
        expresion = expresion.replace(/sin\(/g, 'Math.sin((Math.PI/180)*');
        expresion = expresion.replace(/cos\(/g, 'Math.cos((Math.PI/180)*');
        expresion = expresion.replace(/tan\(/g, 'Math.tan((Math.PI/180)*');
        expresion = expresion.replace(/log\(/g, 'Math.log10(');
        expresion = expresion.replace(/ln\(/g, 'Math.log(');
        expresion = expresion.replace(/sqrt\(/g, 'Math.sqrt(');
        expresion = expresion.replace(/exp\(/g, 'Math.exp(');
        expresion = expresion.replace(/\^/g, '**');

        // Cierre automático de paréntesis
        const numOpen = (expresion.match(/\(/g) || []).length;
        const numClose = (expresion.match(/\)/g) || []).length;
        if (numOpen > numClose) {
            expresion += ')'.repeat(numOpen - numClose);
        }

        const resultado = eval(expresion);

        if (historial.length === 0 || historial[historial.length - 1] !== `${display.value} = ${resultado}`) {
            historial.push(`${display.value} = ${resultado}`);
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
    let valorActual = display.value.trim();
    let ultimoChar = valorActual.slice(-1);

    // Si el último carácter es un número o una letra (como otra función), reemplazar todo
    if (/\d|\)|[a-z]$/i.test(ultimoChar) || resultadoMostrado) {
        display.value = '';
        resultadoMostrado = false;
    }

    let funcionFormateada = '';

    switch (func) {
        case 'sin': funcionFormateada = 'sin('; break;
        case 'cos': funcionFormateada = 'cos('; break;
        case 'tan': funcionFormateada = 'tan('; break;
        case 'log': funcionFormateada = 'log('; break;
        case 'ln':  funcionFormateada = 'ln('; break;
        case 'sqrt': funcionFormateada = 'sqrt('; break;
        case 'exp': funcionFormateada = 'exp('; break;
        case 'pi': display.value += 'π'; return;
        case 'pow': funcionFormateada = '^'; break;
        case 'inv': funcionFormateada = '1/'; break;
        default: return;
    }

    display.value += funcionFormateada;
}


function limpiarHistorial() {
    historial = [];
    actualizarHistorial();
}

function retroceder() {
    const display = document.getElementById('display');
    let valor = display.value;

    // Borrar todo si se acaba de mostrar un resultado
    if (resultadoMostrado) {
        display.value = '';
        resultadoMostrado = false;
        return;
    }

    // Detectar funciones como sin(, cos(, log(, etc. y borrarlas completas
    const funciones = ['sin(', 'cos(', 'tan(', 'log(', 'ln(', 'sqrt(', 'exp('];
    for (let func of funciones) {
        if (valor.endsWith(func)) {
            display.value = valor.slice(0, -func.length);
            return;
        }
    }

    // Borrar un solo carácter como antes
    display.value = valor.slice(0, -1);
}


function toggleTema() {
    document.body.classList.toggle('tema-oscuro');
}

function copiarResultado() {
    const display = document.getElementById('display');
    const valor = display.value;

    if (valor !== '') {
        navigator.clipboard.writeText(valor).then(() => {
            const boton = document.getElementById('copiar-btn');
            setTimeout(() => boton.textContent = original, 1500);
        });
    }
}