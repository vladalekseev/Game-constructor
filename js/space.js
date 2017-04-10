var pjs = new PointJS("2d", 1200  , 720 , {
   backgroundColor : "black"
});
pjs.system.initFullPage();

var log = pjs.system.log;
var game = pjs.game;
var point = pjs.vector.point;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;
var levels = pjs.levels;

var key = pjs.keyControl.initKeyControl();

var width = game.getWH().w;
var height = game.getWH().h;
var resolution = game.getResolution();

pjs.system.setTitle("my Diploma");

game.newLoopFromConstructor("myGame", function() {



    var background = game.newImageObject({
        file: "img/space.jpg",
        h: height,
        w: width
    });



    var ship = game.newImageObject({
        file: "img/ship.png",
        h: 80 * resolution,
        onload: function() {
            this.y = 20*resolution,
            this.x = 20*resolution,
            this.setCenter(point(-10, 0));
        }
    });
    var speed = 0;
    var maxSpeed = 5;
    var step = 0.02;
    var name = "img/ship.png";


    var meteors = [];
    var meteorsSpeed = 2;

    var timer = OOP.newTimer(1000, function() {
        meteors.push(game.newImageObject({
            file: "img/asteroid.png",
            x:  width-50*resolution,
            y: math.random(0, height-50*resolution),
            w: 50*resolution,
            h: 50*resolution
        }));
    });

    var score = 0;




   this.update = function() {

       meteorsSpeed += 0.001;
       var dt = game.getDT(10);

       game.clear();

       background.draw();
       ship.draw();

       var currentName = ship.getImage();


       timer.restart();

       OOP.forArr(meteors, function(el, i) {
          el.draw();

           el.move(point(-meteorsSpeed*dt, 0));
           //el.moveTo( ship.getPosition(), 2 );
           el.turn(-1);

           if(el.isIntersect(ship)) {
               meteors.splice(i, 1);
               ship.setImage("img/boom.png");
               ship.h = 200;
               ship.w = 200;
               speed = 0;
           }

       });




       if(key.isDown("UP") && currentName == name){
           if(ship.x + ship.w > width) {
               ship.setPosition({x: 0,y: (height/2)-ship.h});
           }
           else if(ship.y < 0) {
               ship.setPosition({x: 60, y: height - ship.h});
           }
           else if(ship.y > height-ship.h) {
               ship.setPosition({x: 60, y: 0});
           }
           else {
               speed += speed < maxSpeed ? step : 0;
           }

       }
       else if(key.isDown("DOWN")){
           speed -= speed > -maxSpeed/2 ? step : 0;
       }
       else {
           if(ship.x + ship.w > width) {
               ship.setPosition({x: 0,y: (height/2)-ship.h});
           }
           else if(ship.y < 0) {
               ship.setPosition({x: 60, y: height - ship.h});
           }
           else if(ship.y > height-ship.h) {
               ship.setPosition({x: 60, y: 0});
           }
           else {
               if(speed != 0) {
                   if(speed > 0)
                       speed -= step*3;

                   if(speed < 0)
                       speed += step*3;
               }
           }
       }

       if(speed != 0) {
           ship.moveAngle(speed);
           if(key.isDown("LEFT")){
               ship.turn(-speed/2);
           }
           if(key.isDown("RIGHT")){
               ship.turn(speed/2);
           }
       }

       score++;


   };

   this.entry = function() {
        OOP.clearArr(meteors);
        score = 0;
   };

});

game.startLoop("myGame");

