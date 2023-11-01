let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 10;

let figuras = [];
let ultimaFiguraClickeada = null;
let isMouseDown = false;

let jugador1ImagenSeleccionada = '';
let jugador2ImagenSeleccionada = '';

function seleccionarPersonaje(jugador, imagen) {
    if (jugador === 'jugador1') {
        jugador1ImagenSeleccionada = imagen;
    } else if (jugador === 'jugador2') {
        jugador2ImagenSeleccionada = imagen;
    }

    if (jugador1ImagenSeleccionada !== '' && jugador2ImagenSeleccionada !== '') {
        dibujarDosFilasDeFichas(jugador1ImagenSeleccionada, jugador2ImagenSeleccionada);
        ocultarOpcionesJugadores(); 
    }
}

function ocultarOpcionesJugadores() {
    const opcionesJugador1 = document.getElementById('jugador1');
    const opcionesJugador2 = document.getElementById('jugador2');

    if (opcionesJugador1 && opcionesJugador2) {
        opcionesJugador1.style.display = 'none'; 
        opcionesJugador2.style.display = 'none'; 
    }
}


function dibujarDosFilasDeFichas(imagenJugador1, imagenJugador2) {
    clearCanvas();

    const numFila = 21;
    const numColumna = 2;
    const espaciadoFicha = -20;
    const fichaWidth = 40;
    const fichaHeight = 40;
    const topSpacing = 30;

    const imagenes = [imagenJugador1, imagenJugador2];

    let imagenIndex = 0;

    for (let fila = 0; fila < numFila; fila++) {
        for (let columna = 0; columna < numColumna; columna++) {
            let x;
            if (columna === 0) {
                x = topSpacing + columna * (fichaWidth + espaciadoFicha);
            } else {
                x = canvasWidth - topSpacing - (columna * (fichaWidth + espaciadoFicha) + fichaWidth);
            }
            let y = canvasHeight - ((numFila - fila) * (fichaHeight + espaciadoFicha));

            const img = new Image();
            img.src = imagenes[imagenIndex];
            imagenIndex = (imagenIndex + 1) % imagenes.length;

            const ficha = new Ficha(x, y, img, ctx, fichaWidth, fichaHeight);
            figuras.push(ficha);

            img.onload = function () {
                ficha.dibujar();
            };
        }
    }
    iniciarTemporizador();
}

function agregarFicha(){
    let posX = Math.round(Math.random() * canvasWidth);
    let posY = Math.round(Math.random() * canvasHeight);

    let ficha = new Ficha(posX, posY, color, ctx, 10); 
    figuras.push(ficha);
    dibujarFicha();
}

function dibujarFicha(){
    clearCanvas();
    for(let i = 0; i < figuras.length; i++){
        figuras[i].dibujar();
    }
}

function clearCanvas(){
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
}

//function agregarFichas(){
    //agregarFicha();
    //if(figuras.length < CANT_FIG){
     //   setTimeout(agregarFichas(), 333);
    //}
//}

//setTimeout(()=>{
   // agregarFichas();
//}, 333);

function onMounseDown(e) {
    isMouseDown = true;
    if (ultimaFiguraClickeada !== null) {
        ultimaFiguraClickeada.setResaltado(false);
        ultimaFiguraClickeada = null;
        dibujarFicha();
    }

    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    let clickFicha = encontrarFichaClickeada(x, y);
    if (clickFicha !== null) {
        clickFicha.setResaltado(true);
        ultimaFiguraClickeada = clickFicha;
    }
    dibujarFicha();
}

function encontrarFichaClickeada(x, y) {
    for (let i = figuras.length - 1; i >= 0; i--) {
        const ficha = figuras[i];
        if (ficha.punteroDentro(x, y)) {
            return ficha;
        }
    }
    return null; 
}

function onMouseUp(e){
    isMouseDown = false;
}

function onMouseMove(e){
    if(isMouseDown && ultimaFiguraClickeada != null){
        ultimaFiguraClickeada.setPosicion(e.layerX, e.layerY);
        dibujarFicha();
    }
}

function encontrarFichaClickeada(x,y){
    for(let i = 0; i < figuras.length; i++){
        const ficha = figuras[i];
        if(ficha.punteroDentro(x,y)){
            return ficha;
        }
    }
}

canvas.addEventListener('mousedown', onMounseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);
canvas.addEventListener('mousemove', onMouseMove, false);

let tiempoRestante = 10;
let temporizador;

function actualizarTemporizador() {
    const tiempoMostrado = document.getElementById('tiempo');
    tiempoMostrado.innerText = `Tiempo: ${tiempoRestante} segundos`;

    if (tiempoRestante === 0) {
        clearInterval(temporizador);
        mostrarMensajeEmpate();
    } else {
        tiempoRestante--;
    }
}

function mostrarMensajeEmpate() {
    const mensaje = document.createElement('div');
    mensaje.innerText = '¡Es un empate!';
    mensaje.classList.add('mensaje-empate');
    document.body.appendChild(mensaje);
}


function iniciarTemporizador() {
    temporizador = setInterval(actualizarTemporizador, 1000); // Actualizar cada segundo
}

