// // var space;

// // function floatySpace() {
// //   var colors = [
// //     "#FF3F8E", "#04C2C9", "#2E55C1"
// //   ];


// //   space = new CanvasSpace("canvas", "#252934" ).display();
// //   var form = new Form( space );

// //   // Elements
// //   var pts = [];
// //   var center = space.size.$divide(1.8);
// //   var angle = -(window.innerWidth * 0.5);
// //   var count = window.innerWidth * 0.05;
// //   if (count > 150) count = 150;
// //   var line = new Line(0, angle).to(space.size.x, 0);
// //   var mouse = center.clone();

// //   var r = Math.min(space.size.x, space.size.y) * 1;
// //   for (var i=0; i<count; i++) {
// //     var p = new Vector( Math.random()*r-Math.random()*r, Math.random()*r-Math.random()*r );
// //     p.moveBy( center ).rotate2D( i*Math.PI/count, center);
// //     p.brightness = 0.1
// //     pts.push( p );
// //   }

// //   // Canvas
// //   space.add({
// //     animate: function(time, fps, context) {

// //       for (var i=0; i<pts.length; i++) {
// //         // rotate the points slowly
// //         var pt = pts[i];

// //         pt.rotate2D( Const.one_degree / 20, center);
// //         form.stroke( false ).fill( colors[i % 3] ).point(pt, 1);

// //         // get line from pt to the mouse line
// //         var ln = new Line( pt ).to( line.getPerpendicularFromPoint(pt));

// //         // opacity of line derived from distance to the line
// //         var opacity = Math.min( 0.8, 1 - Math.abs( line.getDistanceFromPoint(pt)) / r);
// //         var distFromMouse = Math.abs(ln.getDistanceFromPoint(mouse))

// //         if (distFromMouse < 50) {
// //           if (pts[i].brightness < 0.3) pts[i].brightness += 0.015
// //         } else {
// //           if (pts[i].brightness > 0.1) pts[i].brightness -= 0.01
// //         }

// //         var color = "rgba(255,255,255," + pts[i].brightness +")"
// //         form.stroke(color).fill( true ).line(ln);
// //       }
// //     },

// //     onMouseAction: function(type, x, y, evt) {
// //       if (type=="move") {
// //         mouse.set(x,y);
// //       }
// //     },

// //     onTouchAction: function(type, x, y, evt) {
// //       this.onMouseAction(type, x, y);
// //     }
// //   });

// //   space.bindMouse();
// //   space.play();
// // }

// // floatySpace();

// // $(window).resize(function(){
// //   space.removeAll();
// //   $('canvas').remove();
// //   floatySpace();
// // });

// function Banner(){
  
//   var keyword = "HEY";
//   var canvas;
//   var context;
  
//   var bgCanvas;
//   var bgContext;
  
//   var denseness = 10;
  
//   //Each particle/icon
//   var parts = [];
  
//   var mouse = {x:-100,y:-100};
//   var mouseOnScreen = false;
  
//   var itercount = 0;
//   var itertot = 40;
  
//   this.initialize = function(canvas_id){
//     canvas = document.getElementById(canvas_id);
//     context = canvas.getContext('2d');
    
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    
//     bgCanvas = document.createElement('canvas');
//     bgContext = bgCanvas.getContext('2d');
    
//     bgCanvas.width = window.innerWidth;
//     bgCanvas.height = window.innerHeight;
  
//     canvas.addEventListener('mousemove', MouseMove, false);
//     canvas.addEventListener('mouseout', MouseOut, false);
      
//     start();
//   }
  
//   var start = function(){
      
//     bgContext.fillStyle = "#000000";
//     bgContext.font = '300px impact';
//     bgContext.fillText(keyword, 85, 275);
    
//     clear();  
//     getCoords();
//   }
  
//   var getCoords = function(){
//     var imageData, pixel, height, width;
    
//     imageData = bgContext.getImageData(0, 0, canvas.width, canvas.height);
    
//     // quickly iterate over all pixels - leaving density gaps
//       for(height = 0; height < bgCanvas.height; height += denseness){
//             for(width = 0; width < bgCanvas.width; width += denseness){   
//                pixel = imageData.data[((width + (height * bgCanvas.width)) * 4) - 1];
//                   //Pixel is black from being drawn on. 
//                   if(pixel == 255) {
//                     drawCircle(width, height);
//                   }
//             }
//         }
        
