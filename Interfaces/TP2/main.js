let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 10;

let figuras = [];
let ultimaFiguraClickeada = null;
let isMouseDown = false;

function dibujarDosFilasDeFichas() {
    let numFila = 7;
    let numColumna = 2;
    let espaciadoFicha = 10;
    let fichaWidth = 40;
    let fichaHeight = 40;
    let topSpacing = 30;

    for (let fila = 0; fila < numFila; fila++) {
        for (let columna = 0; columna < numColumna; columna++) {
            let x;
            if (columna === 0) {
                x = topSpacing + columna * (fichaWidth + espaciadoFicha);
                ctx.fillStyle = 'rgba(0, 0, 255, 1)';
            } else {
                x = canvasWidth - topSpacing - (columna * (fichaWidth + espaciadoFicha) + fichaWidth);
                ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            }
            let y = canvasHeight - ((numFila - fila) * (fichaHeight + espaciadoFicha));

            let ficha = new Ficha(x + fichaWidth / 2, y + fichaHeight / 2, ctx.fillStyle, ctx, fichaWidth / 2);
            figuras.push(ficha);
            ficha.dibujar();
        }
    }
}

window.onload = function() {
    dibujarDosFilasDeFichas();
};


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

function onMounseDown(e){
    isMouseDown = true;
    if(ultimaFiguraClickeada != null){
        ultimaFiguraClickeada.setResaltado(false);
        ultimaFiguraClickeada = false;
    }

    let clickFicha = encontrarFichaClickeada(e.layerX, e.layerY);
    if(clickFicha != null){
        clickFicha.setResaltado(true);
        ultimaFiguraClickeada = clickFicha;
    }
    dibujarFicha();
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