var gameState = document.getElementById("gameState");
var gameUI = document.getElementById("gameUI"),
	gameMenu = document.getElementById("gameMenu"),
	gameIntro = document.getElementById("gameIntro"),
	gameComplete = document.getElementById("gameComplete");	
var playBtn = document.getElementById("playBtn"),
	introBtn = document.getElementById("introBtn"),
	resetBtn = document.getElementById("resetBtn"),
	playBtn2 = document.getElementById("playBtn2");	
var gameEndShow = document.getElementById("gameEndShow"),
	scoreShow = document.getElementById("scoreShow"),
	nameInput = document.getElementById("nameInput"),
	addBtn = document.getElementById("addBtn"),
	newGameBtn = document.getElementById("newGameBtn"),
	highScoreList = document.getElementById("highScoreList"),
	nextBtn = document.getElementById("nextBtn");
var canvas = document.getElementById("canvas"),
	ctx = canvas.getContext("2d");	
var undoBtn = document.getElementById("undoBtn"),
	puzzleScore = document.getElementById("puzzleScore"),
	menuBtn = document.getElementById("menuBtn");

var checkBall = null,
	puzzle = 0,
	score = 0;
var start = 0,
	end = 0,
	difficulty = 0;
var colors = []
var balls = [];
var ballsText = "";
var ballsLength = 0;
var historyBalls = [];
var puzzles = [];
var highScoreArray = [];


colors = ["#C03", "DarkKhaki", "yellow", "grey", "pink",
	"green", "orange", "brown", "Magenta","DeepSkyBlue"];

