let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');

let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

const CANT_FIG = 10;

let figuras = [];
let ultimaFiguraClickeada = null;
let isMouseDown = false;



function dibujarDosFilasDeFichas() {
    let numFila = 21;
    let numColumna = 2;
    let espaciadoFicha = -20;
    let fichaWidth = 40;
    let fichaHeight = 40;
    let topSpacing = 30;

    const imagenes = ['https://yoolk.ninja/wp-content/uploads/2020/06/Games-Valorant-1024x1024.png', 'https://get.wallhere.com/photo/logo-circle-Counter-Strike-Global-Offensive-poster-brand-EnVyUs-LGB-eSports-darkness-number-screenshot-computer-wallpaper-font-trademark-141314.jpg']; // Reemplaza con las rutas de tus imágenes

    let imagenIndex = 0; 

    for (let fila = 0; fila < numFila; fila++) {
        for (let columna = 0; columna < numColumna; columna++) {
            let x;
            if (columna === 0) {
                x = topSpacing + columna * (fichaWidth + espaciadoFicha);
            } else {
                x = canvas.width - topSpacing - (columna * (fichaWidth + espaciadoFicha) + fichaWidth);
            }
            let y = canvas.height - ((numFila - fila) * (fichaHeight + espaciadoFicha));

            const img = new Image();
            img.src = imagenes[imagenIndex];
            imagenIndex = (imagenIndex + 1) % imagenes.length; 

            const ficha = new Ficha(x, y, img, ctx, fichaWidth, fichaHeight);
            figuras.push(ficha);

            img.onload = function() {
                ficha.dibujar();
            };
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