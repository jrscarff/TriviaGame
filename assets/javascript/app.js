$(document).ready(function() {

var timer = 30;

var right = 0;

var wrong = 0;

var intervalId;

var counting = false;

var game = {
	count: 0,
	questions: ["Which QB did not win a Super Bowl?", "Which team last won a home playoff game?","Which team features their decal on only one side of their helmet?", "Who is the last non QB to win MVP?", "What is the oldest NFL Team?", "What team had the most regular season wins from 2000-2009?", "Who is the only Rookie to win the AP NFL MVP?", "Who is the first player in history to earn five Super Bowl rings?", "Who is the first coach to win three Super Bowls?", "Which team did Johnny Unitas retire with?"],
	options: [["Brett Favre", "Dan Marino", "John Elway", "Troy Aikman"],["Jaguars", "Browns", "Bengals", "Titans"],["Texans", "Titans", "Jaguars", "Steelers"], ["LaDainian Tomlinson", "Ray Lewis", "Adrian Peterson", "Shaun Alexander"],["Giants", "Cardinals", "Packers", "Bears"], ["Colts", "Patriots", "Steelers", "Packers"], ["Peyton Manning", "Johnny Unitas", "Barry Sanders", "Jim Brown"], ["Joe Montana", "Tom Brady", "Charles Haley", "Jerry Rice"], ["Chuck Noll", "Bill Belichick", "Bill Walsh", "Joe Gibbs"], ["Colts", "Chargers", "Browns", "Lions"]],
	answers: ["Dan Marino", "Jaguars", "Steelers", "Adrian Peterson", "Cardinals", "Colts", "Jim Brown", "Charles Haley", "Chuck Noll", "Chargers"],
}

$("#timer").text("Time Left: " + timer);

function gameStart() {
	
	$("#start").text("Start");
	$("#start").on("click", function() {
		right = 0;
		game.count = 0;
		$("#start").addClass("hidden");
		$("#options").removeClass("hidden");
		nextQuestion();

	})
}



function answerCheck() {
	clearInterval(intervalId);

	if (this.textContent == game.answers[game.count]) {
		answerRight();
		setTimeout(nextQuestion, 2000);
	}
	else {
		answerWrong();
		setTimeout(nextQuestion, 3000);
	}
}

function countdown() {
	$("#timer").text("Time Left: " + timer);
	timer --;
	if (timer === 0) {
		clearInterval(intervalId);
		timeOut();
		setTimeout(nextQuestion, 3000);
	}
}

function timeOut() {
	wrong ++;
	$("#timer").text("You ran out of time!");
	$("#question").text("The correct answer was " + game.answers[game.count]);
	$("#options").addClass("hidden");
	game.count ++;
}

function answerRight () {
	right ++;
	$("#timer").text("Correct!");
	$("#question").text("The correct answer was " + game.answers[game.count]);
	$("#options").addClass("hidden");
	game.count ++;
}

function answerWrong () {
	wrong ++;
	$("#timer").text("Incorrect!");
	$("#question").text("The correct answer was " + game.answers[game.count]);
	$("#options").addClass("hidden");
	game.count ++;
}

function nextQuestion() {
	
	
	if (game.count === game.questions.length) {
		endGame();
		return 
	}
	timer = 30;
	intervalId = setInterval(countdown, 1000);
	$("#question").text(game.questions[game.count]);
	$("#options").removeClass("hidden");
	$("#options").html("");
	for (var i = 0; i < game.options[game.count].length; i++) {
			var newDiv = $("<div>");
			newDiv.html("<button class=answers>" + game.options[game.count][i] + "</button>");
			$("#options").append(newDiv);
		}
	$(".answers").on("click", answerCheck);

}

function endGame() {
	clearInterval(intervalId);
	$("#timer").text("Game Over!");
	$("#question").html("Number of quesions correct: " + right + "/" + game.questions.length);
	$("#start").removeClass("hidden");
	$("#start").text("restart");
	$("#options").addClass("hidden");

}

gameStart();

})