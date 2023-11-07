// CONTROLA LAS FICHAS

class Ficha {
    constructor(x, y, img, duenio, turno) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y
      this.radius = 30;
      this.isSelected = false;
      this.turno = turno;
      this.duenio = duenio;
  
      this.urlimage = img;
      this.image = new Image();
  
      this.context = ctx;
    }
  
    getDuenio() {
      return this.duenio;
    }
  
    getTurno() {
      return this.turno;
    }
  
    getEstaSeleccionada(){
      return this.isSelected;
    }
  
    setEstaSeleccionada(boolean){
      this.isSelected = boolean;
    }
  
    setTurno(boolean) {
      this.turno = boolean
    }
    
    setX(x){
      this.x = x
    }
  
    setY(y){
      this.y = y;
    }
  
    reiniciarPosicion(){
      this.setX(this.originalX);
      this.setY(this.originalY);
    }
  
    
  
    estaClickeado(x, y) {
      let _x = this.x - x;
      let _y = this.y - y;
  
      return Math.sqrt(_x * _x + _y * _y) <= this.radius;
    }


    draw() {
      this.context.beginPath();
      this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

      if (this.image.src === "") {
          this.image.src = this.urlimage;
          let loadImg = function () {
              this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius / .5, this.radius / .5);
          }
          this.image.onload = loadImg.bind(this);
      } else {
          this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius / .5, this.radius / .5);
      }
      
      this.context.closePath();
}



}


