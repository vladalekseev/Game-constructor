var pjs = new PointJS("2d", 1090  , 750 , {
    backgroundColor : "white",
    zIndex: 0
});

var game = pjs.game;
var point = pjs.vector.point;

var OOP = pjs.OOP;
var math = pjs.math;
var v2d = pjs.vector.v2d;
var brush = pjs.brush;

var mouse = pjs.mouseControl;
mouse.initMouseControl();
//var key = pjs.keyControl.initKeyControl();



var width = game.getWH().w;
var height = game.getWH().h;

pjs.system.setTitle("my Diploma");



game.newLoopFromConstructor("myGame", function() {



    var dx = 1;

    var timing = 0;
    var materialplus = 0;
    var fuelplus = 0;

    var body = document.body;
    var i = 0;
    var omX,omY;
    var hire = document.getElementById("hire");
    var start = document.getElementById("start");
    var finish = document.getElementById("finish");
    var dismiss = document.getElementById("dismiss");
    var stopAct = document.getElementById("stopAct");
    var stop = document.getElementById("stop");
    var water = document.getElementById("water");
    var flag = document.getElementById("flag");
    var flagAct = document.getElementById("flagAct");

    var cont = document.getElementById("cont");

    var timeC = document.getElementById("timeC");
    var agentsC = document.getElementById("agentsC");
    var fuel = document.getElementById("fuel");
    var material = document.getElementById("material");





    var asphalt = [];
    var stops = [];
    var flags = [];
    var ships = [];

                                                //   C  H  O  I  C  E



    var choice = {
        selectStop: false,
        selectFlag: false,
        start: false,
        ura: false,

        time: true,

        go: function() {
          this.start = true;
        },

        finish: function() {
          this.time = false;
        },

        changeStop: function() {
            this.selectStop = !this.selectStop;
        },

        win: function() {
          this.ura = true;
        },

        changeFlag: function() {
            this.selectFlag = !this.selectFlag;
        }

    };
                                                 //   O    B   J   E   C   T   S



                                // S h i p

/*

    ships[0] = game.newImageObject({
        file: "img/atruck1.png",
        h: 15,
        w: 24,
        x: 75,
        y: 30,
        userData: {
            speed : 1.6,
            command : 1,
            moveToStart : function() {
                this.command = 2;
            },
            moveToFinish : function() {
                this.command = 1;
            }
        }
    });
*/







                                    // A P


    var asphaltPaver = game.newImageObject({
        file: "img/paver1.png",
        h: 50,
        w: 42,
        x: width - 100,
        y: height - 141,
        radius: 10,
        angle: 0,
        fillColor: "white",
        strokeColor: "black",
        strokeWidth: 3
    });
    asphaltPaver.speed = 0;
    asphaltPaver.amount = 0;
    asphaltPaver.gas = 700;




    var indicator = game.newRectObject({
        h: 5,
        w: asphaltPaver.gas/16,
        x: asphaltPaver.x,
        y: asphaltPaver.y,
        fillColor: "red"
    });


    var indicator2 = game.newRectObject({
        h: 5,
        w: 30,
        x: 100,
        y: 100,
        fillColor: "red",
        strokeColor: "balck",
        strokeWidth: "1"
    });





    var aIndicator = game.newRectObject({
        h: 5,
        w: asphaltPaver.amount/2,
        x: asphaltPaver.x,
        y: asphaltPaver.y-20,
        fillColor: "blue"
    });



    var connect = game.newImageObject({
        file: "img/connect.png",
        h: 12,
        w: 15,
        x: asphaltPaver.x-10,
        y: asphaltPaver.y+20
    });





                            // W o r k s p a c e

    var workspace = game.newImageObject({
        file: "img/ausqv.png",
        x : width - 100,
        y : height - 100,
        w : 80,
        h : 50,
        radius : 10,
        fillColor : "white",
        strokeColor: "black",
        strokeWidth: 4
    });



                    //  S t a r t P o i n t

    var startPoint = game.newImageObject({
        file: "img/base.png",
        x : 30,
        y : 25,
        w : 100,
        h : 50,
        radius : 10,
        fillColor : "#ccc",
        strokeColor: "black",
        strokeWidth: 4
    });



                    //  G A S

    var gasStation = game.newImageObject({
        file: "img/gas.png",
        x : 20,
        y : height - 124,
        w : 53,
        h : 53
    });


    // G A S    C A R


    var gasCar = game.newImageObject({
        file: "img/btruck.png",
        w: 30,
        h: 18,
        x: 40,
        y: 657
    });
    gasCar.speed = 1.6*dx;
    gasCar.command = 1;
    gasCar.moveToStart = function() {
        this.command = 2;
    };
    gasCar.moveToAP = function() {
        this.command = 1;
    };


    //  S L A V E


    var slave = game.newPolygonObject({
       points : [ point(0, 15), point(0,0), point(15,7.5)],
       x: 1000,
       y: 685,
       fillColor: "blue",
       strokeColor: "black",
       strokeWidth: 2
    });
    slave.speed = 3*dx;
    slave.command = 2;
    slave.moveToStart = function() {
        this.command = 2;
    };
    slave.moveToAP = function() {
        this.command = 1;
    };

/*

    var slave2 = game.newCircleObject({
        radius: 10,
        x: 1000,
        y: 660,
        fillColor: "white",
        strokeColor: "black",
        strokeWidth: 2
    });
    slave2.speed = 3*dx;
    slave2.command = 2;
    slave2.moveToStart = function() {
        this.command = 2;
    };
    slave2.moveToAP = function() {
        this.command = 1;
    };
*/




    var cleaner = game.newPolygonObject({
        points : [ point(0, 15), point(0,0), point(15,7.5)],
        x: 1000,
        y: 680,
        fillColor: "green",
        strokeColor: "black",
        strokeWidth: 2
    });
    cleaner.speed = dx;






    //R  O  A  D

    var roadG = game.newRoundRectObject({
        h: 300,
        w: 30,
        x: 80,
        y: 90,
        radius: 10,
        fillColor: "#666"
    });

    var roadV = game.newRoundRectObject({
        h: 30,
        w: 200,
        radius: 10,
        x: 80,
        y: 360,
        fillColor: "#666"
    });

    var roadG2 = game.newRoundRectObject({
        h: 315,
        w: 30,
        x: 260,
        y: 360,
        radius: 10,
        fillColor: "#666"
    });

    var roadV2 = game.newRoundRectObject({
        h: 30,
        w: 730,
        radius: 10,
        x: 260,
        y: 660,
        fillColor: "#666"
    });

    var roadG3 = game.newRectObject({
        h: 30,
        w: 100,
        x: 0,
        y: 90,
        radius: 10,
        fillColor: "#666"
    });

    //bad  roads

    var badRoad1 = game.newRoundRectObject({
        h: 575,
        w: 30,
        radius: 10,
        x: 995,
        y: 90,
        fillColor: "#aaa"
    });


    var badRoad2 = game.newRoundRectObject({
        h: 30,
        w: 920,
        radius: 10,
        x: 105,
        y: 90,
        fillColor: "#aaa"
    });

    var badRoad3 = game.newRoundRectObject({
        h: 330,
        w: 30,
        radius: 10,
        x: 80,
        y: 360,
        fillColor: "#aaa"
    });

    var badRoad4 = game.newRoundRectObject({
        h: 30,
        w: 300,
        radius: 10,
        x: 80,
        y: 660,
        fillColor: "#aaa"
    });






                                                    //  E    V   E   N   T   S


    start.addEventListener("click", function() {
        choice.go();
    });

    finish.addEventListener("click", function() {
        choice.finish();
        cont.style.display = "block";

    });



    body.addEventListener("mousemove",function(e) {

            omX = e.pageX;
            omY = e.pageY;

    });


    stopAct.addEventListener("click", function() {
        choice.changeStop();
        if(choice.selectStop == false) {
            stopAct.innerHTML = "off";
        }
        else {
            stopAct.innerHTML = "on";
        }

    });

    stop.addEventListener("click", function() {
        if(choice.selectStop == true) {
            stops.push(game.newCircleObject({
                radius: 10,
                x: Math.random()* width-20,
                y: Math.random()* height-20,
                fillColor: "#93120C"
            }));
        }
    });



    flagAct.addEventListener("click", function() {
        choice.changeFlag();
        if(choice.selectFlag == false) {
            flagAct.innerHTML = "off";
        }
        else {
            flagAct.innerHTML = "on";
        }

    });

    flag.addEventListener("click", function() {
        if(choice.selectFlag == true) {
            flags.push(game.newCircleObject({
                radius: 4,
                x: math.random(200, 900),
                y: math.random(100, 659),
                fillColor: "green"
            }));
        }
    });





    hire.addEventListener("click", function() {
        ships.push(game.newImageObject({
            file: "img/atruck2.png",
            h: 15,
            w: 24,
            x: 75,
            y: 30,
            userData: {
                speed : 1.6,
                command : 1,
                moveToStart : function() {
                    this.command = 2;
                },
                moveToFinish : function() {
                    this.command = 1;
                }
            }
        }));
    });

    dismiss.addEventListener("click", function() {
        if(ships.length != 0) {
            //ships.splice(ships.length - 1, 1);
            ships[ships.length-1].moveToStart();


        }
    });

    water.addEventListener("click", function() {
       dx++;
    });





        setTimeout(function(){

            ships.push(game.newImageObject({
                file: "img/atruck2.png",
                h: 15,
                w: 24,
                x: 75,
                y: 30,
                userData: {
                    speed : 1.6,
                    command : 1,
                    moveToStart : function() {
                        this.command = 2;
                    },
                    moveToFinish : function() {
                        this.command = 1;
                    }
                }
            }));
        },1000);




        setTimeout(function(){

            ships.push(game.newImageObject({
                file: "img/atruck2.png",
                h: 15,
                w: 24,
                x: 75,
                y: 30,
                userData: {
                    speed : 1.6,
                    command : 1,
                    moveToStart : function() {
                        this.command = 2;
                    },
                    moveToFinish : function() {
                        this.command = 1;
                    }
                }
            }));
        },8000);

        setTimeout(function(){

            ships.push(game.newImageObject({
                file: "img/atruck2.png",
                h: 15,
                w: 24,
                x: 75,
                y: 30,
                userData: {
                    speed : 1.6,
                    command : 1,
                    moveToStart : function() {
                        this.command = 2;
                    },
                    moveToFinish : function() {
                        this.command = 1;
                    }
                }
            }));
        },15000);



        setTimeout(function(){

            ships.push(game.newImageObject({
                file: "img/atruck2.png",
                h: 15,
                w: 24,
                x: 75,
                y: 30,
                userData: {
                    speed : 1.6,
                    command : 1,
                    moveToStart : function() {
                        this.command = 2;
                    },
                    moveToFinish : function() {
                        this.command = 1;
                    }
                }
            }));
        },22000);


        setTimeout(function(){

            ships.push(game.newImageObject({
                file: "img/atruck2.png",
                h: 15,
                w: 24,
                x: 75,
                y: 30,
                userData: {
                    speed : 1.6,
                    command : 1,
                    moveToStart : function() {
                        this.command = 2;
                    },
                    moveToFinish : function() {
                        this.command = 1;
                    }
                }
            }));
        },29000);









                                         //  G   A   M   E       C   I   C   L   E   !!!!!!!


    this.update = function() {

        game.clear();





        if(choice.start && choice.time) {
            agentsC.innerHTML = "Agents : " + ships.length;

            timing = timing + 0.01;

            timeC.innerHTML = "Time : " + Math.round(timing);

        }


        if(asphaltPaver.speed > 0 && choice.start && choice.time) {
            materialplus += 0.5;
            fuelplus += 0.2;


            material.innerHTML = "Material : " + Math.round(materialplus);

            fuel.innerHTML = "Fuel : " + Math.round(fuelplus);
        }







        badRoad1.draw();
        badRoad2.draw();
        badRoad3.draw();
        badRoad4.draw();
        roadG.draw();
        roadG2.draw();
        roadV.draw();
        roadV2.draw();
        roadG3.draw();



        //     A P

        if(choice.start) {







            asphaltPaver.speed = choice.ura && asphaltPaver.amount > 0 && asphaltPaver.gas > 0 && ( !(asphaltPaver.isIntersect(slave)) /* &&  !(asphaltPaver.isIntersect(slave2))*/ ) && !(asphaltPaver.isArrIntersect(stops)) ? 0.5 * dx : 0;


            if (asphaltPaver.speed != 0 && asphaltPaver.gas > 0) {
                asphaltPaver.gas--;
            }

            if (asphaltPaver.amount > 0 && asphaltPaver.speed > 0) asphaltPaver.amount = asphaltPaver.amount -2 ;

            if (slave.isIntersect(asphaltPaver)) asphaltPaver.amount = 700;

            //if (slave2.isIntersect(asphaltPaver)) asphaltPaver.amount = 700;


            if (asphaltPaver.amount > 0 && asphaltPaver.speed > 0) {
                asphalt.push(game.newRoundRectObject({
                    h: 37,
                    w: 37,
                    radius: 10,
                    x: asphaltPaver.x,
                    y: asphaltPaver.y,
                    fillColor: "#666"
                }));

            }

            if (flags.length > 0) {
                asphaltPaver.moveTo(flags[i], asphaltPaver.speed);

                if (asphaltPaver.isIntersect(flags[i]) && i < flags.length - 1) {
                    i++;
                }

            } else if (asphaltPaver.y >= 85 && asphaltPaver.x >= 990) {
                asphaltPaver.angle = 0;
                asphaltPaver.move(v2d(0, -asphaltPaver.speed));
            } else if (asphaltPaver.y <= 85 && asphaltPaver.x >= 80) {
                asphaltPaver.angle = 90;
                asphaltPaver.move(v2d(-asphaltPaver.speed, 0));
            } else if (asphaltPaver.y <= 650 && asphaltPaver.x <= 80) {
                asphaltPaver.angle = 0;
                asphaltPaver.move(v2d(0, asphaltPaver.speed));
            } else if (asphaltPaver.y >= 650 && asphaltPaver.x <= 950) {
                asphaltPaver.angle = 90;
                asphaltPaver.move(v2d(asphaltPaver.speed, 0));
            }

            indicator.x = asphaltPaver.x;
            indicator.y = asphaltPaver.y;

            indicator.w = asphaltPaver.gas/16;


            aIndicator.x = asphaltPaver.x;
            aIndicator.y = asphaltPaver.y-10;

            aIndicator.w = asphaltPaver.amount/15;



        }


        //    A  R  R  A  Y  S




        if(choice.start) {


            OOP.forArr(flags, function (el) {
                el.draw();
            });

            OOP.forArr(stops, function (el) {
                el.draw();
            });

            OOP.forArr(asphalt, function (el) {
                el.draw();
            });


        }


                                     //  S   H   I   P




                                         //  G  A  S   C  A  R
        if(choice.start) {

            gasCar.speed = 1.5 * dx;


            if (gasCar.command == 1) gasCar.rotateForPoint(point(asphaltPaver.x, asphaltPaver.y), 100);


            if (gasCar.command == 1 && asphaltPaver.gas < 200) {

                connect.x = asphaltPaver.x-15;
                connect.y = asphaltPaver.y+15;
                connect.angle = 300;

                connect.draw();


                if (gasCar.x <= 970 && gasCar.y >= 657) {
                    gasCar.angle = 0;
                    gasCar.move(v2d(gasCar.speed, 0));
                } else if (gasCar.x >= 970 && gasCar.y >= 627) {
                    gasCar.angle = 90;
                    gasCar.move(v2d(0, -gasCar.speed));
                } else if (gasCar.x <= 1000 && gasCar.y >=625) {
                    gasCar.angle = 0;
                    gasCar.move(v2d(gasCar.speed, 0));
                } else if (gasCar.x >= 1000 && gasCar.y >= 85) {
                    gasCar.angle = 90;
                    gasCar.move(v2d(0, -gasCar.speed));
                } else if (gasCar.y <= 85 && gasCar.x >= 80) {
                    gasCar.angle = 180;
                    gasCar.move(v2d(-gasCar.speed, 0));
                } else if (gasCar.y <= 630 && gasCar.x <= 80) {
                    gasCar.angle = 270;
                    gasCar.move(v2d(0, gasCar.speed));
                } else if (gasCar.y >= 630 && gasCar.x <= 950) {
                    gasCar.angle = 0;
                    gasCar.move(v2d(gasCar.speed, 0));
                }







                //gasCar.moveTo(asphaltPaver, gasCar.speed);
            } else if (gasCar.command == 2) {


                if (gasCar.x >= 40 && gasCar.y >= 657) {
                    gasCar.angle = 180;
                    gasCar.move(v2d(-gasCar.speed, 0));

                } else if (gasCar.x <= 1000 && gasCar.y <= 84) {
                    gasCar.angle = 0;
                    gasCar.move(v2d(gasCar.speed, 0));

                } else if (gasCar.x <= 970 && gasCar.y <= 657) {
                    gasCar.angle = 270;
                    gasCar.move(v2d(0, gasCar.speed));

                } else if (gasCar.x >= 970 && gasCar.y >=621) {
                    gasCar.angle = 180;
                    gasCar.move(v2d(-gasCar.speed, 0));

                }  else if (gasCar.x >= 1000 && gasCar.y <= 621) {
                    gasCar.angle = 270;
                    gasCar.move(v2d(0, gasCar.speed));
                } /*else if (gasCar.y <= 630 && gasCar.x <= 81) {
                    gasCar.angle = 0;
                    gasCar.move(v2d(0, -gasCar.speed));
                } else if (gasCar.y >= 630 && gasCar.x <= 950) {
                    gasCar.angle = 90;
                    gasCar.move(v2d(-gasCar.speed, 0));
                }*/




                //gasCar.rotateForObject(gasStation, 10);
                //gasCar.moveTo(point(30, 647), gasCar.speed);
            }

            if (gasCar.isIntersect(asphaltPaver)) {
                gasCar.moveToStart();
                asphaltPaver.gas = 700;
            }

            if (gasCar.isIntersect(gasStation)) {
                setTimeout(function () {
                    gasCar.moveToAP();
                }, 1000)

            }
        }

                                    //S  L  A  V  E

        if(choice.start) {


            slave.speed = dx;

            if (slave.command == 1) {

                slave.moveTo(asphaltPaver, slave.speed);
                slave.rotateForObject(asphaltPaver, 10);


            } else if (slave.command == 2) {
                slave.moveTo(workspace.getPosition(1), slave.speed);
                slave.rotateForObject(workspace, 10);
            }


            if (slave.isIntersect(asphaltPaver)) {
                slave.moveToStart();
            }

            if(asphaltPaver.amount < 100) {
                slave.moveToAP();

            }

/*


            slave2.speed = 1;

            if (slave2.command == 1) {

                slave2.moveTo(asphaltPaver, slave2.speed);


            } else if (slave.command == 2) {
                slave2.moveTo(workspace.getPosition(1), slave2.speed);
            }


            if (slave2.isIntersect(asphaltPaver)) {
                slave2.moveToStart();
            }
*/


        }




                            // S T O P S
        if(choice.start) {




            if(stops.length > 0) {
                cleaner.moveTo(stops[0], cleaner.speed);
                cleaner.rotateForObject(stops[0], 10);
                if(cleaner.isIntersect(stops[0])) {
                    stops.splice(0,1);
                }
            } else {
                cleaner.moveTo(point(1000,671), cleaner.speed);
                cleaner.rotateForObject(workspace, 10);
            }


            if (choice.selectStop == true && mouse.isPress("LEFT") && omX < width && choice.selectFlag == false) {
                stops.push(game.newCircleObject({
                    radius: 10,
                    x: omX,
                    y: omY,
                    fillColor: "#93120C"
                }));
            }

            if (choice.selectFlag == true && mouse.isPress("LEFT") && omX < width && choice.selectStop == false) {
                flags.push(game.newCircleObject({
                    radius: 3,
                    x: omX,
                    y: omY,
                    fillColor: "green"
                }));
            }

        }
                            //  F L A G S


            slave.draw();
            //slave2.draw();
            cleaner.draw();
            asphaltPaver.draw();
            gasCar.draw();




        if(choice.start) {


            OOP.forArr(ships, function (el,i) {

/*                var nearest = el.getNearest( ships );

                console.log(nearest);*/

                el.speed = 1.5 * dx;

                indicator2.draw();


                indicator2.x = el.x;
                indicator2.y = el.y-10;

                if (el.command == 1) {


                    if (el.x <= 90 && el.y <= 360) {
                        el.angle = 90;
                        el.move(v2d(0, el.speed));
                    } else if (el.x <= 255 && el.y >= 360) {
                        el.angle = 0;
                        el.move(v2d(el.speed, 0));
                    } else if (el.x >= 255 && el.y <= 670) {
                        el.angle = 90;
                        el.move(v2d(0, el.speed));
                    } else if (el.x < 1000 && el.y >= 670) {
                        el.angle = 0;
                        el.move(v2d(el.speed), 0);
                    }


                    //el.moveTo(workspace.getPosition(1), el.speed);
                    //el.rotateForObject(workspace,10);
                }
                else if (el.command == 2) {
                    if (el.x >= 272 && el.y >= 670) {
                        el.angle = 180;
                        el.move(v2d(-el.speed, 0));
                    } else if (el.x <= 272 && el.y >= 370) {
                        el.angle = 270;
                        el.move(v2d(0, -el.speed));
                    } else if (el.x >= 85 && el.y <= 370) {
                        el.angle = 180;
                        el.move(v2d(-el.speed, 0));
                    } else if (el.x <= 85 && el.y >= 40) {
                        el.angle = 270;
                        el.move(v2d(0, -el.speed));
                    }
                    // el.moveTo(startPoint.getPosition(1), el.speed);
                    // el.rotateForObject(startPoint,10);
                }




                if (el.isIntersect(workspace)) {

                        choice.win();

                        setTimeout(function () {
                            el.moveToStart();
                        }, 3000);




                    /* else {
                        setTimeout(function () {
                            slave2.moveToAP();
                        }, 1000);


                        setTimeout(function () {
                            el.moveToStart();

                        }, 3000);


                    }*/



                }



                if (el.isIntersect(startPoint)) {
                    setTimeout(function () {
                        el.moveToFinish();
                    }, 3000);

                }


                el.draw();

            });

        }


        startPoint.draw();
        workspace.draw();
        gasStation.draw();
        indicator.draw();
        aIndicator.draw();





    };






});
game.startLoop("myGame");