function init() {
puzzles = [
	[{x: 3, y: 1}, {x: 3, y: 5}, {x: 7, y: 4}],
	[{x: 1, y: 4}, {x: 5, y: 4}, {x: 6, y: 4}],
	[{x: 1, y: 2}, {x: 4, y: 2}, {x: 4, y: 4}, {x: 5, y: 2}],
	[{x: 0, y: 6}, {x: 1, y: 6}, {x: 2, y: 0}, {x: 4, y: 6}],
	[{x: 0, y: 5}, {x: 1, y: 2}, {x: 6, y: 5}, {x: 7, y: 3}],
	[{x: 1, y: 1}, {x: 1, y: 6}, {x: 5, y: 6}, {x: 6, y: 2}],
	[{x: 1, y: 3}, {x: 5, y: 0}, {x: 5, y: 2}, {x: 5, y: 4}],
	[{x: 0, y: 0}, {x: 0, y: 1}, {x: 2, y: 4}, {x: 6, y: 0}, {x: 7, y: 0}],
	[{x: 1, y: 3}, {x: 2, y: 3}, {x: 2, y: 5}, {x: 4, y: 2}, {x: 4, y: 4}],
	[{x: 0, y: 1}, {x: 3, y: 0}, {x: 3, y: 5}, {x: 4, y: 4}, {x: 6, y: 0}],
	[{x: 1, y: 0}, {x: 2, y: 5}, {x: 4, y: 0}, {x: 4, y: 6}, {x: 5, y: 1}],
	[{x: 3, y: 0}, {x: 3, y: 3}, {x: 4, y: 0}, {x: 5, y: 2}, {x: 7, y: 0}],
	[{x: 1, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 0}, {x: 6, y: 1}, {x: 6, y: 5}],
	[{x: 1, y: 2}, {x: 2, y: 2}, {x: 6, y: 1}, {x: 6, y: 4}, {x: 6, y: 6}],
	[{x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 5}, {x: 6, y: 0}, {x: 7, y: 2}],
	[{x: 1, y: 2}, {x: 1, y: 4}, {x: 1, y: 5}, {x: 3, y: 2}, {x: 5, y: 4}],
	[{"x":1,"y":5,"color":7},{"x":5,"y":1,"color":6},{"x":5,"y":5,"color":3},{"x":6,y:"5","color":4},{"x":7,"y":5,"color":1}],
	[{"x":0,"y":4,"color":5},{"x":3,"y":1,"color":8},{"x":4,"y":0,"color":7},{"x":4,"y":5,"color":9},{"x":7,"y":3,"color":6},{"x":7,"y":6,"color":0}],
	[{"x":2,"y":3,"color":5},{"x":3,"y":2,"color":5},{"x":3,"y":6,"color":3},{"x":4,"y":4,"color":4},{"x":6,"y":1,"color":5},{"x":6,"y":3,"color":6}],
	[{"x":2,"y":3,"color":3},{"x":3,"y":0,"color":5},{"x":3,"y":5,"color":4},{"x":4,"y":2,"color":3},{"x":4,"y":3,"color":7},{"x":6,"y":4,"color":4}],
	[{"x":0,"y":3,"color":6},{"x":1,"y":1,"color":3},{"x":1,"y":3,"color":7},{"x":2,"y":0,"color":1},{"x":5,"y":1,"color":3},{"x":6,"y":3,"color":2}],
	[{"x":0,"y":3,"color":6},{"x":1,"y":5,"color":0},{"x":2,"y":2,"color":6},{"x":3,"y":6,"color":4},{"x":5,"y":2,"color":7},{"x":7,"y":2,"color":4}],
	[{"x":3,"y":2,"color":4},{"x":3,"y":4,"color":0},{"x":5,"y":6,"color":1},{"x":6,"y":2,"color":2},{"x":7,"y":2,"color":0},{"x":7,"y":6,"color":4}],
	[{"x":2,"y":0,"color":6},{"x":2,"y":5,"color":1},{"x":5,"y":1,"color":5},{"x":5,"y":6,"color":3},{"x":6,"y":4,"color":1},{"x":7,"y":5,"color":1}],
	[{"x":0,"y":4,"color":2},{"x":0,"y":6,"color":1},{"x":1,"y":3,"color":5},{"x":4,"y":0,"color":1},{"x":5,"y":1,"color":1},{"x":6,"y":3,"color":6},{"x":7,"y":6,"color":6}],
	[{"x":0,"y":1,"color":6},{"x":3,"y":6,"color":6},{"x":4,"y":0,"color":0},{"x":5,"y":4,"color":0},{"x":6,"y":1,"color":1},{"x":6,"y":6,"color":3}],
	[{"x":1,"y":0,"color":7},{"x":1,"y":3,"color":7},{"x":1,"y":6,"color":0},{"x":3,"y":2,"color":1},{"x":4,"y":5,"color":1},{"x":6,"y":6,"color":2}],
	[{"x":0,"y":3,"color":7},{"x":1,"y":5,"color":6},{"x":2,"y":2,"color":5},{"x":3,"y":6,"color":6},{"x":6,"y":2,"color":0},{"x":7,"y":3,"color":1}],
	[{"x":0,"y":5,"color":0},{"x":1,"y":1,"color":5},{"x":3,"y":2,"color":5},{"x":3,"y":5,"color":6},{"x":4,"y":3,"color":0},{"x":6,"y":4,"color":6},{"x":7,"y":2,"color":7}],
	[{"x":0,"y":3,"color":2},{"x":1,"y":1,"color":3},{"x":2,"y":6,"color":0},{"x":3,"y":1,"color":4},{"x":3,"y":6,"color":6},{"x":5,"y":1,"color":4},{"x":6,"y":5,"color":7}],
	[{"x":0,"y":0,"color":2},{"x":0,"y":5,"color":5},{"x":1,"y":4,"color":2},{"x":2,"y":1,"color":6},{"x":2,"y":6,"color":5},{"x":5,"y":5,"color":5},{"x":7,"y":3,"color":0}],
	[{"x":0,"y":4,"color":0},{"x":1,"y":0,"color":5},{"x":2,"y":5,"color":0},{"x":4,"y":1,"color":3},{"x":4,"y":2,"color":6},{"x":5,"y":6,"color":6},{"x":7,"y":1,"color":2},{"x":7,"y":6,"color":0}],
	[{"x":1,"y":1,"color":7},{"x":1,"y":5,"color":7},{"x":3,"y":4,"color":4},{"x":4,"y":0,"color":7},{"x":4,"y":1,"color":4},{"x":6,"y":5,"color":7},{"x":7,"y":2,"color":7}],
	[{"x":0,"y":2,"color":6},{"x":1,"y":4,"color":2},{"x":1,"y":5,"color":3},{"x":1,"y":6,"color":6},{"x":4,"y":3,"color":5},{"x":5,"y":0,"color":2},{"x":7,"y":2,"color":3},{"x":7,"y":3,"color":2}],
	[{"x":0,"y":4,"color":1},{"x":2,"y":3,"color":5},{"x":3,"y":1,"color":6},{"x":3,"y":4,"color":4},{"x":4,"y":0,"color":2},{"x":5,"y":5,"color":2},{"x":6,"y":3,"color":3}],
	[{"x":1,"y":0,"color":2},{"x":1,"y":1,"color":5},{"x":1,"y":4,"color":0},{"x":1,"y":6,"color":8},{"x":2,"y":1,"color":4},{"x":4,"y":0,"color":3},{"x":6,"y":5,"color":3}],
	[{"x":0,"y":0,"color":4},{"x":3,"y":2,"color":1},{"x":5,"y":0,"color":4},{"x":5,"y":3,"color":7},{"x":6,"y":0,"color":7},{"x":7,"y":0,"color":9},{"x":7,"y":5,"color":5}],
	[{"x":0,"y":0,"color":7},{"x":1,"y":0,"color":6},{"x":2,"y":5,"color":4},{"x":2,"y":6,"color":0},{"x":4,"y":0,"color":1},{"x":4,"y":3,"color":7},{"x":5,"y":4,"color":6},{"x":5,"y":5,"color":7}],
	[{"x":2,"y":1,"color":3},{"x":2,"y":3,"color":6},{"x":3,"y":5,"color":2},{"x":3,"y":6,"color":1},{"x":4,"y":1,"color":3},{"x":5,"y":1,"color":5},{"x":5,"y":5,"color":1}],
	[{"x":0,"y":5,"color":7},{"x":2,"y":4,"color":5},{"x":3,"y":4,"color":3},{"x":4,"y":3,"color":7},{"x":6,"y":5,"color":6},{"x":7,"y":2,"color":3},{"x":7,"y":5,"color":1},{"x":7,"y":6,"color":4}],
	[{"x":0,"y":2,"color":2},{"x":2,"y":0,"color":8},{"x":2,"y":1,"color":0},{"x":2,"y":6,"color":7},{"x":3,"y":6,"color":9},{"x":4,"y":1,"color":4},{"x":4,"y":5,"color":1},{"x":5,"y":5,"color":3}],
	[{"x":3,"y":0,"color":4},{"x":3,"y":4,"color":0},{"x":3,"y":5,"color":9},{"x":5,"y":1,"color":6},{"x":5,"y":3,"color":9},{"x":6,"y":4,"color":0},{"x":6,"y":5,"color":4}],
	[{"x":0,"y":4,"color":7},{"x":1,"y":2,"color":7},{"x":1,"y":5,"color":3},{"x":2,"y":2,"color":1},{"x":3,"y":4,"color":5},{"x":3,"y":6,"color":9},{"x":7,"y":4,"color":0}],
	[{"x":0,"y":2,"color":4},{"x":1,"y":6,"color":4},{"x":2,"y":2,"color":3},{"x":2,"y":6,"color":4},{"x":3,"y":0,"color":4},{"x":4,"y":5,"color":9},{"x":5,"y":4,"color":6},{"x":7,"y":2,"color":8}],
	[{"x":0,"y":6,"color":5},{"x":2,"y":2,"color":7},{"x":2,"y":3,"color":9},{"x":3,"y":0,"color":5},{"x":3,"y":6,"color":5},{"x":4,"y":0,"color":7},{"x":4,"y":1,"color":6},{"x":4,"y":2,"color":5},{"x":6,"y":5,"color":9},{"x":7,"y":5,"color":7}],
	[{"x":0,"y":1,"color":7},{"x":1,"y":0,"color":2},{"x":2,"y":0,"color":7},{"x":2,"y":3,"color":7},{"x":3,"y":0,"color":0},{"x":3,"y":3,"color":7},{"x":4,"y":1,"color":5}],
	[{"x":0,"y":6,"color":4},{"x":1,"y":4,"color":4},{"x":2,"y":0,"color":2},{"x":3,"y":6,"color":6},{"x":4,"y":1,"color":0},{"x":5,"y":1,"color":5},{"x":6,"y":2,"color":8},{"x":6,"y":6,"color":6},{"x":7,"y":3,"color":1}],
	[{"x":0,"y":6,"color":7},{"x":1,"y":0,"color":5},{"x":1,"y":5,"color":3},{"x":3,"y":0,"color":7},{"x":4,"y":1,"color":6},{"x":5,"y":5,"color":4},{"x":7,"y":6,"color":9}],
	[{"x":1,"y":6,"color":2},{"x":2,"y":2,"color":5},{"x":3,"y":0,"color":5},{"x":4,"y":2,"color":7},{"x":5,"y":4,"color":7},{"x":7,"y":2,"color":2},{"x":7,"y":6,"color":2}],
	[{"x":1,"y":2,"color":3},{"x":1,"y":6,"color":0},{"x":2,"y":6,"color":8},{"x":4,"y":1,"color":6},{"x":4,"y":2,"color":8},{"x":6,"y":0,"color":5},{"x":6,"y":6,"color":5},{"x":7,"y":4,"color":5}],
	[{"x":0,"y":2,"color":6},{"x":0,"y":5,"color":9},{"x":0,"y":6,"color":0},{"x":5,"y":1,"color":4},{"x":6,"y":0,"color":7},{"x":6,"y":3,"color":5},{"x":6,"y":4,"color":2},{"x":7,"y":2,"color":6}],
	[{"x":0,"y":0,"color":2},{"x":2,"y":4,"color":1},{"x":3,"y":0,"color":3},{"x":3,"y":1,"color":6},{"x":4,"y":3,"color":4},{"x":5,"y":3,"color":6},{"x":6,"y":2,"color":3},{"x":6,"y":4,"color":5},{"x":7,"y":2,"color":6}],
	[{"x":0,"y":1,"color":6},{"x":0,"y":4,"color":8},{"x":3,"y":3,"color":4},{"x":4,"y":3,"color":9},{"x":6,"y":6,"color":1},{"x":7,"y":1,"color":2},{"x":7,"y":2,"color":3},{"x":7,"y":3,"color":8}],
	[{"x":0,"y":5,"color":5},{"x":1,"y":3,"color":3},{"x":3,"y":2,"color":1},{"x":3,"y":6,"color":7},{"x":4,"y":6,"color":6},{"x":5,"y":1,"color":7},{"x":6,"y":0,"color":0},{"x":6,"y":6,"color":5}],
	[{"x":2,"y":1,"color":5},{"x":3,"y":5,"color":5},{"x":5,"y":3,"color":5},{"x":5,"y":6,"color":8},{"x":6,"y":1,"color":5},{"x":6,"y":3,"color":6},{"x":6,"y":4,"color":7},{"x":6,"y":5,"color":4}],
	[{"x":0,"y":5,"color":0},{"x":1,"y":5,"color":4},{"x":2,"y":0,"color":5},{"x":3,"y":3,"color":7},{"x":5,"y":5,"color":5},{"x":6,"y":5,"color":6},{"x":7,"y":0,"color":9}],
	[{"x":0,"y":2,"color":4},{"x":1,"y":3,"color":9},{"x":1,"y":4,"color":2},{"x":1,"y":5,"color":5},{"x":1,"y":6,"color":9},{"x":2,"y":1,"color":4},{"x":2,"y":5,"color":1},{"x":3,"y":2,"color":3},{"x":4,"y":6,"color":2}],
	[{"x":2,"y":3,"color":6},{"x":3,"y":0,"color":6},{"x":4,"y":1,"color":8},{"x":4,"y":3,"color":5},{"x":5,"y":3,"color":2},{"x":6,"y":3,"color":4},{"x":7,"y":1,"color":6},{"x":7,"y":3,"color":2}],
	[{"x":0,"y":4,"color":8},{"x":1,"y":0,"color":6},{"x":1,"y":1,"color":9},{"x":1,"y":2,"color":0},{"x":1,"y":5,"color":1},{"x":5,"y":0,"color":4},{"x":6,"y":1,"color":7},{"x":7,"y":5,"color":0}],
	[{"x":1,"y":1,"color":9},{"x":1,"y":6,"color":6},{"x":2,"y":0,"color":0},{"x":3,"y":2,"color":3},{"x":3,"y":6,"color":3},{"x":4,"y":2,"color":3},{"x":5,"y":4,"color":7},{"x":6,"y":3,"color":0},{"x":7,"y":6,"color":9}],
	[{"x":0,"y":0,"color":2},{"x":0,"y":3,"color":7},{"x":0,"y":6,"color":6},{"x":1,"y":5,"color":1},{"x":2,"y":3,"color":4},{"x":3,"y":4,"color":5},{"x":3,"y":6,"color":7},{"x":6,"y":2,"color":3}],
	[{"x":0,"y":0,"color":8},{"x":0,"y":1,"color":5},{"x":0,"y":5,"color":3},{"x":4,"y":5,"color":1},{"x":5,"y":5,"color":5},{"x":5,"y":6,"color":6},{"x":6,"y":1,"color":9},{"x":6,"y":3,"color":1}],
	[{"x":1,"y":1,"color":2},{"x":1,"y":3,"color":5},{"x":2,"y":2,"color":9},{"x":3,"y":1,"color":0},{"x":4,"y":6,"color":0},{"x":5,"y":1,"color":8},{"x":6,"y":0,"color":8},{"x":7,"y":2,"color":2}],
	[{"x":0,"y":1,"color":1},{"x":1,"y":4,"color":6},{"x":1,"y":5,"color":8},{"x":2,"y":4,"color":3},{"x":3,"y":0,"color":4},{"x":3,"y":5,"color":4},{"x":4,"y":0,"color":6},{"x":7,"y":5,"color":8}]
];

	puzzle = (function() {
		var flingPuzzle = parseFloat(localStorage.getItem("fling_puzzle"));
		if (!flingPuzzle) {
			flingPuzzle = 0;
			localStorage.setItem("fling_puzzle", flingPuzzle);
		}
		return flingPuzzle;
	})();
	
	score = (function() {
		var flingScore = parseFloat(localStorage.getItem("fling_score"));
		if (!flingScore) {
			flingScore = 0;
			localStorage.setItem("fling_score", flingScore);
		}
		return flingScore;
	})();
	
	highScoreArray = getHighScoreArray();
	updateHighScore();
}


