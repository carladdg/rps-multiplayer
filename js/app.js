// Initialize Firebase
var config = {
    apiKey: "AIzaSyB-E5n2wio377IKilg3LMxA-jhW_K1nqG8",
    authDomain: "rps-multiplayer-aa9f8.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-aa9f8.firebaseio.com",
    projectId: "rps-multiplayer-aa9f8",
    storageBucket: "rps-multiplayer-aa9f8.appspot.com",
    messagingSenderId: "726539899503"
};
firebase.initializeApp(config);

var database = firebase.database();
var players = database.ref("/players");

var numberOfPlayers = 0;
var gameIsFull = false;

players.on("value", function(snapshot) {
    // console.log(snapshot.child("1").val());
    // console.log(snapshot.child("2").val());

    numberOfPlayers = snapshot.numChildren();

    // Display player information in appropriate boxes
})

var checkGameCapacity = function() {
    if (numberOfPlayers === 2) {
        gameIsFull = true;
    }
}

var addPlayer = function(name) {
    var playerNumber = numberOfPlayers + 1;
    players.child(playerNumber).set({
        name: "Test",
        wins: 0,
        losses: 0
    });

    // Add to connected ref?
}

// Click events

$("#start-button").on("click", function() {
    event.preventDefault();

    checkGameCapacity();
    if (!gameIsFull) {
        // Grab player name and feed into function
        addPlayer();
    } else {
        console.log("Game is Full");
    }
});

$("#chat-button").on("click", function() {
    event.preventDefault();
});

/* TO DO
- If two players are already signed in, don't allow new players 
- Player needs to be connected - if disconnect, remove their info and decrease numberOfPlayers
*/