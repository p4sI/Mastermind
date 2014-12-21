var colors = new Array("rgb(75, 0, 130)","rgb(0, 0, 255)","rgb(0, 128, 0)","rgb(255, 255, 0)","rgb(75, 0, 130)","rgb(255, 165, 0)");
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
	var keyPegs = new Array(),
	lockedIndexesGuess = new Array(),
	lockedIndexesCode = new Array();
    // check if the color matches the code...
    $("#codepeg_rows_"+round).children().each(function(index){
		if($(this).children().eq(0).css("backgroundColor") == codeArray[index]){
			keyPegs.push("black");
			lockedIndexesGuess.push(index+1);
			lockedIndexesCode.push(index);
		}
	});
    // remove the droppable class from the current row
    $("#codepeg_rows").find(".ui-droppable").droppable("disable");
	
	//set the keyPegs
	setKeyPegs(keyPegs);
	
    // get to the next round
    nextRound();

}

function setKeyPegs(keyPegs){
	if(keyPegs.length > 4)
		alert("Ups, hier hat sich ein Fehler eingeschlichen: Zuviele KeyPegs!");
	else{
		$("#keypeg_rows_"+round).children().each(function(index){
			if(index < keyPegs.length){
				$(this).children().eq(0).css("backgroundColor",keyPegs[index]);
			}
		});
	}
	if(keyPegs[0] == "black" && keyPegs[1] == "black" && 
		keyPegs[2] == "black" && keyPegs[3] == "black"){
		alert("Korrekt! Du hast "+round+" Versuche gebraucht!");
	}
}

function checkDroppedColor(ui, that) {
    var classList = ui.draggable.context.classList;

    if (classList.contains("codepeg_yellow")){
        $(that).css('background-color','yellow');
    }else if (classList.contains("codepeg_indigo")){
        $(that).css('background-color','indigo');
    }else if (classList.contains("codepeg_red")){
        $(that).css('background-color','red');
    }else if (classList.contains("codepeg_blue")){
        $(that).css('background-color','blue');
    }else if (classList.contains("codepeg_green")){
        $(that).css('background-color','green');
    }else if (classList.contains("codepeg_orange")){
        $(that).css('background-color','orange');
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
	console.log(codeArray);
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



