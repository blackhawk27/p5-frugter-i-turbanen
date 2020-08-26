/* Frugt-klasse til at lave limefrugter med mere ud fra*/

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
        this.tid = random(100,400);
        this.moving = false;
        this.showing = false;
        console.log("Ny frugt er lavet, tiden er "+this.tid);
    }  

    display = function() {
        if (this.showing) {
            fill(this.col);
            ellipse(this.x, this.y, this.r*2, this.r*2);
        }
    }

    //Her skal vi sørge for at frugten bevæger sig, hvis den er startet
    move = function() {
        if (this.moving) {
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
                console.log("Afskyder ny frugt");
                this.shootNew();
            }
        } else {
            this.tid -= 1;
            if (this.tid < 60) {
                this.showing = true;
                if (tid < 0) {
                    this.moving = true;
                }
            }
        }
    }

    //Her skal vi sørge for at frugten skydes afsted igen
    shootNew = function() {
        this.x = 20;
        this.y = random(200, 550);
        this.yspeed = -10 * (this.y/550);
        this.xspeed = random(4);
        this.moving = false;
        this.showing = false;
        this.tid = random(100,400);
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