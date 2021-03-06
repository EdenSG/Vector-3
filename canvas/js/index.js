var size = 30;

var a = document.getElementById("canvas");
var ctx = a.getContext("2d");
var width = window.innerWidth/2;
var height = window.innerHeight;

a.width = width;
a.height = height;

var i;
var x, y;
x = 0;
y = 0;
var time = 0;
var xOffset = 0;
var yOffset = 0;
var xOffsetObj = 0;
var yOffsetObj = 0;

var mouseDown = false;
var mousePosOld = {
  x: 0,
  y: 0
};
var mousePos = {
  x: 0,
  y: 0
};

var limit_h = 3 * height / size;
var limit_w = 3 * width / size;

console.log(limit_h, limit_w);

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var y = 0; y < limit_h; y++) {
		for (i = 0; i < limit_w; i++) {
			ctx.strokeStyle = "#000";
      ctx.lineWidth = 1;
			ctx.fillStyle = "transparent";
			ctx.strokeRect((i * size) + xOffset - width, (y * size) + yOffset - height, size - 0.5, size - 0.5 );
			ctx.fillRect((i * size) + xOffset - width, (y * size) + yOffset - height, size - 0.5, size - 0.5 );
		}
	}
  ctx.fillStyle="red";
  ctx.fillRect(4*size + 1 + xOffset, 4*size + 12 + yOffset, size-2, size-2);
  ctx.fillStyle="blue";
  ctx.fillRect(200 + xOffsetObj, 200 + yOffsetObj, size, size);
}

function loop() {
	time++;
	yOffset = yOffset % size ;
  xOffset = xOffset % size ;
	draw();
	requestAnimationFrame(loop);
  
}

loop();


document.addEventListener('mousedown', function (e) {
	mouseDown = true;
  mousePosOld.x = e.clientX;
  mousePosOld.y = e.clientY;
});

document.addEventListener('mousemove', function (e) {
    mousePosOld.x = (e.clientX);
    mousePosOld.y = (e.clientY);
  if (mouseDown) {
    xOffset -= (mousePos.x - mousePosOld.x);
    yOffset -= (mousePos.y - mousePosOld.y);
    xOffsetObj -= (mousePos.x - mousePosOld.x);
    yOffsetObj -= (mousePos.y - mousePosOld.y);
  }
  mousePos.x = (e.clientX);
    mousePos.y = (e.clientY);
});

document.addEventListener('mouseup', function (e) {
	mouseDown = false;
});

function resetPos() {
  xOffset = 0;
  yOffset = 0;
  xOffsetObj = 0;
  yOffsetObj = 0;
}