
var pjs = new PointJS("2d", 1100  , 750 , {
    backgroundColor : "black",
    zIndex: 0,
});

var game = pjs.game;
var point = pjs.vector.point;
var camera = pjs.camera;
var brush = pjs.brush;
var OOP = pjs.OOP;
var math = pjs.math;

var mouse = pjs.mouseControl;
    mouse.initMouseControl();
var key = pjs.keyControl.initKeyControl();



var width = game.getWH().w;
var height = game.getWH().h;

pjs.system.setTitle("my Diploma");



game.newLoopFromConstructor("myGame", function() {


    var background = game.newBackgroundObject({
        file: "img/grass.jpg",
        countX: 8,
        countY: 10,
        h: 200,
        w: 200,
        x: 0,
        y: 0

    });


    var ship = game.newImageObject({
        file: "img/ball.png",
        h: 100,
        onload: function() {
            this.y = 50,
            this.x = 30,
            this.setCenter(point(-10, 0));
        }
    });
    var speed = 3;

    var grass = [];


    var add = document.getElementById("add");
    var mow = document.getElementById("mow");
    var water = document.getElementById("water");

    var actions = document.querySelector(".actions");

    add.addEventListener("click", function() {
        grass.push(game.newImageObject({
            file: "img/grass2.jpg",
            x: ship.x,
            y: ship.y,
            w: 100,
            h: 100,
        }));
    });





    this.update = function() {

        game.clear();


        background.draw();



        OOP.forArr(grass, function(el, i) {
            el.draw();

            if(ship.isIntersect(el)) {

                mow.addEventListener("click", function() {

                    var slii = grass.slice(i,1);
                    slii.setImage("img/grace.jpg");
                });

                water.addEventListener("click", function() {

                        el.setImage("img/grass2.jpg");


                });
                //grass.splice(i, 1);
                //el.setImage("img/grace.jpg");
            }
/*            else {
                    setTimeout(function() {
                        el.setImage("img/grass2.jpg");
                    }, 1000);
            }*/


        });




        ship.draw();


        if(mouse.isDown("RIGHT")) {
            ship.moveTo(mouse.getPosition(), speed);
        }

        if(key.isDown("RIGHT")){
            if(ship.x + ship.w > width) {
                ship.moveAngle(-100);
            }
            else {
                ship.moveAngle(speed);
            }
        }
        if(key.isDown("LEFT")){
            if(ship.x < 0) {
                ship.moveAngle(100);
            }
            else {
                ship.moveAngle(-speed);
            }
        }
        if(key.isDown("UP")){
            if(ship.x < 0) {
                ship.moveAngle(20);
            }
            else {
                ship.moveAngle(-speed, 90);
            }
        }
        if(key.isDown("DOWN")){
            if(ship.x < 0) {
                ship.moveAngle(20);
            }
            else {
                ship.moveAngle(-speed, -90);
            }
        }

    };

    this.entry = function() {

    };

});


game.startLoop("myGame");


