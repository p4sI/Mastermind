var colors = new Array("Red","Blue","Green","Yellow","Indigo","Orange");
var codeArray = new Array();
var numPegs = 4;
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
    
    
    
    $( ".codepeg_circle" ).draggable({ revert: "invalid" });
    $( "#playing_rows").droppable();
});


function startSinglePlayer(){
//fadeout menu
$("#mainMenuWrapper").fadeOut(300, function(){
	drawGameBoard();
	/*
		calculate random colors
	*/
	for(var i = 0; i < numPegs; i++){
		codeArray[i] = colors[Math.floor((Math.random()*6))];
	}
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
	//fadeIn all divs for the gameboard
}



