var colors = new Array(
    "rgb(255, 255, 0)", // yellow
    "rgb(75, 0, 130)",  // indigo
    "rgb(255, 0, 0)",   // red
    "rgb(0, 0, 255)",   // blue
    "rgb(0, 128, 0)",   // green
    "rgb(255, 165, 0)"  // orange
);
var codeArray = new Array();
var numPegs = 4;
var round = 0;
var masterCodeIsSet = false;
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
    $("#buttonSetMasterCode").on( "click", function () {
        if(!masterCodeIsSet) {
            setMasterCode();
            masterCodeIsSet = true;
        }else{
            saveMasterCode();
        }
    });


    $("#gameBoard").fadeOut(0);
    $("#button_area_bottom").fadeOut(0);
    $("#multiplayer_buttons").fadeOut(0);

});

/*
* Sets the codePegs as droppable element for the
* active playing row
*/
function nextRound(){
    round++;
    var className = ".codepeg_rows_" + round;
    $(className).droppable({
        drop: function(event, ui) {
            checkDroppedColor(ui, this);
        }
    });

    $(className).css('background-color','white');


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

    if(round >= 10){
        // show the master code and remove the blocking bar
        $(".codepeg_mastercode").css('display', 'block');
        $("#multi_row_codepeg").css('background-color','#D2691E');

        alert("Spielende. Du hast nach 10 Runden den Code noch nicht erraten!");
    }
}

/*
 * Used to change the color of the 'holes' after
 * a code peg is moved and dropped in
 */
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

/*
 * Used to change the color of the 'holes' after
 * a code peg is moved and dropped in
 * and also saves the master code
 */
function checkDroppedColorMaster(ui, that) {
    var classList = ui.draggable.context.classList;
    var codePegNr;
    if(that.id == "multi_row_codepeg_rows_pos_1_circle_1") {
        codePegNr = 0;
    }
    else if(that.id == "multi_row_codepeg_rows_pos_2_circle_2") {
        codePegNr = 1;
    }
    else if(that.id == "multi_row_codepeg_rows_pos_3_circle_3") {
        codePegNr = 2;
    }
    else if(that.id == "multi_row_codepeg_rows_pos_4_circle_4") {
        codePegNr = 3;
    }

    if (classList.contains("codepeg_yellow")){
        $(that).css('background-color','yellow');
        codeArray[codePegNr] = colors[0];
    }else if (classList.contains("codepeg_indigo")){
        $(that).css('background-color','indigo');
        codeArray[codePegNr] = colors[1];
    }else if (classList.contains("codepeg_red")){
        $(that).css('background-color','red');
        codeArray[codePegNr] = colors[2];
    }else if (classList.contains("codepeg_blue")){
        $(that).css('background-color','blue');
        codeArray[codePegNr] = colors[3];
    }else if (classList.contains("codepeg_green")){
        $(that).css('background-color','green');
        codeArray[codePegNr] = colors[4];
    }else if (classList.contains("codepeg_orange")){
        $(that).css('background-color','orange');
        codeArray[codePegNr] = colors[5];
    }
}

/*
 * Starts the Single-Player-Mode:
 * Activated when pressed the Singleplayer-Button.
 * Draws the board and makes the code pegs moveable
 * also makes the first row droppable
 */
function startSinglePlayer(){
    //fadeout menu
    $("#button_area_top").fadeOut(0);

    // make the codepegs draggable
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });

    $("#multi_row_keypeg").css('display', 'none');

    // make the row with the master code dark brown
    $("#multi_row_codepeg").css('background-color','#8B4513');

    // draw the board and fade in the
	drawGameBoard();

    // calculate random colors for the master code
    for(var i = 0; i < numPegs; i++){
        var rndNr = Math.floor((Math.random()*6));
        codeArray[i] = colors[rndNr];

        // color the master code elements
        var idString = "#multi_row_codepeg_rows_pos_" + (i+1) + "_circle_" + (i+1);
        $(idString).css('background-color', colors[rndNr]);

    }
    console.log(codeArray);

    // make the first row droppable elements
    nextRound();
}

/*
 * Starts the Multi-Player-Mode:
 * Activated when pressed the Multiplayer-Button.
 * Draws the board and makes the code pegs moveable
 * also makes the first row droppable.
 * Allows the second player to enter the color code
 * and shows the 2 extra buttons
 */
function startMultiPlayer(){
    //fadeout menu
    $("#button_area_top").fadeOut(0);

    // make the codepegs draggable
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });

    // draw the board and fade in the buttons for the multiplayer mode
    $(".codepeg_mastercode").css('display', 'block');
	drawGameBoard();
    $("#multiplayer_buttons").fadeIn(300);

}

function showHighscore(){
alert("highscore");
//load highscore from server
}

/*
 * Fading in the game board
 */
function drawGameBoard(){
	//fadeIn all divs for the gameboard
    $("#button_area_bottom").fadeIn(0);
    $("#gameBoard").fadeIn(300);
}

function setMasterCode(){

    // show the master code and remove the blocking bar
    $(".codepeg_mastercode").css('display', 'block');
    $("#multi_row_codepeg").css('background-color','#D2691E');
    $(".codepeg_mastercode").css('background-color','white');

    // make the master code row droppable
    $(".codepeg_mastercode").droppable({
        drop: function(event, ui) {
            checkDroppedColorMaster(ui, this);
        }
    });


}

function saveMasterCode(){
    // make the row with the master code dark brown
    $("#multi_row_codepeg").css('background-color','#8B4513');
    $(".codepeg_mastercode").css('display', 'none');

    // start the game for the other player
    nextRound();

}