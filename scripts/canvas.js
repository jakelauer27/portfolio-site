window.requestAnimFrame = function()
	{
		return (
			window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			}
		);
}();

const canvas = document.getElementById('canvas'); 
const context = canvas.getContext('2d');

let dpi = window.devicePixelRatio || 1;
context.scale(dpi, dpi);

function fix_dpi() {
//get CSS height
//the + prefix casts it to an integer
//the slice method gets rid of "px"
let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

//scale the canvas
canvas.setAttribute('height', style_height * dpi);
canvas.setAttribute('width', style_width * dpi);
}

	const particle_count = 100,
		particles = [],
    colors = ["rgba(161,106,255, .5)", "rgba(25,96,150, .5)", "rgba(81,40,156, .5)"];
    
    class Particle {
      constructor() {
        this.radius = Math.round((Math.random()*3)+2);
        this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
        this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
        this.color = colors[Math.round(Math.random()*colors.length-1)];
        this.speedx = Math.round((Math.random()*151)+0)/100;
        this.speedy = Math.round((Math.random()*151)+0)/100;
  
        switch (Math.round(Math.random()*colors.length))
        {
            case 1:
            this.speedx *= .6;
            this.speedy *= .6;
            break;
            case 2:
            this.speedx *= -.4;
            this.speedy *= .4;
            break;
            case 3:
            this.speedx *= .4;
            this.speedy *= -.4;
            break;
        }
      }

      move() {
        context.beginPath();
        context.globalCompositeOperation = 'source-over';
        context.fillStyle = this.color;
        context.globalAlpha = 1;
        context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        context.fill();
        context.closePath();

        this.x = this.x + this.speedx;
        this.y = this.y + this.speedy;
        
        if(this.x <= 0+this.radius)
        {
            this.speedx *= -1;
        }
        if(this.x >= canvas.width-this.radius)
        {
            this.speedx *= -1;
        }
        if(this.y <= 0+this.radius)
        {
            this.speedy *= -1;
        }
        if(this.y >= canvas.height-this.radius)
        {
            this.speedy *= -1;
        }

        for (let j = 0; j < particle_count; j++)
        {
            let particleActuelle = particles[j],
                yd = particleActuelle.y - this.y,
                xd = particleActuelle.x - this.x,
                d  = Math.sqrt(xd * xd + yd * yd);

            if ( d < 300 )
            {
                context.beginPath();
                context.globalAlpha = (300 - d) / (300 - 0);
                context.globalCompositeOperation = 'destination-over';
                context.lineWidth = 2;
                context.moveTo(this.x, this.y);
                context.lineTo(particleActuelle.x, particleActuelle.y);
                context.strokeStyle = this.color;
                context.lineCap = "round";
                context.stroke();
                context.closePath();
            }
        }
      }
    };
    for (let i = 0; i < particle_count; i++)
    {
        fix_dpi();
        const particle = new Particle();
        particles.push(particle);
    }

    function animate()
    {
        fix_dpi();
        context.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particle_count; i++)
        {
            particles[i].move();
        }
        requestAnimFrame(animate);
    }
   
    animate(); 
