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



function startSinglePlayer(){
alert("singleplayer");
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

});