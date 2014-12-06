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
    
    
    
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });
    $( "#playing_rows").droppable({
        drop: function(event, ui) {
            checkDroppedColor(ui);
        }
    });
});

function checkDroppedColor(ui) {
    var classList = ui.draggable.context.classList;
    if (classList.contains("codepeg_yellow")){
        $("#playing_rows").css('background-color','yellow');
    }else if (classList.contains("codepeg_black")){
        $("#playing_rows").css('background-color','black');
    }else if (classList.contains("codepeg_red")){
        $("#playing_rows").css('background-color','red');
    }else if (classList.contains("codepeg_blue")){
        $("#playing_rows").css('background-color','blue');
    }else if (classList.contains("codepeg_green")){
        $("#playing_rows").css('background-color','green');
    }else if (classList.contains("codepeg_aqua")){
        $("#playing_rows").css('background-color','aqua');
    }


}

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



