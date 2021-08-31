/*
 * Dette script definerer klassen Kurv, som vi bruger til at lave turbanen
 */

class Kurv {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, bredde, dybde, speed) {
        this.x = x;
        this.y = y;
        this.bred = bredde;
        this.dyb = dybde;
        this.speed = speed;
        this.col = [250,230,150];
    }   
    
    /* 
     * Tegner kurven. Her kan evt. sættes et billede ind i stedet
     */
    tegn() {
        fill(this.col);
        rect(this.x, this.y, this.bred, this.dyb);
        image(turbanbillede, this.x+1, this.y+5, this.bred-1, this.dyb-10);
    }

    /* 
     * Flytter kurvens position. Stod i sketch.js før
     */
    move() {
        if (keyIsDown(UP_ARROW)) {
            this.moveY(-this.speed);
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.moveY(this.speed);
        }    
        if (keyIsDown(LEFT_ARROW)) {
            this.moveX(-this.speed);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.moveX(this.speed);
        } 
    }
    moveX(flyt) {
        this.x += flyt;
        if (this.x < 0) {this.x = 0;};
        if (this.x > width-this.bred) {this.x = width - this.bred;};
    }

    moveY(flyt) {
        this.y += flyt;
        if (this.y < 0) {this.y = 0;};
        if (this.y > height-this.dyb) {this.y = height - this.dyb;};
    }

    /* 
     * Tjekker om frugten er grebet ved at se om den rammer
     * "rent" ned gennem kurvens overkant. Parametrene er hhv. frugtens
     * midtpunkts koordinater og dens radius (dvs. dens halve bredde)
     */
    grebet(xa, ya, ra) {
        if ((ya < this.y+6 && ya > this.y-6) && xa > this.x+ra && xa < this.x+this.bred-ra) {
            return true;
        }
        else {
            return false;
        }
    }

} 