//         setInterval( update, 40 );
//   }
  
//   var drawCircle = function(x, y){
    
//     var startx = (Math.random() * canvas.width);
//     var starty = (Math.random() * canvas.height);
    
//     var velx = (x - startx) / itertot;
//     var vely = (y - starty) / itertot;  
    
//     parts.push(
//       {c: '#' + (Math.random() * 0x949494 + 0xaaaaaa | 0).toString(16),
//        x: x, //goal position
//        y: y,
//        x2: startx, //start position
//        y2: starty,
//        r: true, //Released (to fly free!)
//        v:{x:velx , y: vely}
//       }
//     )
//   }
    
//   var update = function(){
//     var i, dx, dy, sqrDist, scale;
//     itercount++;
//     clear();
//     for (i = 0; i < parts.length; i++){
          
//       //If the dot has been released
//       if (parts[i].r == true){
//         //Fly into infinity!!
//         parts[i].x2 += parts[i].v.x;
//             parts[i].y2 += parts[i].v.y;
//       //Perhaps I should check if they are out of screen... and kill them?
//       }
//       if (itercount == itertot){
//         parts[i].v = {x:(Math.random() * 6) * 2 - 6 , y:(Math.random() * 6) * 2 - 6};
//         parts[i].r = false;
//       }
      
  
//       //Look into using svg, so there is no mouse tracking.
//       //Find distance from mouse/draw!
//       dx = parts[i].x - mouse.x;
//           dy = parts[i].y - mouse.y;
//           sqrDist =  Math.sqrt(dx*dx + dy*dy);
      
//       if (sqrDist < 20){
//         parts[i].r = true;
//       }       

//       //Draw the circle
//       context.fillStyle = parts[i].c;
//       context.beginPath();
//       context.arc(parts[i].x2, parts[i].y2, 4 ,0 , Math.PI*2, true);
//       context.closePath();
//         context.fill();  
        
//     }  
//   }
  
//   var MouseMove = function(e) {
//       if (e.layerX || e.layerX == 0) {
//         //Reset particle positions
//         mouseOnScreen = true;
        
        
//           mouse.x = e.layerX - canvas.offsetLeft;
//           mouse.y = e.layerY - canvas.offsetTop;
//       }
//   }
  
//   var MouseOut = function(e) {
//     mouseOnScreen = false;
//     mouse.x = -100;
//     mouse.y = -100;  
//   }
  
//   //Clear the on screen canvas
//   var clear = function(){
//     canvas.width = canvas.width;
//   }
// }

// var banner = new Banner();
// banner.initialize("canvas");

// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)

// window.demoDescription = "Particles colliding with each other in space. Move the pointer to hit them like billiard balls.";


Pts.quickStart( "#pt", "#123" );
console.log('Canvas >> ');
//// Demo code starts (anonymous function wrapper is optional) ---

(function() {

  var world;

  space.add( {

    start: (bound, space) => {

      // Create world and 100 random points
      world = new World( space.innerBound, 1, 0 );
      let pts = Create.distributeRandom( space.innerBound, 100 );
      
      // Create particles and hit them with a random impulse
      for (let i=0, len=pts.length; i<len; i++) {
        let p = new Particle( pts[i] ).size( (i===0) ? 30 : 3+Math.random()*space.size.x/50 );
        p.hit( Num.randomRange(-50,50), Num.randomRange(-25, 25) );
        world.add( p );
      }

      world.particle( 0 ).lock = true; // lock it to move it by pointer later on

    },


    animate: (time, ftime) => {
      world.drawParticles( (p, i) => {
        let color = (i===0) ? "#fff" : ["#ff2d5d", "#42dc8e", "#2e43eb", "#ffe359"][i%4];
        form.fillOnly( color ).point( p, p.radius, "circle" ) 
      });

      world.update( ftime );
    },


    action:( type, px, py) => {
      if (type == "move") {
        world.particle( 0 ).position = new Pt(px, py);
      }
    },

    resize: (bound, evt) => {
      if (world) world.bound = space.innerBound;
    }
  });
  
  space.bindMouse().bindTouch();
  space.play();

})();