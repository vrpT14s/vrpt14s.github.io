const canvas = document.getElementById('canvasDemo1');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = '/assets/img/tiger.jpg';

var x = 0;
setInterval(() => {
	x += 0.3;
	//console.log(`changed ${x}`);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, 
		canvas.width/4 + (20*Math.cos(x)), canvas.height/7 + (20*Math.sin(x)), 
		img.width/1.5, img.height/1.5);
}, 1000/30 /*30fps*/);
