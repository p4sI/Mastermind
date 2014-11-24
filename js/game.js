$(function() {
	$("#mainMenu").on( "click", "#buttonSingle", function () {
        startSinglePlayer()
    });
    $("#mainMenu").on( "click", "#buttonMulti", function () {
        startMultiPlayer()
    });
    $("#mainMenu").on( "click", "#buttonHighscore", function () {
        showHighscore()
    });
});


function startSinglePlayer(){
//fadeout menu
$("#mainMenuWrapper").fadeOut(300, function(){
	drawGameBoard();
});
}

function startMultiPlayer(){
//fadeout menu
$("#mainMenuWrapper").fadeOut(300, function(){
	drawGameBoard();
});
}

function showHighscore(){
alert("highscore");
//load highscore from server
}

function drawGameBoard(){
	var canvas = document.getElementById("gameCanvas");
	var ctx = canvas.getContext('2d');
	var img = new Image;
	img.onload = function(){
	  ctx.drawImage(img,0,0); // Or at whatever offset you like
	};
	img.src = "img/canvas/gameBoard.png";
}