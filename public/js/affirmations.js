'use strict';

$(document).ready(function() {
    initializePage();
})

function initializePage() {
	document.getElementById("affirmations").innerHTML = "I believe in you";
}

	//console.log(affirmations['0']);
		//document.getElementById("affirmations").innerHTML = affirmations[0];

	function getRandom() {
		var affirmations = JSON.parse(sessionStorage.getItem("affirmationsList"));
		//console.log(affirmations);
		//console.log(sessinStorage.getItem('affirmationsList'));
	
		//var affirmations = ['Strive For Greatness', 'I feel good today', 'I got this'];
		var randomNumber = Math.floor(Math.random()*affirmations.length);	
		//console.log(randomNumber);
		var randomString = affirmations[randomNumber];
			//console.log(randomString);
		if( randomString == undefined) {
			randomString = "I believe in you";
		}
		document.getElementById("affirmations").innerHTML = randomString;
	}


/*		function randomString() {
			$("p").click(function(){
        	alert("The affirmation is clicked.");
    	});

		var randomNumber = Math.floor(Math.random()*textArray.length);
		randomString = list[randomNumber]
		console.log(randomString)

		}
*/
