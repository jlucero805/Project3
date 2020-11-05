////These arrays store the random variables made by randGenerator, and are used for skyActionLines()
var linesArrayWidth = [];
var linesArrayWidth1 = [];
var linesArrayHeight = [];
var linesArrayHeight1 = [];

// a constant counter that the animations are based off of
var counter = 0;
var tempCounter = 0;
//the state of the counter that is used to animate the background
var counterState = 1;
//state of buttons
var btnState = 2
//state of temp count
var tempCountState = -1

var y = tempCounter; // counts the position of raindrop
//state of text boxes
var textBox = 0;


var C1=100 //variables for the cloud
var C2=50
var D1=300
var D2=50
var E1 =200;
var E2= 200;

var raindropDeadAlpha = 255;




randGenerator = () => { //generates the randInts for the linesArrayWidth and Height arrays
    for (let i=0; i<50; i++) {
        var temp = Math.floor(Math.random() * 400);
        var temp2 = Math.floor(Math.random() * 400);
        var temp3 = Math.floor(Math.random() * 400);
        var temp4 = Math.floor(Math.random() * 400);

        linesArrayHeight.push(temp);
        linesArrayHeight1.push(temp2);
        linesArrayWidth.push(temp3);
        linesArrayWidth1.push(temp4);
    }
}

function setup() {
    createCanvas(400, 400);
    randGenerator(); // activates only once so that the numbers don't change in the draw loop
}

//these three functions controll the buttons for the animation//////////////////////
function btnStart() {btnState = 1;};

function btnStop() {btnState = 2; tempCountState = -1};

function btnRestart() {counter = 0; btnState = 1; tempCounter = 0; tempCountState = 1; raindropDeadAlpha = 255};

////////////////////////////////////////////////////////////////////////////////////

class Scene1 { // has all the parts of our scene1 
    constructor() {}

    background1 = () => { // has all of the clouds, blue sky, etc

        function count() { 
            if (btnState == 1) {
                counter++;
            }
        }

        function tempCount() {
            if (btnState == 1 && tempCountState == 1) {
                tempCounter++;
            }
        }

        function countState() {
            if (counter%60 == 0) {
                counterState *= -1;
            }
        }
        
        function backgroundGradient1() {
            push();
                for (let i = 0; i < 255; i++) {
                    strokeWeight(1);
                    var colorPick = color(60, 30, i);
                    stroke(colorPick);
                    line(0, i, width, i);
                }
                push();
                    translate(0, 255);
                    for (let i = 0; i < 255; i++) {
                        strokeWeight(1);
                        var colorPick = color(60, 30 + i, 255);
                        stroke(colorPick);
                        line(0, i, width, i);
                    }
                pop();
            pop();
        }

        function clouds(cx,cy,dx,dy) {
            push();
            translate(cx, cy);
            fill(255);
            noStroke();
            ellipse(0, 0, 50, 30);
            ellipse(15, 15, 50, 30);
            ellipse(-15, 15, 50, 30)
          pop();
          
          push();
            translate(dx, dy);
            fill(255);
            noStroke();
            ellipse(0, 0, 50, 30);
            ellipse(15, 15, 50, 30);
            ellipse(-15, 15, 50, 30)
          pop();

        }

        function skyActionLines(x, y) { //draws 1 of the sky action lines
            push();
                strokeWeight(4);
                stroke(color(0, 0, 255));
                line(x, y, x, y + 15);
            pop();
        }

        function drawSkyActionLines() {
            if (counterState == 1) {
                for (let i=0; i<linesArrayWidth.length-1; i++) {
                    skyActionLines(linesArrayWidth[i],linesArrayHeight[i]);
                }
            }
            if (counterState == -1) {
                for (let i=0; i<linesArrayWidth.length-1; i++) {
                    skyActionLines(linesArrayWidth1[i], linesArrayHeight1[i]);
                }
            } 
        }

        //draw////// above background functions
        
        push();
            fill(130, 130, 255);
            noStroke();
            if ( counter < 1050) {
                backgroundGradient1();
            } else {
                push();
                    fill(60, 175,255);
                    rect(0,0, width, height);
                pop();
            }
            count();
            countState();
            drawSkyActionLines();
            tempCount();
            if (counter < 1050) {
                clouds(C1,C2,D1,D2);
            }
        pop();
        
    }
}

