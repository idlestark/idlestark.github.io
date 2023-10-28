class Ficha{
    constructor(posX, posY, fill, context, radio){
        this.posX = posX;
        this.posY = posY;
        this.fill = fill;
        this.context = context;
        this.resaltado = false;
        this.resaltadoEstilo = 'black';
        this.radio = radio;
    }

    setFill(fill){
        this.fill = fill;
    }

    setPosicion(x,y){
        this.posX = x;
        this.posY = y;
    }

    getPosicion(){
        return{
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX(){
        return this.posX;
    }

    getPosY(){
        return this.posY;
    }

    getFill(){
        return this.fill;
    }

    dibujar(){
        this.context.fillStyle =this.fill;
        this.context.beginPath();
        this.context.arc(this.posX,this.posY,this.radio,0,2 * Math.PI);
        this.context.fill();

        if(this.resaltado === true){
            this.context.strokeStyle = this.resaltadoEstilo;
            this.context.lineWidth = 5;
            this.context.stroke();
        }
        this.context.closePath();
    }

    getRdio(){
        return this.radio;
    }

    setResaltado(resaltado){
        this.resaltado = resaltado;
    }

    punteroDentro(x,y){ 
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y) < this.radio;
    };

}