hide(gameIntro);
hide(gameComplete);
hide(undoBtn);
hide(puzzleScore);


playBtn.onclick = function(e) {
	e.preventDefault();
	hide(gameMenu);
	show(undoBtn);
	startGame();
}

introBtn.onclick = function(e) {
	e.preventDefault();
	hide(gameMenu);
	show(gameIntro);
	gameState.innerHTML = "<h2>Instructions</h2>";
}

resetBtn.onclick = function(e) {
	e.preventDefault();
	localStorage.setItem("fling_puzzle", 0);
	localStorage.setItem("fling_score", 0);
	//puzzle = parseFloat(localStorage.getItem("fling_puzzle"));
	//score = parseFloat(localStorage.getItem("fling_score"));
	hide(gameMenu);
	startGame();
}

playBtn2.onclick = function(e) {
	e.preventDefault();
	hide(gameIntro);
	show(undoBtn);
	startGame();
}

nextBtn.onclick = function() {
	puzzle++;
	localStorage.setItem("fling_puzzle", puzzle);
	localStorage.setItem("fling_score", score);
	startGame();
}

addBtn.onclick = function() {
	gameEnd();
	hide(nameInput);
	hide(addBtn);
	//addBtn.disabled = 'true';
	//nameInput.value = '';
}

newGameBtn.onclick = function() {
	localStorage.setItem("fling_puzzle", 0);
	localStorage.setItem("fling_score", 0);
	startGame();
}


