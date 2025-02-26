let historial = [];

function agregarValor(valor) {
    const display = document.getElementById('display');
    // Limpiar el campo si contiene un mensaje de error
    if (["Error", "undefined"].includes(display.value)) {
        display.value = '';   
        // Evitar agregar operadores inmediatamente después de limpiar el campo
        if (["+","-","*","/"].includes(valor)) {
            return; // No hacer nada si el valor es un operador
        }
    }
    // Agregar el nuevo valor al campo
    display.value += valor;
}

function calcularResultado(){
    const display = document.getElementById('display');
    try{
        const expresion = display.value;
        const resultado = eval(expresion);
        
        historial.push(`${expresion} = ${resultado}`);
        actualizarHistorial();

        display.value = resultado;
    }catch(error){
        display.value = 'Error';
    }
}

function borrar(){
    const display = document.getElementById('display');
    display.value = '';
}

function actualizarHistorial(){
    const historialLista = document.getElementById('historial-lista');
    historialLista.innerHTML = "";

    historial.forEach(calculo => {
        const li = document.createElement("li");
        li.innerText = calculo;
        historialLista.appendChild(li);
    });
}