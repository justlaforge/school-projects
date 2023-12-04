var phone = document.getElementById("cPhone");
phone.addEventListener("blur", goodLuck);

function goodLuck() {
	alert("Good Luck!");
}


// Name
var nameMessage = document.getElementById("cName");
nameMessage.addEventListener("blur", nameFunction);

function nameFunction(){
	var message = document.getElementById("nMessage");
	var inputFeild = document.getElementById("cName");
	var userName = inputFeild.value;
	if(userName == null || userName == "") {
		message.innerHTML = "Error: You did not enter a name.";
	}
	else {
		var theGreeting = userName + ", have we met before?";
		message.innerHTML = theGreeting;
	}
}



// Good Choice
var choiceBox = document.getElementById("cChoice");
choiceMessage = choiceBox.addEventListener("change", choiceFunction);

function choiceFunction() {
	var choiceParagraph = document.getElementById("pChoice");
	var choiceMessage = document.getElementById("cMessage");
	var choiceInput = document.getElementById("cChoice");
	var choice = choiceInput.value;
	
	choiceParagraph.style.backgroundColor = "#f6be00";
	choiceMessage.style.backgroundColor = "#f6be00";
	choiceMessage.innerHTML = choice + ", that's a good choice!";
}



// Rating

var rate = document.getElementById("cRating");
rate.addEventListener("change", rateMsg);

function rateMsg(){
	var userInput = document.getElementById("cRating");
	var fieldVal = userInput.value;
	var rateMessage = document.getElementById("rMessage");
	
	if (fieldVal <= 5) {
		// build the message here
		rateMessage.innerHTML = "Sorry, hope we can serve you better next time!";
	} else if (fieldVal > 5) {
		// build the message here
		rateMessage.innerHTML = "Thank you for your feedback!";
	}
}

// Reset
var background = document.getElementById("fill");
var resetBtn = document.getElementById("clearBtn");
resetBtn.addEventListener("click", resetPage);

function resetPage() {
	alert("Get it right this time!");
	background.style.backgroundColor = "#8b0000";
	background.style.color = "white";
	background.style.border = "3px solid black";
}



// Tricked You
var phoneMessage = document.getElementById("pMessage");
var submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", trickedYou);

function trickedYou() {
	var phoneVal = phone.value;
	phoneMessage.required = true;
	if(phoneVal == null || phoneVal == ""){
		phoneMessage.innerHTML = "Tricked you--phone number is required";
		phoneMessage.style.backgroundColor = "grey";
		phoneMessage.style.color = "red";
	} else {
		phoneMessage.innerHTML = "Thanks! Can I call you tomorrow?";
		phoneMessage.style.backgroundColor = "green";
		phoneMessage.style.color = "white";
		
	}
		
}


