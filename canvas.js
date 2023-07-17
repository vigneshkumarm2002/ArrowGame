// Vigneshkumar M
//vigneshkumarm2002@gmail.com

var canvas = document.querySelector("canvas");

canvas.width = (window.innerWidth) - 100;
canvas.height = (window.innerHeight) - 300;

window.addEventListener("resize", () => {
  canvas.width = (window.innerWidth) - 100;
  canvas.height = (window.innerHeight) - 300;
  drawShapes()
})

var c = canvas.getContext("2d");
var audio = document.getElementById("audio");

//For increase and decrease the arrow speed
var arrUp = document.getElementById("arrowUp")
var arrDown = document.getElementById("arrowDown")
var speed = document.getElementById("speed")

var speedval = 5;


arrUp.addEventListener("click", () => {
  let value = parseInt(speed.innerHTML);
  if (value + 5 <= 70) {
    speedval = value + 5;
  }
  speed.innerHTML = speedval;
})
arrDown.addEventListener("click", () => {
  let value = parseInt(speed.innerHTML);
  if (value - 5 >= 5) {
    speedval = value - 5;
  }
  speed.innerHTML = speedval;
})


//Drawing Circle
var totalCircles = 4;
var circleRadius = 35;
var circleArrY = []
var colorArr = ["#FEB326", "#E84D8A", "#64C5EB", "#7F58AF"]
var circleX = 100


function Circle(i) {
  var totalGap = canvas.height - (totalCircles * (circleRadius * 2))
  var gap = totalGap / (totalCircles + 1)

  var circleY = circleRadius + (i * (circleRadius * 2 + gap)) + gap;
  circleArrY.push(circleY)

  c.beginPath()
  c.arc(circleX, circleY, circleRadius, 0, (Math.PI * 2), false)
  c.fillStyle = colorArr[i]
  c.fill()
  c.closePath()
}


//Drawing Arrow
var ArrowArrX = Array(totalCircles).fill(canvas.width - 100 + circleRadius);
const arrowSize = 15;
const arrowHeight = 10;
const lineLength = 70;

function Arrow(i) {
  c.strokeStyle = "black";
  c.lineWidth = 3;

  c.beginPath()
  var ArrowY = circleArrY[i]
  var ArrowX = ArrowArrX[i]
  c.moveTo(ArrowX, ArrowY);
  c.lineTo(ArrowX - lineLength + 5, ArrowY)
  c.moveTo(ArrowX - lineLength + arrowSize, ArrowY - arrowHeight)
  c.lineTo(ArrowX - lineLength, ArrowY + 1)
  c.moveTo(ArrowX - lineLength + arrowSize, ArrowY + arrowHeight)
  c.lineTo(ArrowX - lineLength, ArrowY - 1)

  c.stroke()
  c.closePath()
}

function drawShapes() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < totalCircles; i++) {
    Circle(i)
    Arrow(i)
  }
}

drawShapes()

//Click event for circle
canvas.addEventListener("click", (event) => {

  const rect = canvas.getBoundingClientRect();
  var X = event.clientX - rect.left
  var Y = event.clientY - rect.top


  for (var i = 0; i < totalCircles; i++) {
    var circleY = circleArrY[i];

    if (X >= circleX - circleRadius &&
      X <= circleX + circleRadius &&
      Y >= circleY - circleRadius &&
      Y <= circleY + circleRadius) {

      var TargetX = circleX + circleRadius + lineLength
      moveArrow(i, TargetX)
      break;

    }
  }
})

//Function to move arrow by condition 

function moveArrow(i, TargetX) {
  const dx = speedval;
  var ArrowX = ArrowArrX[i]

  function updateArrow() {
    ArrowX -= dx

    if (ArrowX <= TargetX) {
      ArrowX = TargetX;
      colorArr[i] = "gray";

    }
    else {
      if (ArrowX <= TargetX + 100) {
        audio.play();
      }
      requestAnimationFrame(updateArrow)
    }
    
    ArrowArrX[i] = ArrowX

    drawShapes()
  }
  updateArrow()
}

const resetBtn = document.getElementById("reset");

//Resest button
resetBtn.addEventListener("click", () => {
  ArrowArrX = Array(totalCircles).fill(canvas.width - 100 + circleRadius)
  colorArr = ["#FEB326", "#E84D8A", "#64C5EB", "#7F58AF"]
  drawShapes();
  speedval = 5;
  speed.innerHTML = speedval;
})











