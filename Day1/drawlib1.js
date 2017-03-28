   var startTime = Date.now() / 1000,
       time = startTime;

   function draw2DCanvases(canvases) {
       for (var i = 0; i < canvases.length; i++)
           trackCursor(canvases[i]);
       setInterval(function() {
           var i, canvas, context;
           time = Date.now() / 1000 - startTime;
           for (i = 0; i < canvases.length; i++)
               if ((canvas = canvases[i]).update) {
                   context = canvas.getContext('2d');
                   context.clearRect(0, 0, canvas.width, canvas.height);
                   canvas.update(context);
               }
       }, 30);
   }

   function trackCursor(canvas) {
       canvas.cursor = {
           x: 0,
           y: 0,
           z: 0
       };
       canvas.setCursor = function(x, y, z) {
           var r = this.getBoundingClientRect();
           this.cursor.x = x - r.left;
           this.cursor.y = y - r.top;
           if (z !== undefined)
               this.cursor.z = z;
       }
       canvas.onmousedown = function(e) {
           this.setCursor(e.clientX, e.clientY, 1);
       }
       canvas.onmousemove = function(e) {
           this.setCursor(e.clientX, e.clientY);
       }
       canvas.onmouseup = function(e) {
           this.setCursor(e.clientX, e.clientY, 0);
       }
   }

   canvas2.update = function(g) {
      g.lineWidth = 5;

      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(this.width, 0);
      g.lineTo(this.width, this.height);
      g.lineTo(0, this.height);
      g.lineTo(0, 0);
      g.stroke();

      var x = this.cursor.x;
      var y = this.cursor.y;
      var z = this.cursor.z;
      if (z == 0) {
         x = this.width  / 2 + 30 * Math.sin(time) ;
         y = this.height / 2 + 30 * Math.cos(time);
      }

      var freq = z == 0 ? 6 : 12;
      var f = .2;
      var angle = -2 * f * (Math.sin(freq * time) - 0.5);
      var angle2 =     f * (Math.cos(freq * time) - 1);

      var flapY = 40 * Math.sin(angle);
      var flapX = 40 * Math.cos(angle);

      var flapY2 = 40 * Math.sin(2 * angle2);
      var flapX2 = 40 * Math.cos(2 * angle2);

      g.moveTo(x-flapX-flapX2, y-flapY-flapY2);
      g.lineTo(x-flapX, y-flapY);
      g.lineTo(x, y);
      g.lineTo(x+flapX, y-flapY);
      g.lineTo(x+flapX+flapX2, y-flapY-flapY2);
      g.stroke();
   }

   draw2DCanvases([ canvas2 ]);
   var cc = document.getElementById("canvas2");
   var img    = cc.toDataURL("image/png");
   document.write('<img src="'+img+'"/>');
