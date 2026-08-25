let dinoPic;
let cactusPic;
let jumpSound;
let gameoverSound;

let dinoX = 80;
let dinoY = 300;

let ground = 300;

let speed = 0;
let jumping = false;

let cactuses = [];
let score = 0;
let dead = false;

//------------------------------------------------------------------------

function preload() {
    dinoPic = loadImage( "dino.png" );
    cactusPic = loadImage( "obstacles.png" );
    jumpSound = loadSound( "JUMP_SOUND.mp3" );
    gameoverSound = loadSound( "GAME_OVER_SOUND.mp3" );
}

//------------------------------------------------------------------------

function setup() {
    createCanvas(1300, 400);

    for (let i = 0; i < 2; i++) {
        cactuses.push({
            x: 600 + i * 300,
            speed: 6
        });
    }
}

//------------------------------------------------------------------------

function draw() {

    if (dead) {
        background("black");

        textAlign(CENTER);

        fill("red");
        textSize(80);
        text("-- !! Game Over !! --", width / 2, height / 2);

        fill("Orange");
        textSize(20);
        text("- ! You touched the cactus ! -", width / 2, height / 2 - 90);

        fill("white");
        textSize(15);
        text("---!!! Better Luck Next Time !!! ---", width / 2, height / 2 + 180);

        return;
    }

    background("white");

    fill("black");
    textSize(20);
    text("Score : " + score, 50, 30);

    stroke("black");
    line(0, ground + 80, width, ground + 80);
    noStroke();

//------------------------------

    // Gravity
    speed += 1;
    dinoY += speed;

//------------------------------

    // Stay on the ground
    if (dinoY > ground) {
        dinoY = ground;
        speed = 0;
        jumping = false;

    }

//------------------------------

    // Draw dinosaur
    image(dinoPic, dinoX, dinoY, 80, 80);

//------------------------------

    // Draw and move cactuses
    for (let i = 0; i < cactuses.length; i++) {
        let c = cactuses[i];
        image(cactusPic, c.x, ground + 40, 30, 35, 10, 10, 40, 100);
        c.x -= c.speed;

//------------------------------

        // Collision
        if (
            c.x < dinoX + 50 &&
            c.x + 30 > dinoX &&
            dinoY + 60 > ground + 15
        ) {
            dead = true;
            gameoverSound.play();
        }

//------------------------------

        // Respawn cactus
        if (c.x < -30) {
            c.x = width + random(0, 200);
            score++;
        }
    }
}

//------------------------------------------------------------------------

function keyPressed() {

    // Jump
    if (keyCode === 32 && !jumping && !dead) {
        speed = -15;
        jumping = true;
        jumpSound.play();
    }

//------------------------------

    // Restart
    if (dead && (key === "r" || key === "R")) {
        dead = false;
        score = 0;
        speed = 0;
        jumping = false;
        dinoY = ground;

        for (let i = 0; i < cactuses.length; i++) {
            cactuses[i].x = 600 + i * 300;
        }
    }
}