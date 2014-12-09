var colors = new Array("Red","Blue","Green","Yellow","Indigo","Orange");
var codeArray = new Array();
var numPegs = 4;
var round = 0;
$(function() {
	$("#buttonSingle").on( "click", function () {
        startSinglePlayer();
    });
    $("#buttonMulti").on( "click", function () {
        startMultiPlayer();
    });
    $("#buttonHighscore").on( "click", function () {
        showHighscore();
    });
    $("#buttonCheckResult").on( "click", function () {
        checkResult();
    });

    //$("#gameBoard").fadeOut(0);
    
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });

});

function nextRound(){
    round++;
    var className = ".codepeg_rows_" + round;
    $(className).droppable({
        drop: function(event, ui) {
            checkDroppedColor(ui, this);
        }
    });


}

function checkResult(){
    // check if the color matches the code...
    // tbd

    // remove the droppable class from the current row
    $("#codepeg_rows").find(".ui-droppable").droppable("disable");

    // get to the next round
    nextRound();

}

function checkDroppedColor(ui, that) {
    var classList = ui.draggable.context.classList;

    if (classList.contains("codepeg_yellow")){
        $(that).css('background-color','yellow');
    }else if (classList.contains("codepeg_black")){
        $(that).css('background-color','black');
    }else if (classList.contains("codepeg_red")){
        $(that).css('background-color','red');
    }else if (classList.contains("codepeg_blue")){
        $(that).css('background-color','blue');
    }else if (classList.contains("codepeg_green")){
        $(that).css('background-color','green');
    }else if (classList.contains("codepeg_aqua")){
        $(that).css('background-color','aqua');
    }


}

function startSinglePlayer(){
//fadeout menu
$("#gameBoard").fadeIn(300, function(){
	drawGameBoard();
    nextRound();
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