function startGame() {
	init();
	gameState.innerHTML = "<h2>Puzzle: " + (puzzle+1)  + " Score: " + score + "</h2>";
	removeEvent();
	show(gameComplete);
	hide(gameEndShow);
	hide(nextBtn);
	hide(puzzleScore);
	
	historyBalls = [];
	balls = puzzles[puzzle];
	ballsText = JSON.stringify(balls);
	historyBalls.push(ballsText);
	difficulty = balls.length;
	
	for (var i = 0; i < balls.length; i++) {
		balls[i].vx = 0;
		balls[i].vy = 0;
	}
	
	var j = 0;
	startAnimation();
	function startAnimation() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawGrid(ctx, "lightgrey", 50, 50);
		ctx.save();
		
		for (var i = 0; i <= j; i++) {			
			contextStyle(i);
		}
		ctx.restore();
		
		j++;
		if (i < balls.length) {
			setTimeout(startAnimation, 200);
		} else {
			drawBalls(balls);
			start = Date.now();
		}
	}
	
	//localStorage.setItem("fling_puzzle", puzzle);
	//localStorage.setItem("fling_score", score);
	//puzzle++;
}

function drawBalls(balls) {
	hide(gameComplete);
	window.addEventListener("keydown", keyAction);
	undoBtn.onclick = undo;
	menuBtn.onclick = showMenu;
	
	for (var i = 0; i < balls.length; i++) {
		balls[i].vx = 0;
		balls[i].vy = 0;
	}
	
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid(ctx, "lightgrey", 50, 50);
	
	ctx.save();
	ctx.fillStyle = "#C03";
	
	
	for (var i = 0; i < balls.length; i++) {
		balls[i].x = Math.round(balls[i].x);
		balls[i].y = Math.round(balls[i].y);
		
		contextStyle(i);
	}
	ctx.restore();
}

