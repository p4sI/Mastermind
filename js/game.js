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
var multiplayer = false;
var masterCodeViewable = false;
var highscore = new Array();
var finished = false;

$(function() {
	
	$("#icon_highscore").on("click", function () {
        showHighscore();
    });	
	
	$( "#icon_game_guide" ).hover(function() {
		$( ".game_guide" ).css( 'display','block' );
			},function(){
			$(".game_guide").css("display","none");	
	});

    $('#highscoreModal').on('hidden.bs.modal', function (e) {
        $('#highscoreModalLabel').text("Highscore");
    })
	
	$("#buttonSingle").on( "click", function () {
        startSinglePlayer();
    });
    $("#buttonMulti").on( "click", function () {
        startMultiPlayer();
    });
    /*
    $("#buttonHighscore").on( "click", function () {
        showHighscore();
    });
    */
    $("#buttonCheckResult").on( "click", function () {
        if(multiplayer) {
            $("#buttonCheckResult").prop('disabled', true);
            $("#buttonMultiNext").prop('disabled', false);
            $("#buttonSetMasterCode").prop('disabled', false);
        }
        checkResult();
    });
    $("#buttonNewGame").on("click", function () {
        if(multiplayer){
            startMultiPlayer();
        }
        else {
			finished = false;
            startSinglePlayer();
        }
    });
    $("#buttonMainMenu").on("click", function () {
		finished = false;
        drawMainMenu();
    });
    $("#buttonSetMasterCode").on( "click", function () {
        if(!masterCodeIsSet) {
            setMasterCode();
            masterCodeIsSet = true;
        }else{
            if(round <= 0) {
                saveMasterCode();
            }else{
                toggleMasterCode();
            }
        }
    });
    $("#buttonMultiNext").on( "click", function () {
        // remove the droppable class from the current row of keypegs
        $("#keypeg_rows").find(".ui-droppable").droppable("disable");

        // enable the button for the result checking and disable this button
        $("#buttonCheckResult").prop('disabled', false);
        $("#buttonMultiNext").prop('disabled', true);
        $("#buttonSetMasterCode").prop('disabled', true);

        // make the row with the master code dark brown (if forgotten)
        $("#multi_row_codepeg").css('background-color','#8B4513');
        $(".codepeg_mastercode").css('display', 'none');

        // and start the next round
        nextRound();
    });

    document.onkeydown = function(evt) {
        evt = evt || window.event;
        if (evt.keyCode == 67) {
            toggleMasterCode();
        }
    };

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
    $(className).droppable( "option", "disabled", false );
    $(className).css('background-color','white');
}

function checkResult() {
    var keyPegs = new Array();
	var guessArray = new Array();
	var codeArrayTemp = codeArray.slice();
	var codePegNotSet = false;
    $("#codepeg_rows_" + round).children().each(function (index) {
		if($(this).children().eq(0).css("backgroundColor") != "rgb(255, 255, 255)"){
			guessArray.push($(this).children().eq(0).css("backgroundColor"));
		}
		else{
			codePegNotSet = true;
		}	
	});
	//all keypegs are set?
	if(codePegNotSet){
		alert("bitte alle keypegs setzen");
	}
	else{
        // check if the color matches the code...
        //black
        $.each(guessArray,function(index){
                if(guessArray[index] == codeArrayTemp[index]){
                    keyPegs.push("black");
                    guessArray[index] = 0;
                    codeArrayTemp[index] = 0;
                }
        });
        //white
        $.each(guessArray,function(index){
            if(guessArray[index] != 0){
                $.each(codeArrayTemp,function(index2){
                    if(codeArrayTemp[index2] != 0){
                        if(guessArray[index] == codeArrayTemp[index2]){
                            keyPegs.push("white");
                            guessArray[index] = 0;
                            codeArrayTemp[index2] = 0;
                        }
                    }
                });
            }
        });
        // remove the droppable class from the current row
        $("#codepeg_rows").find(".ui-droppable").droppable("disable");

        //set the keyPegs
        if (multiplayer) {
            setKeyPegsManually();
        }
        else {
            var guessedRight = setKeyPegs(keyPegs);
            // if the result is right -> player won
            if(guessedRight){
                toggleMasterCode();
                // change the buttons at the bottom
                $("#buttonCheckResult").fadeOut(0);
               // $(".buttonsfinishedGame").css('display', 'inline-block');
                //alert("Korrekt! Du hast "+round+" Versuche gebraucht!");
                $("#highscoreModalLabel").text("Korrekt! Du hast "+round+" Versuche gebraucht!");
				finished = true;
				showHighscore();
                return;
            }
            // if the result is wrong and 10 rounds are played -> player lose
            else if(round >= 10){
                // show the master code and remove the blocking bar
                $(".codepeg_mastercode").css('display', 'block');
                $("#multi_row_codepeg").css('background-color','#C18553');
                // change the buttons at the bottom
                $("#buttonCheckResult").fadeOut(0);
                //$(".buttonsfinishedGame").css('display', 'inline-block');

                //alert("Spielende. Du hast nach 10 Runden den Code noch nicht erraten!");
                $("#highscoreModalLabel").text("Spielende. Du hast nach 10 Runden den Code noch nicht erraten!");
                showHighscore();
                return;
            }

            // wrong result -> get to the next round
            nextRound();
        }
	}
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
        return true;
	}
    else
    {
        return false;
    }
}

