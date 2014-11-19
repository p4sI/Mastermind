$(function() {
	$( "#mainMenu" ).on( "click", ".modeSelector", function() {
		var process = $(this).data("process");
		switch(process){
			case "single":
				startSinglePlayer();
			break;
			case "multi":
				startMultiPlayer();
			break;
			case "highscore":
				showHighscore();
			break;
		}
	});
});

function startSinglePlayer(){
alert("singeplayer");
//Todo:
//fadeout menu
//fadein playerName + Start Button
}

function startMultiPlayer(){
alert("multiplayer");
//todo:
//fadeout menu
//fadein playerName1, playerName2 + Start Button
}

function showHighscore(){
alert("highscore");
//load highscore from server
}