function drawGrid(ctx, color, stepx, stepy) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = 0.5;

	for (var i = stepx + 0.5; i < ctx.canvas.width; i += stepx) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, ctx.canvas.height);
		ctx.stroke();
		ctx.closePath();
	}
	
	for (var i = stepy + 0.5; i < ctx.canvas.height; i += stepy) {
		ctx.beginPath();
		ctx.moveTo(0, i);
		ctx.lineTo(ctx.canvas.width, i);
		ctx.stroke();
		ctx.closePath();
	}
	ctx.restore();
}

function contextStyle(i) {
	var m = 50 * balls[i].x + 25,
		n = 50 * balls[i].y + 25;
	
	ctx.fillStyle = "#C03";
	ctx.fillStyle = colors[balls[i].color];
	ctx.shadowColor = "black";
	ctx.shadowOffsetX = 4;
	ctx.shadowOffsetY = 4;
	ctx.shadowBlur = 12;
	ctx.beginPath();
	ctx.arc(m, n, 23, 0, Math.PI * 2, false);
	ctx.closePath();
	ctx.fill();
}


function keyAction(event) {
	var keyCode;
	if (event == null) {
		keyCode = window.event.keyCode;
		//window.event.preventDefault();
	} else {
		keyCode = event.keyCode;
		//event.preventDefault();
	}
	switch (keyCode) {
		case 37:
		case 65:
			leftArrow();
			break;
		case 38:
		case 87:
			upArrow();
			break;
		case 39:
		case 68:
			rightArrow();
			break;
		case 40:
		case 83:
			downArrow();
			break;
		case 82:
			undo();
			break;
	}
}