class Scene2 extends Scene1 { // has all the parts of scene 2

    background2 = () => {
        if (counter > 1050) { //// This is the condition that changes the background scene
            push();
                fill(0, 255, 0);
                rect(0, 300, 400, 100)
            pop();
        }    
    }

}

const scene1 = new Scene1();
const scene2 = new Scene2();

function raindropAnimation() { // animates the raindrop() function
    if (counter < 150) {
        tempCountState = 1;
    } else if (counter > 400 && counter < 600) {
        tempCountState = 1; 
    } else if (counter > 850 && counter < 1050) { 
        tempCountState = 1;
    } else if (counter == 1050) {
        tempCounter = 0;
    } else if (counter > 1050 && counter < 1250) {
        tempCountState = 1;
    } else if (counter > 1450 && counter < 1600) {
        tempCountState = 1;
    }else {
        tempCountState = -1;
    }
}

function raindrop(x,y)
{
    push();
    translate(x,y);
    translate(0, -50);
    noStroke()
    fill(0,0,255);
    triangle(0,-100,-40,-20,40,-20)
    ellipse(0,0,90,90);
    fill(255,255,255);
    ellipse(-20,-20,20,20);
    ellipse(20,-20,20,20);
    fill(0,0,0);
    ellipse(-20,-23,15,15);
    ellipse(20,-23,15,15);
    noStroke();
    fill(0);
    ellipse( 0, 20+random(0,10), 40, 15);
    noStroke();
    fill(0, 0, 255);
    ellipse( 0, 15, 40, 15); 
    // text boxes //Each of the text boxes were hard coded to ajust for text wrapping
    if (tempCounter == 150 && counter < 1050) {
        push();
            strokeWeight(1);
            stroke(color(0, 0, 0))
            fill(255);
            ellipse(65, -60, 70, 65)
        pop();
        text("Oh no, I am falling!", 45, -75, 50, 50);
    }
    if (tempCounter == 348 && counter < 1050) {
        push();
            strokeWeight(1);
            stroke(color(0, 0, 0));
            fill(255);
            ellipse(65, -68, 70, 80)
        pop();
        text("Someone please save me!", 40, -93, 50, 70);
    }
    if (tempCounter == 200 && counter > 1050) {
        push();
            strokeWeight(1);
            stroke(color(0, 0, 0));
            fill(255);
            ellipse(65, -60, 70, 50);
        pop();
        text("I have a family!!!", 50, -70, 50, 50);
    }
    pop();
    raindropAnimation();
}

function raindropDeadEye(x, y, z) {
    push();
        translate(x, y);
        strokeWeight(3);
        stroke(color(0,0, 0, z))
        line(-10, -10, 10, 10);
        line(10, -10, -10, 10);
    pop();
}

function raindropDeadMouth(x, y, z) {
    push();
        translate(x, y);
        strokeWeight(0);
        fill(color(0, 0, 0, z));
        circle(0, 0, 10);
    pop();
}

function raindropDead(e1,e2,) {
    push();
        strokeWeight(0);
        translate(e1,e2);
        fill(color(0,0,255, raindropDeadAlpha));
        ellipse(0,0,200,80);
        push();
            if (counter > 1666 && btnState == 1) {
                raindropDeadAlpha--;
            }
            raindropDeadEye(20, -15, raindropDeadAlpha);
            raindropDeadEye(-20, -15, raindropDeadAlpha);
            raindropDeadMouth(0, 10, raindropDeadAlpha);
        pop();
    pop();
}

function visualizeCounters() { // edits html
    document.getElementById("num").innerHTML = "time: " + counter;
    document.getElementById("num1").innerHTML = "raindrop position: " + tempCounter;
}

function draw() {
    //visualizes counters
    visualizeCounters();
    //control the backgrounds
    scene1.background1();
    scene2.background1();
    scene2.background2();
    //

    if (counter < 1616) {
        raindrop(200, tempCounter);
    } else {
        raindropDead(200,350);
    }
    
}

///// first scene
///// stop at 100 = "Oh no, I'm falling!"
////          300 = "Someone save me!"
////  scene two
////  stop at 200 = "Please I have a family!"
////          350 = dead
