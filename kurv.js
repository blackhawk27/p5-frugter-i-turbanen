/*
 * Dette script definerer klassen Kurv
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
    
    /* Tegner kurven. Her kan evt. sættes et billede ind i stedet
     */
    tegn = function() {
        fill(this.col);
        rect(this.x, this.y, this.bred, this.dyb);
    }

    /* Flytter kurvens position
     */
    moveX = function(flyt) {
        this.x += flyt;
        if (this.x < 0) {this.x = 0;};
        if (this.x > width-this.bred) {this.x = width - this.bred;};
    }

    moveY = function(flyt) {
        this.y += flyt;
        if (this.y < 0) {this.y = 0;};
        if (this.y > height-this.dyb) {this.y = height - this.dyb;};
    }

    /* Tjekker om bolden/appelsinen er grebet ved at se om den rammer
     * "rent" ned gennem kurvens overkant. Parametrene er hhv. boldens
     * midtpunkts koordinater og boldens radius
     */
    grebet = function(xa, ya, ra) {
        if ((ya < this.y+3 && ya > this.y-3) && xa > this.x+ra && xa < this.x+this.bred-ra) {
            return true;
        }
        else {
            return false;
        }
    }

} 