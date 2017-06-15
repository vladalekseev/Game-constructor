
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
        y: 0,

    });

    var rect = game.newRectObject({
        x: 30,
        y: 50,
        w: 1,
        h: 1,
        fillColor: "white"
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
            alpha: 0
        }));
    });



    this.update = function() {

        game.clear();


        background.draw();




        OOP.forArr(grass, function(el, i) {
            el.draw();
            el.transparent(0.010);


            var dist = ship.getDistanceC(el.getPosition(1));


            if(dist < 50) {
                el.drawDynamicBox("white");
                console.log(el.id);

                mow.addEventListener("click", function() {
                    el.setImage("img/grace.jpg");
                });

                water.addEventListener("click", function() {
                    if(el.getImage() == "img/grace.jpg"){
                        el.setImage("img/grace2.jpg");
                    }
                    else {
                        el.setImage("img/grass3.jpg");
                    }

                });
            }
            else {
                setTimeout(function() {
                    el.setImage("img/grass2.jpg");
                }, 1200);
            }

/*

            if(ship.isIntersect(el)) {


                mow.addEventListener("click", function() {

                    el.setImage("img/grace.jpg");
                });

                water.addEventListener("click", function() {

                        el.setImage("img/grass2.jpg");


                });
                //grass.splice(i, 1);
            }
            else {
                    setTimeout(function() {
                        el.setImage("img/grass2.jpg");
                    }, 1000);
            }
*/


        });


        rect.draw();

        ship.draw();


        if(mouse.isDown("RIGHT")) {
            rect.setPosition(mouse.getPosition());
        }

        ship.moveTo(rect.getPosition(), speed);

        if(ship.isIntersect(rect)) {
            speed=0;

        }
        else {
            speed = 3;
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


