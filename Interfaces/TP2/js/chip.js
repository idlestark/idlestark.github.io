


class Chip {
    constructor(x, y, img, owner, turn) {
      this.originalX = x;
      this.originalY = y;
      this.x = x;
      this.y = y
      this.radius = 30;
      this.isSelected = false;
      this.turn = turn;
      this.owner = owner;
  
      this.urlimage = img;
      this.image = new Image();
  
      this.context = ctx;
    }
  
    getOwner() {
      return this.owner;
    }
  
    getTurn() {
      return this.turn;
    }
  
    getIsSelected(){
      return this.isSelected;
    }
  
    setIsSelected(boolean){
      this.isSelected = boolean;
    }
  
    setTurn(boolean) {
      this.turn = boolean
    }
    
    setX(x){
      this.x = x
    }
  
    setY(y){
      this.y = y;
    }
  
    resetPosition(){
      this.setX(this.originalX);
      this.setY(this.originalY);
    }
  
    draw() {
      if (this.img.complete) {
        this.context.save();
        this.context.beginPath();
        this.context.arc(this.posX + this.width / 2, this.posY + this.height / 2, this.width / 2, 0, Math.PI * 2, true);
        this.context.clip();
        this.context.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        this.context.closePath();
        this.context.restore();

        if (this.resaltado) {
            this.context.beginPath();
            this.context.arc(this.posX + this.width / 2, this.posY + this.height / 2, this.width / 2 + 2.5, 0, Math.PI * 2, true); 
            this.context.strokeStyle = this.resaltadoEstilo;
            this.context.lineWidth = 5;
            this.context.stroke();
            this.context.closePath();
        }
    }
}
  
  
    isClicked(x, y) {
      let _x = this.x - x;
      let _y = this.y - y;
  
      return Math.sqrt(_x * _x + _y * _y) <= this.radius;
    }
  }
  
   