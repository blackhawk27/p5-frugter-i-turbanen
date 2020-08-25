/* Frugt-klasse til at lave appelsiner med mere ud fra*/

class Frugt {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    constructor(x, y, r, xs, ys ,c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.yspeed = ys;
        this.xspeed = xs;
        this.col = c;
        console.log("Limefrugt er lavet, gravitation er "+grav);
    }  

    display = function() {
        fill(this.col);
        ellipse(this.x, this.y, this.r*2, this.r*2);
    }

    //Her skal vi sørge for at frugten bevæger sig, hvis den er startet
    move = function() {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.yspeed += grav;
        if (this.x > width || this.y > height) {
            missed += 1;
            liv -= 1;
            if (liv < 1) {
                spilIgang = false;
                genstartKnap.show();

                //restart();
            }
            console.log("Afskyder ny lime");
            this.shootNew();
        }
    }

    genstartPos = function() {
        this.x = 20;
        this.y = 330;
        this.yspeed = -5;
        this.xspeed = random(4);
    }

    //Her skal vi sørge for at en ny frugt skydes afsted 
    shootNew = function() {
        console.log("ShootNew kaldes");
        this.genstartPos();
    }


    checkScore = function() {
        if (this.yspeed > 0) {
            if (turban.grebet(this.x, this.y, this.r)) {
                score += 1;
                this.shootNew(); 
            }
        }
    }

}