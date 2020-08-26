/*
Først laver vi nogle variable til at lave en appelsin:
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen - den skal fjernes og erstattes med et Frugt-objekt
let x = 0; 
let y = 550;
const rad = 20;
let xspeed = 4;
let yspeed = -10;
let newspeed;
const col = [220,110,0];

// Frugterne
let limefrugt;
let frugtkurv = [];

// Turbanen
let turban;

// Tyngden: acceleration i nedadgående retning
const grav = 0.1; 

// Øvrige
let tid = 150;
let score = 0;
let missed = 0;
let liv = 8;
let spilIgang = true;   //flag

/* 
 * 
 */
function setup() {  // kører kun en gang, når programmet startes
    createCanvas(595, 600);
    genstartKnap = createButton('Genstart');
    genstartKnap.position(100,20);
    genstartKnap.mousePressed(restart);
    genstartKnap.hide();
    textAlign(CENTER, CENTER);

    newspeed = yspeed;
    x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(470, 100, 70, 50, 10);
    // parametrene til Frugt-konstruktøren er (x, y, radius, xspeed, yspeed, farve)
    limefrugt = new Frugt(20, 330, 20, 4, -10, [110,220,0]);
    frugtkurv.push(limefrugt);
}

function draw() {
    background(0);
    
    if (spilIgang) {
        // Flyt og tegn frugterne
        limefrugt.move();
        limefrugt.checkScore();
        limefrugt.display();

        move();
        checkScore();
        display();

        // Bevæger turbanen sig?
        if (keyIsDown(UP_ARROW)) {
            turban.moveY(-5);
        }
        if (keyIsDown(DOWN_ARROW)) {
            turban.moveY(5);
        }    
        if (keyIsDown(LEFT_ARROW)) {
            turban.moveX(-5);
        }
        if (keyIsDown(RIGHT_ARROW)) {
            turban.moveX(5);
        } 
    }
    else {  // så er Game Over det der skal vises
        fill(col);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 50);
    }
}

function display() {
    fill(255);
    textSize(12);
    text("Score: "+score, width-80, 30);
    text("Liv: " + liv, width-160, 30);
    
    //Her skal vi sørge for at frugten bliver vist, hvis den skal vises
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        ellipse(x, y, rad*2, rad*2);

    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();
}
    
function move() {
    //Her skal vi sørge for at frugten bevæger sig, hvis den er startet
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        liv -= 1;
        if (liv < 1) {
            spilIgang = false;
            genstartKnap.show();

            //restart();
        }
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget frugten. Hvis ja, skydes den afsted igen
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            shootNew(); 
        }
    }
}
    
function shootNew() {
    //Her skal vi sørge for at en frugt skydes afsted igen
    x = rad;
    y = random(200,550);
    yspeed = newspeed * (y/550);
    xspeed = random(4);
    tid = random(400);
}


function restart() {
    liv = 10;
    missed = 0;
    score = 0;
    spilIgang = true;
    genstartKnap.hide();
}

function mousePressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}

/*
OPGAVER
 Opgave 1 - Jeg har oprettet et array ved navn  frugtkurv
            Dette array skal bruges til at holde styr på alle de frugter,
            vi opretter. Men jeg bruger det ikke til noget - endnu.
            Man lægger et element ind som vist i linje 49:

            frugtkurv.push(limefrugt);

            og man løber elementerne igennem fx sådan her:
            
            frugtkurv.forEach(element => {
                element.move();
                element.checkScore();
                element.display();
            });

            Indsæt denne kode i stedet for linjerne 57-59, hvor limefrugten
            flyttes og vises. Se at det virker.

 Opgave 2 - Opret en frugt ved navn appelsin, med de værdier vi bruger nu
            for appelsinen i scriptet, og læg den ind i frugtkurv-arrayet. 
            Udkommentér linjerne 61-63 (move, checkScore og display). Se at 
            det virker. 

 Opgave 3 - Indføj en tredje, rød, frugt i arrayet uden at give den et navn, 
            således:

            frugtkurv.push(new Frugt(.. og så de nødvendige parametre her ...));

            Får I en rød frugt at se også nu?

 Opgave 4 - Brug dette til at lave det sådan, at hver gang man klikker med 
            musen, så laves der en ny frugt i frugtkurven

 Opgave 5 - Det bliver meget hurtigt meget svært. Udtænk en måde, så der ikke  
            er alt for mange frugter i luften samtidig. Der er mange måder at 
            gøre det på - beskriv jeres i kommentarer. Overvej hvordan og hvor 
            hurtigt de kan/skal skydes af, for at det kan gøre spillet sjovere 
            og mere udfordrende, og forklar jeres tanker i kommentarerne.

 Opgave 6 - Gør spillet "pænere". Find billeder af en turban og af frugter, og
            sæt det ind i stedet for firkanten. Find eventuelt også en lyd, 
            der kan afspilles, når frugten gribes. Se gerne i "p5 Reference" 
            hvordan det gøres, hvis ikke I kan huske det:   
            
            https://p5js.org/reference/



*/