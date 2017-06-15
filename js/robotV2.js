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


    var movePoint = game.newRectObject({
        x: 30,
        y: 50,
        w: 1,
        h: 1,
        fillColor: "black"
    });


    var ship = game.newTriangleObject({
        h: 25,
        w: 25,
        angle: 100,
        fillColor: "white",
        onload: function() {
            this.setCenter(point(-10, 0));
        }
    });
    var speed = 3;
    var robotsSpeed = 2.5;

    var robots = [];
    var buildings = [];
    var stops = [];
    var waters = [];


    var choice = {
        select: false,

        change: function() {
            this.select = !this.select;
        }
    };



    var body = document.body;
    var omX,omY;
    var hire = document.getElementById("hire");
    var build = document.getElementById("build");
    var dismiss = document.getElementById("dismiss");
    var stopMove = document.getElementById("stop");
    var insertIt = document.getElementById("insert");
    var water = document.getElementById("water");

    //var actions = document.querySelector(".actions");



    body.addEventListener("mousemove",function(e) {
        if(choice.select) {
            omX = e.pageX;
            omY = e.pageY;
        }

    });



    stopMove.addEventListener("click", function() {
            choice.change();
            if(choice.select == false) {
                stopMove.innerHTML = "off";
            }
            else {
                stopMove.innerHTML = "on";
            }

    });

    insertIt.addEventListener("click", function() {
        if(choice.select == true) {
            stops.push(game.newRectObject({
                h: 20,
                w: 20,
                x: Math.random()* width-20,
                y: Math.random()* height-20,
                fillColor: "red"
            }));
        }
    });




    hire.addEventListener("click", function() {
        robots.push(game.newTriangleObject({
            h: 25,
            w: 25,
            angle: 100,
            fillColor: "white"
        }));
    });

    dismiss.addEventListener("click", function() {
        if(robots.length != 0) {
            robots.splice(robots.length - 1, 1);
        }
    });

    build.addEventListener("click", function(){
        if(robots.length != 0 && speed == 0 && robotsSpeed == 0) {
            buildings.push(game.newRectObject({
                h: 40,
                w: 40,
                x: ship.x,
                y: ship.y,
                fillColor: "white"
            }));
        }
    });

    water.addEventListener("click", function() {
            waters.push(game.newCircleObject({
                x: Math.random()*500,
                y: Math.random()*500,
                radius: 30,
                fillColor: "blue"
            }));
    });





    this.update = function() {

        game.clear();

        OOP.forArr(robots, function(el, i, arr) {
            el.draw();
            el.moveTo(ship.getPosition(1), robotsSpeed);

        });


        OOP.forArr(buildings, function(el, i) {
            el.draw();
        });

        OOP.forArr(stops, function(el, i) {
            el.draw();
        });

        OOP.forArr(waters, function(el, i) {
            el.draw();
        });


        movePoint.draw();
        ship.draw();



        if(mouse.isDown("RIGHT")) {
            movePoint.setPosition(mouse.getPosition());
        }

        ship.moveTo(movePoint.getPosition(), speed);

        speed = ship.isIntersect(movePoint) ? 0 : ship.isArrIntersect(waters) ? 1 : 3;

        robotsSpeed = ship.isArrIntersect(robots) ? 0 : 2.5;

        if(ship.isArrIntersect(stops)) {
            ship.x = ship.x - 2;
            ship.y = ship.y - 2;
        }




        if(choice.select == true && mouse.isPress("LEFT")) {
            stops.push(game.newRectObject({
                h: 20,
                w: 20,
                x: omX,
                y: omY,
                fillColor: "red"
            }));
        }


    };


});


game.startLoop("myGame");


