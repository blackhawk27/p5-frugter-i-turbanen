/*
Først laver vi nogle variable til at lave nogle frugter,
som vi vil skyde afsted og fange i en turban
*/

// Appelsinen, den gamle - den skal fjernes og erstattes med et Frugt-objekt
let x = 0; 
let y = 550;
const rad = 20;
let xspeed = 4;
let yspeed = -10;
let newspeed;
const col = [220,110,0];
let tid = 150;

// Frugterne
let limefrugt;
let frugtliste = [];

// Turbanen
let turban;
let turbanbillede;

// Tyngden: acceleration i nedadgående retning
const grav = 0.1; 

// Øvrige

let score = 0;
let missed = 0;
let liv = 8;
let spilIgang = true;   //flag

/* 
 * 
 */
function preload() {
    turbanbillede = loadImage('turbanman.png');
}

function setup() {  // kører kun en gang, når programmet startes
    createCanvas(595, 600);
    textAlign(CENTER, CENTER);
    
    // De følgende linjer opretter en knap og formattere den
    genstartKnap = createButton('Genstart');
    genstartKnap.position(100,20);
    genstartKnap.mousePressed(restart);
    genstartKnap.hide();

    newspeed = yspeed;
    x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(470, 100, 70, 50, 8);
    // parametrene til Frugt-konstruktøren er (x, y, radius, xspeed, yspeed, farve)
    limefrugt = new Frugt(20, 550, 20, 4, -10, [110,220,0]);
    frugtliste.push(limefrugt);

}

function draw() {
    background(0);
    
    if (spilIgang) {
        // Flyt og tegn frugterne - lige nu kun limefrugten
        limefrugt.move();
        limefrugt.checkScore();
        limefrugt.display();

        //flyt og tegn den gamle appelsin
        move();
        checkScore();
        display();

        // Bevæger turbanen sig?
        turban.move();
    }
    else {  // så er det Game Over, der skal vises
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
    
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
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
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes den afsted igen
    // Men Frugt-klassen tjekker selv dette. Når appelsinen forsvinder fra scriptet her
    // er disse kodelinjer overflødige
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            shootNew(); 
        }
    }
}
    
function shootNew() {
    //Her skal vi sørge for at en frugt skydes afsted igen. Lige nu er det kun appelsinen
    x = rad;
    y = random(200,550);
    yspeed = newspeed * (y/550);
    xspeed = random(4);
    tid = random(400);
}

/*
 * Her genstartes spillet ved at alle relevante værdier nulstilles
 */
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
 Opgave 1 - Jeg har oprettet et array ved navn  frugtliste
            Dette array skal bruges til at holde styr på alle de frugter,
            vi opretter. Man lægger et element ind som vist i linje 52:

            frugtliste.push(limefrugt);

            Men jeg bruger ikke listen til noget - endnu.
            Man løber elementerne igennem fx sådan her:
            
            frugtliste.forEach(element => {
                element.move();
                element.checkScore();
                element.display();
            });

            Indsæt denne kode i stedet for linjerne 60-62, hvor limefrugten
            flyttes og vises. Se at det virker.

 Opgave 2 - Opret en frugt ved navn appelsin, med de værdier vi bruger nu
            for appelsinen i scriptet, og læg den ind i frugtliste-arrayet. 
            Udkommentér linjerne, som før hed 65-67 (move, checkScore og display). 
            Se at det virker. Ret det, hvis der mangler noget. Hvor meget af den 
            øvrige kode i sketch.js kan nu undværes?

 Opgave 3 - Indføj, oppe i setup(), en tredje, rød, frugt i arrayet, men 
            uden at give den et navn, således:

            frugtliste.push(new Frugt(.. og så de nødvendige parametre her ...));

            Får I en rød frugt at se også nu?

 Opgave 4 - Brug dette til at lave det sådan, at hver gang man klikker med 
            musen, så laves der en ny frugt i frugtkurven

 Opgave 5 - Det bliver meget hurtigt meget svært. Udtænk en måde, så der ikke  
            er alt for mange frugter i luften samtidig. Der er mange måder at 
            gøre det på - beskriv jeres i kommentarer. Overvej hvordan og hvor 
            hurtigt de kan/skal skydes af, for at det kan gøre spillet sjovere 
            og mere udfordrende, og forklar jeres tanker i kommentarerne.

 Opgave 6 - Gør spillet "pænere". Få genstart-knappen til at stå midt under 
            scoren, og prøv om du kan gøre teksten større og flottere. Prøv også
            om du 
            
 Opgave 7 - Find eventuelt også en lyd, der kan afspilles, når frugten gribes. 
            Se gerne i "p5 Reference" hvordan det gøres, hvis ikke I kan huske det:   
            
            https://p5js.org/reference/



*/