function upArrow() {
	findCheckBall();
	if (checkBall == null) {
		drawBalls(balls);
	} else {
		checkBall.vy = -0.2;
		
		var count = 0;
		var nextRight = false;
		
		for (var i =  balls.length - 1; i >= 0; i--) {
			if (checkBall.x == balls[i].x && checkBall.y - balls[i].y > 1) {
				count++;
			} else if (checkBall.x == balls[i].x && checkBall.y - balls[i].y == 1) {
				nextRight = true;
			}
		}
		
		if (count == 0 || nextRight == true) {
			drawBalls(balls);
		} else {
			ballsText = JSON.stringify(balls);
			historyBalls.push(ballsText);
			
			ballsLength = balls.length;
			requestAnimationFrame(rightAnimation);
		}
	}
}

function downArrow() {	
	findCheckBall();
	if (checkBall == null) {
		drawBalls(balls);
	} else {
		checkBall.vy = 0.2;
		
		var count = 0;
		var nextRight = false;
		
		for (var i =  balls.length - 1; i >= 0; i--) {
			if (checkBall.x == balls[i].x && balls[i].y - checkBall.y > 1) {
				count++;
			} else if (checkBall.x == balls[i].x && balls[i].y - checkBall.y == 1) {
				nextRight = true;
			}
		}
		
		if (count == 0 || nextRight == true) {
			drawBalls(balls);
		} else {
			ballsText = JSON.stringify(balls);
			historyBalls.push(ballsText);
			
			ballsLength = balls.length;
			requestAnimationFrame(rightAnimation);
		}
	}
}

