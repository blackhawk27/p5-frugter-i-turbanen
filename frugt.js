/* Frugt-klasse til at lave appelsiner, limefrugter med mere ud fra*/

class Frugt {
    /* Den første del er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet    this
     * 
     * Parametrene til konstruktøren er
     * position (x og y), radius (r), fart (xs og ys) samt farve (c)
     */
    constructor(x, y, r, xs, ys, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.yspeed = ys;
        this.xspeed = xs;
        this.col = c;
        this.tid = random(100,400);
        this.moving = false;
        this.showing = false;
       
    }  

    display() {
        if (this.showing) {
            fill(this.col);
            ellipse(this.x, this.y, this.r*2, this.r*2);
            // Sæt evt. et billede ind i stedet for disse to linjer
            // Men husk at det skal loades i sketch.js og at det skal kunne findes her
        }
    }

    //Her skal vi sørge for at frugten bevæger sig, hvis den er startet
    move() {
        if (this.moving) {             // Så er den startet og skal flyttes
            this.x += this.xspeed;
            // grav ligger i sketch.js og er fælles for alle frugter
            
            // Vi skal tjekke om den er røget ud af spil
            if (this.x > width || this.y > height) {
                missed += 1;
                liv -= 1;
                if (liv < 1) {
                    spilIgang = false; // spilIgang og liv er ligeledes fælles. Ikke flere liv
                    genstartKnap.show();

                    // klar til restart();
                }
                this.shootNew();
            }
        } else {                       // ellers er den ikke startet, så tæller ventetiden ned
            this.tid -= 1;
            if (this.tid < 60) {
                this.showing = true;
                if (tid < 0) {
                    this.moving = true;



                    //Hej med dig
                }
            }
        }
    }

    //Her skal vi sørge for at frugten skydes afsted igen
    shootNew() {
        this.x = this.r;
        this.x = random(20, 750);
        this.yspeed = random(4);
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