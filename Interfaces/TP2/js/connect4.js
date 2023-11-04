let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d')
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;

let pantallaGanador = document.getElementById('ganador')
let nombreGanador = document.getElementById('ganador-nombre')
let form = document.querySelector('form')

document.getElementById('reset-btn').onclick = function() {
    document.querySelector('form').style.display = "flex"
    document.getElementById("ganador").style.display = "none";

    //reset (arreglar fondo)
    clearAll();
}

let img = document.getElementById('connect4-img');
let flecha = document.getElementById('flecha');
let recarga = document.getElementById('reload');

let fotoPersonaje1;
let fotoPersonaje2;
let timer;
let gameData;
let juego;
let tablero = [];
let squarePos = [];
let posicionesTablero ;
let font = new FontFace('alarm-font', 'url(assets/font/alarm-clock.ttf)');

font.load().then(function(font) {
    document.fonts.add(font);
})



let personajes = [
    {
        nombre: "Counter-Strike",
        ficha: "./assets/img/chip/Counter-Strike.png",
    },
    {
        nombre: "CSGO",
        ficha: "./assets/img/chip/CSGO.png",
    },
    {
        nombre: "Valorant",
        ficha: "./assets/img/chip/Valorant.png",
    },
    {
        nombre: "Valorant2",
        ficha: "./assets/img/chip/Valorant2.png",
        
    }
]

let formData = document.querySelector('form')
.addEventListener('submit', e => {
    e.preventDefault()
    const data = Object.fromEntries(
        new FormData(e.target)
    )
    gameData = data;
    init(data)
})



canvas.addEventListener('mouseup', (e) => {
    mouseUp(e);
})
canvas.addEventListener('mousedown', (e) => {
    mouseDown(e);
})
canvas.addEventListener('mousemove', (e) => {
    arrastrarFicha(e);
})

function init(data) {
    form.style.display = 'none';
    juego = new Game();
    posicionesTablero = juego.getPosicionesTablero();
    setReglas(data);
}



function setReglas(data){
    let reglas = data.connect;
    let fila = 6;
    let columna = 7;
    let cant = 21;
    

    if(reglas == 5){
        fila += 1
        columna += 1
        cant = 28
    }else if(reglas == 6){
        fila += 2
        columna += 2
        cant = 36;
    }
    cargarTablero(fila,columna);
    setearPersonajes(data.player_1, data.player_2, cant);
    dibujarTimer()
}

function setearPersonajes(jugador_1, jugador_2, cant){
    let jugador_personaje_1 = personajes.find(o => o.nombre === jugador_1)
    let jugador_personaje_2 = personajes.find(o => o.nombre === jugador_2)

    let fichas_1 = jugador_personaje_1.ficha
    let fichas_2 = jugador_personaje_2.ficha

    fotoPersonaje1 = document.querySelector(`#${jugador_personaje_1.nombre}Pic`)
    fotoPersonaje2 = document.querySelector(`#${jugador_personaje_2.nombre}Pic`)

    juego.agregarJugadores(jugador_personaje_1, jugador_personaje_2)
    crearFichas(cant, fichas_1, fichas_2)
    
}

function dibujarPersonajes(){
    let x = canvasWidth / 2
    let y = canvasHeight - 20
    ctx.font = "30px alarm-font";
    ctx.fillStyle = "#f1fe78";
    ctx.textAlign = "center";
    ctx.fillText(`${gameData.player_1}`, x - 380 , y-500)
    ctx.fillText(`${gameData.player_2}`, x + 380 , y-500)
}

function dibujarTimer() {
    if(recarga) recarga.addEventListener

    let i = 90;
    interval = setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dibujarTablero()
        dibujarFichas()
        let x = canvasWidth / 2
        let y = canvasHeight - 20
        ctx.font = "30px alarm-font";
        ctx.fillStyle = "#f1fe78";
        ctx.textAlign = "center";
        ctx.fillText(`${i} Segundos`, x-(60 * gameData.connect), y);
        if(gameData.connect != 6){
            ctx.fillText(` - `, x + 20, y);
        }
        ctx.fillText(`Reiniciar`,  x+(60 * gameData.connect) , y);
        i--;
        if(i === 0) {
            juego.setTurno()
            i = 30;
        }
    }, 1000);
}

function cargarTablero(fila,columna){
    for (let i = 0; i < fila; i++) {
        let row = []
        for (let j = 0; j < columna; j++) {
            row.push(null)
        }
        posicionesTablero.push(row);    
    }
}

function crearFichas(cant, fichas_1, fichas_2) {
    let players = juego.getJugadores();
    
    for (let j = 0; j < players.length; j++) {
        for (let i = 0; i < cant; i++) {
            if (players[j].getId() === 1) {
                let x = 95;
                let y = 150;
                let img = fichas_1;
                let ficha = new Chip(
                    x,
                    y,
                    img,
                    players[j].getId(),
                    players[j].getEstaJugando()
                );

                players[j].agregarFicha(ficha);
            } else {
                let x = 855
                let y = 150;
                let img = fichas_2;

                let chip = new Chip(
                    x,
                    y,
                    img,
                    players[j].getId(),
                    players[j].getEstaJugando()
                );
                players[j].agregarFicha(chip);
            }
        }
        dibujarFichas();
    }
}


