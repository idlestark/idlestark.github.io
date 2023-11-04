// PLAYER
class Player {
    constructor(nombre, id, personaje, estaJugando) {
      this.fichas = [];
      this.nombre = nombre;
      this.id = id;
      this.personaje = personaje;
      this.estaJugando = estaJugando;
    }
  
    getPersonaje(){
      return this.personaje;
    }
  
    getId() {
      return this.id;
    }
  
    getEstaJugando() {
      return this.estaJugando;
    }
  
    getFichas(){
      return this.fichas;
    }
  
    setEstaJugando(boolean) {
      this.estaJugando = boolean;
      for (let i = 0; i < this.fichas.length; i++) {
        this.fichas[i].setTurno(boolean);
      }
    }
  
    agregarFicha(ficha) {
      this.fichas.push(ficha);
    }
  
    limpiarFichas(){
      this.fichas = []
    }
  }
  