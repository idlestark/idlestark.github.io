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
  
    
  
    verificarDiagonal(rowPos, columnPos, owner) {
      let row = rowPos;
      let col = columnPos;
      let diag = 0;
      while (col != this.posicionesTablero[row].length - 1 && row != 0) {
        row--;
        col++;
        if (this.posicionesTablero[row][col] != null && this.posicionesTablero[row][col].getDuenio() == owner ) {
          diag++;
        }
      }
  
      row = rowPos;
      col = columnPos;
      while (row != this.posicionesTablero.length - 1 && col != 0) {
        row++
        col--
        if (this.posicionesTablero[row][col] != null && this.posicionesTablero[row][col].getDuenio() == owner) {
          diag++;
        }
      }
  
      return diag 
    }
  
    verificarDiagonal2(rowPos, columnPos, owner) {
      let row = rowPos;
      let col = columnPos;
      let diag = 0;
      while (row != 0 && col != 1) {
        row--;
        col--;
        if (this.posicionesTablero[row][col] != null && this.posicionesTablero[row][col].getDuenio() == owner) {
          diag++;
        }
      }
  
      row = rowPos;
      col = columnPos;
  
      while (row != this.posicionesTablero.length - 1 && col != this.posicionesTablero[row].length - 1) {
        row++
        col++
        if (this.posicionesTablero[row][col] != null && this.posicionesTablero[row][col].getDuenio() == owner) {
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
  
    verificarVertical(rowPos, columnPos, owner, connect) {
      let nulls = 0;
      let vert = 1;
      let aux;
  
      if (rowPos == this.posicionesTablero.length - 1) {
        nulls++;
        aux = rowPos - 1
      } else {
        aux = rowPos + 1
      }
  
      while (nulls < 2) {
  
        if (aux == this.posicionesTablero.length) {
          nulls++
          if (rowPos == 0) {
            return vert >= connect
          }
          aux = rowPos - 1
        }
        let chip = this.posicionesTablero[aux][columnPos]
  
        if (chip != null && chip.getDuenio() == owner) {
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
  
    verificarHorizontal(row, pos ,owner, connect) {
      let nulls = 0;
      let aux = pos + 1;
      let hori = 1;
      while (nulls < 2) {
        if (row[aux] != null && row[aux].getDuenio() == owner) {
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
  