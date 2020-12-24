(() => {
   const canvas = document.querySelector(`canvas`);
   const ctx = canvas.getContext(`2d`);

   const particleArray = [];
   const numberOfParticles = 200;

   const mouse = {
      x: null,
      y: null
   }

   window.addEventListener('mousemove', function(e) {
      mouse.x = e.x;
      mouse.y = e.y;

      //console.log(mouse.x, mouse.y)
   })

   setInterval(() => {
      mouse.x = undefined;
      mouse.y = undefined;
   },200)

   class Particles {
      constructor(x,y,size, color, weight) {
         this.x = x;
         this.y = y;
         this.size = size;
         this.color = color;
         this.weight = weight;
      }
      draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
         ctx.fillStyle = this.color;
         ctx.fill();
      }
      update() {
         this.size -= 0.05;

         if (this.size < 0) {
            this.x = (mouse.x *2 + ((Math.random() * 20) - 10))
            this.y = (mouse.y *2 + ((Math.random() * 20) - 10))
            this.size = (Math.random() * 10) + 2;
            this.weight = (Math.random() * 2) - 0.05;
         }
         this.y += this.weight;
         this.weight += 0.2;

         if(this.y > canvas.height - this.size) {
            this.weight *= (-0.9);
         }
      }
   }


   function init() {
      canvas.width = innerWidth * 2;
      canvas.height = innerHeight * 2;

      for (let i = 0; i < numberOfParticles; i++) {
         let x = Math.random() * canvas.width
         let y = Math.random() * canvas.height
         let size = (Math.random() * 5) + 2
         let color = 'white'
         let weight = 0;
         particleArray.push(new Particles(x,y,size,color, weight))
      }
   }
   init();

   function loop() {
      ctx.fillStyle = 'rgba(0,0,0,0.8)';
      ctx.fillRect(0,0,canvas.width, canvas.height)
      for(let i = 0; i < particleArray.length; i++) {
         particleArray[i].update();
         particleArray[i].draw();
      }

      requestAnimationFrame(loop);
   }
   loop();

   window.addEventListener(`resize`, init);



})();