function setKeyPegsManually(){
    var className = ".keypeg_rows_" + round;
    $(className).droppable({
        drop: function(event, ui) {
            var classList = ui.draggable.context.classList;

            if (classList.contains("multi_keypeg_black")){
                $(this).css('background-color','black');
            }else if (classList.contains("multi_keypeg_white")) {
                $(this).css('background-color', 'white');
            }
        }
    });

    $(className).css('background-color','Peru');

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
    round = 0;
    multiplayer = false;
    
    //fadein additional_button
	$("#additional_button").css('display', 'block');
	
	//fadein main_menu_button
	$("#main_menu_button").css('display', 'block');

    //fadeout menu
    $("#button_area_top").fadeOut(0);
    $("#main_page").fadeOut(0);

    // change the buttons at the bottom
    $("#buttonCheckResult").fadeIn(0);
    $(".buttonsfinishedGame").css('display', 'none');

    // make the codepegs draggable
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });

    $("#multi_row_keypeg").css('display', 'none');

    // make the row with the master code dark brown
    $("#multi_row_codepeg").css('background-color','#8B4513');
    $(".codepeg_mastercode").css('display', 'none');

    // make the codepeg holes transparent
    $(".codepeg_circle_default").not(".codepeg_mastercode").css('background-color','transparent');
    //make the keypeg holes transparent
    $(".keypeg_circle_default").not(".multi_keypeg_black, .multi_keypeg_white").css('background-color','transparent');

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
    // enable multiplayer modus
    round = 0;
    masterCodeIsSet = false;
    multiplayer = true;
    masterCodeViewable = false;
	
	//fadein additional_button
	$("#additional_button").css('display', 'block');

	//fadein main_menu_button
	$("#main_menu_button").css('display', 'block');
	
    // fadeout menu
    $("#button_area_top").fadeOut(0);
    $("#main_page").fadeOut(0);
    // change the buttons at the bottom
    $("#buttonCheckResult").fadeIn(0);
    $(".buttonsfinishedGame").css('display', 'none');

    // make the codepegs draggable
    $( ".codepeg_circle" ).draggable({
        revert: "invalid",
        helper: "clone"
    });

    // make the keypegs draghgable
    $("#multi_row_keypeg_pos_1_circle_1").draggable({
        revert: "invalid",
        helper: "clone"
    });
    $("#multi_row_keypeg_pos_2_circle_2").draggable({
        revert: "invalid",
        helper: "clone"
    });

    // display draggable keypegs
    $("#multi_row_keypeg").css('display', 'block');

    // make the codepeg holes transparent
    $(".codepeg_circle_default, .codepeg_mastercode").css('background-color','transparent');
    //make the keypeg holes transparent
    $(".keypeg_circle_default").not(".multi_keypeg_black, .multi_keypeg_white").css('background-color','transparent');

    // draw the board and fade in the buttons for the multiplayer mode
    $(".codepeg_mastercode").css('display', 'block');
	drawGameBoard();
    $("#multiplayer_buttons").fadeIn(300);
    $("#buttonMultiNext").prop('disabled', true);
    $("#buttonCheckResult").prop('disabled', true);


}

