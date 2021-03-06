var size = 30;

var a = document.getElementById("canvas");
var ctxa = a.getContext("2d");
var labelsA = [a.getContext("2d"), a.getContext("2d")];

var b = document.getElementById("canvas2");
var ctxb = b.getContext("2d");
var labelsB = [b.getContext("2d"), b.getContext("2d")];

var width = window.innerWidth / 2;
var height = window.innerHeight;

a.width = width;
a.height = height;

b.width = width;
b.height = height;

var i;
var x, y, z;
x = 0;
y = 0;
z = 0;
var time = 0;
var xOffset = 0;
var yOffset = 0;
var zOffset = 0;
var xOffsetObj = 0;
var yOffsetObj = 0;
var zOffsetObj = 0;

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
    ctxa.translate(0, 0);
    ctxa.rotate(0);
    ctxa.clearRect(0, 0, canvas.width, canvas.height);
    for (var y = 0; y < limit_h; y++) {
        for (i = 0; i < limit_w; i++) {
            ctxa.strokeStyle = "#000";
            ctxa.lineWidth = 1;
            ctxa.fillStyle = "transparent";
            ctxa.strokeRect((i * size) + yOffset - width, (y * size) + xOffset - height, size - 0.5, size - 0.5);
            ctxa.fillRect((i * size) + yOffset - width, (y * size) + xOffset - height, size - 0.5, size - 0.5);
        }
    }
    ctxa.fillStyle = "red";
    ctxa.fillRect(4 * size + 1 + yOffset, 4 * size + 12 + xOffset, size - 2, size - 2);
    ctxa.fillStyle = "blue";
    ctxa.fillRect(200 + yOffsetObj, 200 + xOffsetObj, size, size);



    ctxb.clearRect(0, 0, canvas.width, canvas.height);
    for (var z = 0; z < limit_h; z++) {
        for (i = 0; i < limit_w; i++) {
            ctxb.strokeStyle = "#000";
            ctxb.lineWidth = 1;
            ctxb.fillStyle = "transparent";
            ctxb.strokeRect((i * size) + zOffset - width, (z * size) + xOffset - height, size - 0.5, size - 0.5);
            ctxb.fillRect((i * size) + zOffset - width, (z * size) + xOffset - height, size - 0.5, size - 0.5);
        }
    }
    ctxb.fillStyle = "red";
    ctxb.fillRect(4 * size + 1 + zOffset, 4 * size + 12 + xOffset, size - 2, size - 2);
    ctxb.fillStyle = "blue";
    ctxb.fillRect(200 + zOffsetObj, 200 + xOffsetObj, size, size);




    labelsA[0].font = "20px 'Titillium Web',sans-serif";
    labelsA[0].fillStyle = "#000";
    labelsA[0].lineWidth = 3;
    labelsA[0].strokeStyle = "rgba(255,255,255,0.9)";
    labelsA[0].strokeText('Y axis', width / 2, height - 25);
    labelsA[0].fillText('Y axis', width / 2, height - 25);

    // labelsA[1].translate(canvas.width / 2, canvas.height / 2);
    labelsA[1].save();
    labelsA[1].rotate(Math.PI / 2);
    labelsA[1].strokeText('X axis', height / 2,  -width + 35);
    labelsA[1].fillText('X axis', height / 2,  -width + 35);
    labelsA[1].restore();

    labelsB[0].font = "20px 'Titillium Web',sans-serif";
    labelsB[0].fillStyle = "#000";
    labelsB[0].lineWidth = 3;
    labelsB[0].strokeStyle = "rgba(255,255,255,0.9)";
    labelsB[0].strokeText('Z axis', width / 2, height - 25);
    labelsB[0].fillText('Z axis', width / 2, height - 25);

    // labelsB[1].translate(canvas.width / 2, canvas.height / 2);
    labelsB[1].save();
    labelsB[1].rotate(Math.PI / 2);
    labelsB[1].strokeText('X axis', height / 2, -20);
    labelsB[1].fillText('X axis', height / 2, -20);
    labelsB[1].restore();
}

function loop() {
    time++;
    yOffset = yOffset % size;
    xOffset = xOffset % size;
    zOffset = zOffset % size;
    draw();
    requestAnimationFrame(loop);

}