function leftArrow() {	
	findCheckBall();
	if (checkBall == null) {
		drawBalls(balls);
	} else {
		checkBall.vx = -0.2;
		
		var count = 0;
		var nextRight = false;
		
		for (var i =  balls.length - 1; i >= 0; i--) {
			if (checkBall.y == balls[i].y && checkBall.x - balls[i].x > 1) {
				count++;
			} else if (checkBall.y == balls[i].y && checkBall.x - balls[i].x == 1) {
				nextRight = true;
			}
		}
		
		if (count == 0 || nextRight == true) {
			drawBalls(balls);
		} else {
			ballsText = JSON.stringify(balls);
			historyBalls.push(ballsText);
			
			ballsLength = balls.length;
			requestAnimationFrame(rightAnimation);
		}
	}
}

function rightArrow() {	
	findCheckBall();
	if (checkBall == null) {
		drawBalls(balls);
	} else {
		checkBall.vx = 0.2;
		
		var count = 0;
		var nextRight = false;
		
		for (var i =  balls.length - 1; i >= 0; i--) {
			if (checkBall.y == balls[i].y && balls[i].x - checkBall.x > 1) {
				count++;
			} else if (checkBall.y == balls[i].y && balls[i].x - checkBall.x == 1) {
				nextRight = true;
			}
		}
		
		if (count == 0 || nextRight == true) {
			drawBalls(balls);
		} else {
			ballsText = JSON.stringify(balls);
			historyBalls.push(ballsText);
			
			ballsLength = balls.length;
			requestAnimationFrame(rightAnimation);
		}
	}
}


function findCheckBall() {
	removeEvent();
	show(gameComplete);
	checkBall = null;
	for (var i = 0; i < balls.length; i++) {
		if (balls[i].check == true) {
			balls[i].check = false;
			checkBall = balls[i];
		}
	}
}

function removeEvent() {
	window.removeEventListener("keydown", keyAction, false);
	undoBtn.onclick = null;
	menuBtn.onclick = null;
}

function rightAnimation() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid(ctx, "lightgrey", 50, 50);
	
	ctx.save();
	
	for (var i = 0; i < balls.length; i++) {
		var ballA = balls[i];
		
		for (var j = i+1; j < balls.length; j++) {
			var ballB = balls[j];
			if (ballA.y == ballB.y && Math.abs(ballB.x - ballA.x) < 0.99) {
				var temp = ballA.vx;
				ballA.vx = ballB.vx;
				ballB.vx = temp;
			}
			if (ballA.x == ballB.x && Math.abs(ballA.y - ballB.y) < 1) {
				var temp = ballA.vy;
				ballA.vy = ballB.vy;
				ballB.vy = temp;
			}
		}
		
		ballA.x = ballA.x + ballA.vx;
		ballA.y = ballA.y + ballA.vy;
		
		contextStyle(i);
		
		if (balls[i].x > 8 || balls[i].x < -1 || balls[i].y > 8 || balls[i].y < -1) {
			balls.splice(i, 1);
		}
	}
	ctx.restore();
	
	if (balls.length == ballsLength) {
		requestAnimationFrame(rightAnimation);
	} else {
		drawBalls(balls);
		pan();
	}
}