function showHighscore(){
	loadLocalHighscore();
    $("#highscoreModal").modal('show');
}

function loadLocalHighscore(){
	var localHighscoreStore = localStorage.getItem('highscore');
	
	if(localHighscoreStore){
		highscore = JSON.parse(localHighscoreStore);
	}
	//push current score if game ends
	if(finished){
		highscore.push(new Array("",round));
		$("#highscoreSave").show();
	}
	//sort by time in nested arrays
	if(localHighscoreStore){
	highscore.sort((function(index){
			return function(a, b){
				return (a[index] === b[index] ? 0 : (a[index] < b[index] ? -1 : 1));
			};
		})(1)); 
	}
	//clear the content
	$("#highscoreModalBody").html("");
	//fill rows
	$.each(highscore,function(index){
		if(highscore[index][0] == "" && finished)
			$("#highscoreModalBody").append("<div style=\"width:300px;height:25px;\"><div class=\"highscoreRowInner\"><input type=\"text\" id=\"highscoreName\" /></div><div class=\"highscoreRowInner\">"+highscore[index][1]+"</div></div>");
		else
			$("#highscoreModalBody").append("<div class=\"highscoreRow\" ><div class=\"highscoreRowInner\">"+highscore[index][0]+"</div><div class=\"highscoreRowInner\">"+highscore[index][1]+"</div></div>");
	});
	
}

function saveHighscore(){
	$.each(highscore,function(index){
		if(highscore[index][0] == ""){
			highscore[index][0] = $("#highscoreName").val();	
		}
	});
	console.log("save",highscore);
	localStorage.setItem('highscore', JSON.stringify(highscore));
	$("#highscoreModal").modal('hide');
	$("#highscoreSave").hide();
	finished = false;
}

/*
 * Fading in the game board
 */
function drawGameBoard(){
	//fadeIn all divs for the gameboard
    $("#button_area_bottom").fadeIn(0);
    $("#gameBoard").fadeIn(300);
}

function drawMainMenu(){
    //fadeIn out divs for the gameboard
    $("#button_area_bottom").fadeOut(0);
    $("#gameBoard").fadeOut(0);
    // fade in main menu
    $("#button_area_top").fadeIn(300);
    $("#main_page").fadeIn(300);
}

function setMasterCode(){

    // show the master code and remove the blocking bar
    $(".codepeg_mastercode").css('display', 'block');
    //$("#multi_row_codepeg").css('background-color','#D2691E');
    $(".codepeg_mastercode").css('background-color','white');

    // make the master code row droppable
    $(".codepeg_mastercode").droppable({
        drop: function(event, ui) {
            checkDroppedColorMaster(ui, this);
        }
    });
    $(".codepeg_mastercode").droppable("option", "disabled", false );

    $("#buttonSetMasterCode").text('Save the Master Code');


}

function saveMasterCode(){
    // make the row with the master code dark brown
    $("#multi_row_codepeg").css('background-color','#8B4513');
    $(".codepeg_mastercode").css('display', 'none');

    // change button
    $("#buttonSetMasterCode").text('Show/Hide Master Code');
    $("#buttonSetMasterCode").prop('disabled', true);

    // start the game for the other player
    $("#buttonCheckResult").prop('disabled', false);
    nextRound();

}

function toggleMasterCode(){
    if(masterCodeViewable){
        masterCodeViewable = false;
        // make the row with the master code dark brown
        $("#multi_row_codepeg").css('background-color','#8B4513');
        $(".codepeg_mastercode").css('display', 'none');
    }
    else if(!masterCodeViewable){
        masterCodeViewable = true;
        // show the master code and remove the blocking bar
        $(".codepeg_mastercode").css('display', 'block');
        $("#multi_row_codepeg").css('background-color','#C18553');
    }
}