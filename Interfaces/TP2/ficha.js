class Ficha {
    constructor(posX, posY, img, context, width, height) {
        this.posX = posX;
        this.posY = posY;
        this.img = img;
        this.context = context;
        this.width = width;
        this.height = height;
        this.resaltado = false;
        this.resaltadoEstilo = 'green';
    }

    dibujar() {
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

    setPosicion(x, y) {
        this.posX = x;
        this.posY = y;
    }

    setResaltado(resaltado) {
        this.resaltado = resaltado;
    }

    punteroDentro(x, y) {
        return (
            x > this.posX &&
            x < this.posX + this.width &&
            y > this.posY &&
            y < this.posY + this.height
        );
    }
}