loop();


a.addEventListener('mousedown', function(e) {
    mouseDown = true;
    mousePosOld.y = e.clientX;
    mousePosOld.x = e.clientY;
});

b.addEventListener('mousedown', function(e) {
    mouseDown = true;
    mousePosOld.y = e.clientX;
    mousePosOld.z = e.clientY;
});

a.addEventListener('mousemove', function(e) {
    mousePosOld.y = (e.clientX);
    mousePosOld.x = (e.clientY);
    if (mouseDown) {
        xOffset -= (mousePos.x - mousePosOld.x);
        yOffset -= (mousePos.y - mousePosOld.y);
        xOffsetObj -= (mousePos.x - mousePosOld.x);
        yOffsetObj -= (mousePos.y - mousePosOld.y);
    }
    mousePos.y = (e.clientX);
    mousePos.x = (e.clientY);
});

b.addEventListener('mousemove', function(e) {
    mousePosOld.z = (e.clientX);
    mousePosOld.x = (e.clientY);
    if (mouseDown) {
        xOffset -= (mousePos.x - mousePosOld.x);
        zOffset -= (mousePos.z - mousePosOld.z);
        xOffsetObj -= (mousePos.x - mousePosOld.x);
        zOffsetObj -= (mousePos.z - mousePosOld.z);
    }
    mousePos.z = (e.clientX);
    mousePos.x = (e.clientY);
});

document.addEventListener('mouseup', function(e) {
    mouseDown = false;
});

window.onResize = function(e) {
    width = window.innerWidth / 2;
    height = window.innerHeight;
    a.width = width;
    a.height = height;
};

function resetPos() {
    xOffset = 0;
    yOffset = 0;
    zOffset = 0;
    xOffsetObj = 0;
    yOffsetObj = 0;
    zOffsetObj = 0;
}









// function draw2() {
//     ctxb.clearRect(0, 0, canvas.width, canvas.height);
//     for (var y = 0; y < limit_h; y++) {
//         for (i = 0; i < limit_w; i++) {
//             ctxb.strokeStyle = "#000";
//             ctxb.lineWidth = 1;
//             ctxb.fillStyle = "transparent";
//             ctxb.strokeRect((i * size) + xOffset - width, (y * size) + zOffset - height, size - 0.5, size - 0.5);
//             ctxb.fillRect((i * size) + xOffset - width, (y * size) + zOffset - height, size - 0.5, size - 0.5);
//         }
//     }
//     ctxb.fillStyle = "red";
//     ctxb.fillRect(4 * size + 1 + xOffset, 4 * size + 12 + zOffset, size - 2, size - 2);
//     ctxb.fillStyle = "blue";
//     ctxb.fillRect(200 + xOffsetObj, 200 + zOffsetObj, size, size);
// }

// function loop2() {
//     time++;
//     zOffset = zOffset % size;
//     draw2();
//     requestAnimationFrame(loop2);

// }

// loop2();


// document.addEventListener('mousedown', function(e) {
//     mouseDown = true;
//     mousePosOld.x = e.clientX;
//     mousePosOld.y = e.clientY;
// });

// document.addEventListener('mousemove', function(e) {
//     mousePosOld.x = (e.clientX);
//     mousePosOld.y = (e.clientY);
//     if (mouseDown) {
//         xOffset -= (mousePos.x - mousePosOld.x);
//         yOffset -= (mousePos.y - mousePosOld.y);
//         xOffsetObj -= (mousePos.x - mousePosOld.x);
//         yOffsetObj -= (mousePos.y - mousePosOld.y);
//     }
//     mousePos.x = (e.clientX);
//     mousePos.y = (e.clientY);
// });

// document.addEventListener('mouseup', function(e) {
//     mouseDown = false;
// });

// window.onResize = function(e) {
//     width = window.innerWidth / 2;
//     height = window.innerHeight;
//     a.width = width;
//     a.height = height;
// };

// function resetPos() {
//     xOffset = 0;
//     yOffset = 0;
//     xOffsetObj = 0;
//     yOffsetObj = 0;
// }
