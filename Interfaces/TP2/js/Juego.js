// CONTROLA TODO EL JOGO

class Juego{
    constructor() {
      this.ctx = ctx;
      this.listo = false;
      this.jugadores = [];
      this.estaArrastrando = false;
      this.fichaAnteriorSeleccionada = null;
      this.posicionesTablero = []
    }
  
    getPosicionesTablero() {
      return this.posicionesTablero;
    }
  
    getJugadores() {
      return this.jugadores;
    }
  
    getListo() {
      return this.listo;
    }
  
    getEstaArrastrando() {
      return this.estaArrastrando;
    }
  
    getFichaAnteriorSeleccionada() {
      return this.fichaAnteriorSeleccionada;
    }
  
    setEstaArrastrando(boolean) {
      this.estaArrastrando = boolean;
    }
  
    setFichaAnteriorSeleccionada(Chip) {
      this.fichaAnteriorSeleccionada = Chip;
    }
  
    jugar() {
      this.turno();
    }
  
  
    agregarJugadores(jugador_1, jugador_2) {
      let p1 = new Jugador('Counter Strike', 1, jugador_1, true);
      let p2 = new Jugador('Valorant', 2, jugador_2, false);
      this.jugadores.push(p1, p2);
    }
  
    quitarJugadores(){
      this.jugadores = []
    }
  
    setTurno() {
      this.jugadores[0].setEstaJugando(!this.jugadores[0].getEstaJugando());
      this.jugadores[1].setEstaJugando(!this.jugadores[1].getEstaJugando());
    }
  
    
  
    verificarDiagonal(filaPos, columnaPos, owner) {
      let file = filaPos;
      let col = columnaPos;
      let diag = 0;
      while (col != this.posicionesTablero[file].length - 1 && file != 0) {
        file--;
        col++;
        if (this.posicionesTablero[file][col] != null && this.posicionesTablero[file][col].getDuenio() == owner ) {
          diag++;
        }
      }
  
      file = filaPos;
      col = columnaPos;
      while (file != this.posicionesTablero.length - 1 && col != 0) {
        file++
        col--
        if (this.posicionesTablero[file][col] != null && this.posicionesTablero[file][col].getDuenio() == owner) {
          diag++;
        }
      }
  
      return diag 
    }
  
    verificarDiagonal2(filaPos, columnPos, owner) {
      let fila = filaPos;
      let col = columnPos;
      let diag = 0;
      while (fila != 0 && col != 1) {
        fila--;
        col--;
        if (this.posicionesTablero[fila][col] != null && this.posicionesTablero[fila][col].getDuenio() == owner) {
          diag++;
        }
      }
  
      fila = filaPos;
      col = columnPos;
  
      while (fila != this.posicionesTablero.length - 1 && col != this.posicionesTablero[fila].length - 1) {
        fila++
        col++
        if (this.posicionesTablero[fila][col] != null && this.posicionesTablero[fila][col].getDuenio() == owner) {
          diag++;
        }
      }
  
      return diag 
    }
  
    verificarGanador(columnaPos, filaPos , connect) {
      let fila = this.posicionesTablero[filaPos]
      let duenio = this.posicionesTablero[filaPos][columnaPos].getDuenio();
      let diag = 1;
      if (this.verificarHorizontal(fila, columnaPos, duenio, connect)) {
        return [true, duenio]
      }
      if (this.verificarVertical(filaPos, columnaPos, duenio, connect)) {
        return [true, duenio]
      }
      diag += this.verificarDiagonal(filaPos, columnaPos, duenio, connect) + this.verificarDiagonal2(filaPos, columnaPos, duenio, connect)
      if (diag >= connect) {
        return [true, duenio]
      }
  
    }
  
    verificarVertical(filaPos, columnaPos, duenio, connect) {
      let nulls = 0;
      let vert = 1;
      let aux;
  
      if (filaPos == this.posicionesTablero.length - 1) {
        nulls++;
        aux = filaPos - 1
      } else {
        aux = filaPos + 1
      }
  
      while (nulls < 2) {
  
        if (aux == this.posicionesTablero.length) {
          nulls++
          if (filaPos == 0) {
            return vert >= connect
          }
          aux = filaPos - 1
        }
        let chip = this.posicionesTablero[aux][columnaPos]
  
        if (chip != null && chip.getDuenio() == duenio) {
          vert++;
        } else {
          return vert >= connect;
        }
  
        if (nulls == 0) {
          aux++
        } else {
          aux--
        }
      }
  
      return vert >= connect
    }
  
    verificarHorizontal(fila, pos ,duenio, connect) {
      let nulls = 0;
      let aux = pos + 1;
      let hori = 1;
      while (nulls < 2) {
        if (fila[aux] != null && fila[aux].getDuenio() == duenio) {
          hori++;
        } else {
          nulls++;
          aux = pos ;
        }
        if (nulls == 0) {
          aux++
        } else {
          aux--;
        }
      }
      return hori >= connect
    }
  }
  