function dibujarTablero(){
    squarePos = [];
    let pos = canvas.width/4; 
    let posy= canvas.height/6
    for (let i = 0; i < posicionesTablero.length; i++) {
        let row = posicionesTablero[i]
        for (let j = 0; j < row.length; j++) {
            if(row[j] != null){
                row[j].setX((pos + j*61)+ (60/2) )
                row[j].setY((posy + i*61)+ (60/2))
            }
            ctx.drawImage(img,pos + j*61,posy + i*61, 60 ,60)
            
            if(i == 0){
                let throwPos = {
                    x: pos + j*61,
                    y: posy - 61,
                    w : 60,
                    h : 60
                }
                squarePos.push(throwPos)
                ctx.drawImage(flecha,pos + j*61,posy - 61, 60 ,60)
            }
        }
    }
}

function dibujarFichas() {
    let players = juego.getJugadores();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarPersonajes()
    dibujarTablero();
    for (let j = 0; j < players.length; j++) {
        let chips = players[j].getFichas();
        for (let i = 0; i < chips.length; i++) {
            chips[i].draw();
        }
    }
}

function estaSoltada(x,y){
    for (let i = 0; i < squarePos.length; i++) {
        if(!(x < squarePos[i].x || x > squarePos[i].x + squarePos[i].w || y < squarePos[i].y || y > squarePos[i].y + squarePos[i].h)){
            return i
        }
    }
    return -1;
}

function mouseUp(e) {
    if(juego.getEstaArrastrando()){
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        let columnaPos = estaSoltada(x,y)
        if(columnaPos >= 0){
            let filaPos = verificarPosicion(columnaPos)
            agregarFicha(filaPos, columnaPos)
            dibujarFichas();
            juego.setTurno();
            clearInterval(interval)
            dibujarTimer()
            let ganador = juego.verificarGanador(columnaPos, filaPos , gameData.connect)
            let nombres_ganador = juego.getJugadores()
            if(ganador != undefined) {
                if(ganador[0] === true) {
                   pantallaGanador.style.display = "flex"
                    nombreGanador.innerHTML = `<h1>${nombres_ganador[ganador[1]-1].nombre}</h1>`
                }
            }
        }else{
            juego.getFichaAnteriorSeleccionada().reiniciarPosicion();
            dibujarFichas();
        }
    }
    juego.setEstaArrastrando(false)
    
}

function agregarFicha(filaPos, columnaPos){
    posicionesTablero[filaPos][columnaPos] = juego.getFichaAnteriorSeleccionada();
}

function verificarPosicion(pos){
    let i;
    for (let index = 0; index < posicionesTablero.length; index++) {
       let aux = posicionesTablero[index]
        for (let j = 0; j < aux.length; j++) {
            if(j == pos && aux[j] != null){
                return index-1
            }
        }
        i = index
    }
    return i;
}

function mouseDown(e) {
    let players = juego.getJugadores();
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    let previousSelectedChip = juego.getFichaAnteriorSeleccionada();
    let clickedChip = encontrarClickeado(clickX, clickY);
    if (clickedChip != null) {
        if (clickedChip.getTurno()) {
        if (previousSelectedChip != null) {
            previousSelectedChip.setEstaSeleccionada(false)
        }
        juego.setFichaAnteriorSeleccionada(clickedChip)
        for (let p = 0; p < players.length; p++) {
            if (players[p].getEstaJugando() == true) {
                if (clickedChip.getDuenio() === players[p].getId()) {
                        clickedChip.setEstaSeleccionada(true);
                        dibujarFichas();
                        juego.setEstaArrastrando(true);

                }
            }
        }
        }
    }else if(checkearAreaReseteo(clickX, clickY)){
       clearAll();
       setReglas(gameData)
    }
}

function clearAll(){
    posicionesTablero = [];
    juego.quitarJugadores();
    clearInterval(interval)
}

function checkearAreaReseteo(clickX, clickY){
    let x = (canvasWidth / 2) + (60 * gameData.connect) - 25
    let y = canvasHeight - 20
    if(!(clickX < x || clickX > x + 60 || clickY < 60 || clickY > y + 60)){
        return true
    }
    return false
}


function encontrarClickeado(clickX, clickY) {
    let players = juego.getJugadores();
    for (let p = 0; p < players.length; p++) {
        let chips = players[p].getFichas();
        for (let i = chips.length - 1; i >= 0; i--) {
            let chip = chips[i];
            if (chip.estaClickeado(clickX, clickY)) {
                return chip;
            }
        }
    }
}




function arrastrarFicha(e) {
    if (juego.getEstaArrastrando() == true) {
        if (juego.getFichaAnteriorSeleccionada() != null) {
            let x = e.pageX - canvas.offsetLeft;
            let y = e.pageY - canvas.offsetTop;
            juego.getFichaAnteriorSeleccionada().setX(x);
            juego.getFichaAnteriorSeleccionada().setY(y);
            dibujarFichas();
        }
    }
}