function pan() {
	if (balls.length == 1) {
		setTimeout(function() {
			end = Date.now();
			removeEvent();
			show(gameComplete);
			show(nextBtn);
			show(puzzleScore);
			
			var p;
			switch (difficulty) {
				case 3:
				case 4:
					p = 16;
					break;
				case 5:
					p = 24;
					break;
				case 6:
					p = 40;
					break;
				case 7:
					p = 64;
					break;
				case 8:
				case 9:
				case 10:
					p = 100
					break;
			}
			
			if (end - start < p*1000) {
				score += parseInt(p*1000 - (end - start));
				puzzleScore.innerHTML = "You got " + parseInt(p*1000 - (end - start)) + " !";
			} else {
				score += 0;
				puzzleScore.innerHTML = "You got zero! haha...";
			}
			gameState.innerHTML = "<h2>Puzzle: " + (puzzle+1)  + " Score: " + score + "</h2>";
			
			if (puzzle == puzzles.length - 1) {
				show(gameEndShow);
				show(nameInput);
				show(addBtn);
				hide(nextBtn);
				gameState.innerHTML = "<h2>Congratulations!</h2>"
				scoreShow.innerHTML = score;
				
				highScoreArray = getHighScoreArray();
				
				if (highScoreArray.length == 12 && score < parseInt(highScoreArray[11].score)) {
					hide(nameInput)
					hide(addBtn);
				}
			}
		}, 200);
	}
}

function showMenu() {
	gameState.innerHTML = "<h2>Main Menu</h2>";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	show(gameMenu);
	hide(undoBtn);
	hide(gameIntro);
	hide(gameComplete);
}

function undo() {
	ballsText = historyBalls.pop();
	if (ballsText) {
		balls = JSON.parse(ballsText);
		drawBalls(balls);
	}
}


function gameEnd() {
	highScoreArray = getHighScoreArray();
	var username = nameInput.value;
	var userObj = {
		"username": username,
		"score": score
	};
	if (highScoreArray.length < 12) {
		highScoreArray.push(userObj);
		for (var i = highScoreArray.length - 1; i >= 0; i--) {
			if (score > parseInt(highScoreArray[i].score)) {
				var t = highScoreArray[i];
				highScoreArray[i] = userObj;
				highScoreArray[i + 1] = t;
			}
		}
	} else {
		for (var i = highScoreArray.length - 1; i >= 0; i--) {
			if (score > parseInt(highScoreArray[i].score)) {
				if (i == 11) {
					highScoreArray[i] = userObj;
				} else {
					var t = highScoreArray[i];
					highScoreArray[i] = userObj;
					highScoreArray[i + 1] = t;
				}
			}
		}
	}
	
	localStorage.setItem("fling_highScore",JSON.stringify(highScoreArray));
	highScoreList.innerHTML = "";
	updateHighScore();
}

function getHighScoreArray(){
	var highScoreArray = localStorage.getItem("fling_highScore");
	if (!highScoreArray) {
		highScoreArray = [];
		localStorage.setItem("fling_highScore",JSON.stringify(highScoreArray));
	} else {
		highScoreArray = JSON.parse(highScoreArray);
	}
	return highScoreArray;
}

function addHighScoreToDOM(userObj) {
	var user = document.createElement("li");
	user.innerHTML = userObj.score + " by " + userObj.username;
	highScoreList.appendChild(user);
}

function updateHighScore() {
	for (var i = 0; i < highScoreArray.length; i++) {
		var value = highScoreArray[i];
		addHighScoreToDOM(value);
	}
}

nameInput.onkeyup = function (e) {
   if (nameInput.value.length > 0) {
      addBtn.disabled = false; 
   }
   else {
      addBtn.disabled = true; 
   }
};


canvas.onmousedown =function(e) {
	var location = windowToCanvas(canvas, e.clientX, e.clientY),
		locationX = location.x.toFixed(0),
		locationY = location.y.toFixed(0);
	
	for (var i = 0; i < balls.length; i++) {
		balls[i].check = false;
	}
	drawBalls(balls);
	
	for (var i = 0; i < balls.length; i++) {
		var m = 50 * balls[i].x + 25,
			n = 50 * balls[i].y + 25;
		if (Math.abs(locationX - m) < 25 && Math.abs(locationY - n) < 25) {
			balls[i].check = true;
			ctx.save();
			ctx.strokeStyle = "rgba(0, 0, 0, 0.4)"
			ctx.strokeRect(m-25, n-25, 50, 50);
			ctx.restore();
		}
	}
}

function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();
   return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}


function hide(elem) {
	elem.style.display = "none";
}

function show(elem) {
	elem.style.display = "";
}
