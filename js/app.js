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

// Create Firebase references
var database = firebase.database();
var players = database.ref("players");

// Create player and game lockout variables
var playerOneOccupied = false;
var playerTwoOccupied = false;
var gameIsFull = false;

// Pull and update player data from Firebase when players are added
players.on("value", function(snapshot) {
    if (snapshot.hasChild("1")) {
        playerOneOccupied = true;
        console.log("1: " + playerOneOccupied);
        displayPlayerInfo("1", snapshot.child("1/name").val(), snapshot.child("1/wins").val(), snapshot.child("1/losses").val());
    }

    if (snapshot.hasChild("2")) {
        playerTwoOccupied = true;
        console.log("2: " + playerTwoOccupied);
        displayPlayerInfo("2", snapshot.child("2/name").val(), snapshot.child("2/wins").val(), snapshot.child("2/losses").val());
    }
})

// Check if game is full
var checkGameCapacity = function() {
    if (playerOneOccupied && playerTwoOccupied) {
        gameIsFull = true;
    }
}

// Add player to Firebase if game is not full
var addPlayer = function(name) {
    var playerNumber;
    if (!playerOneOccupied) {
        playerNumber = 1;
    } else {
        playerNumber = 2;
    }

    players.child(playerNumber).set({
        name: name,
        wins: 0,
        losses: 0,
        connected: true
    });
}

// Display player info in HTML
var displayPlayerInfo = function(playerNumber, playerName, wins, losses) {
    $("#player-" + playerNumber + "-name").text(playerName);
    $("#player-" + playerNumber + "-stats").text("Wins: " + wins + " | Losses: " + losses);
}

// Click events
// Add player
$("#start-button").on("click", function() {
    event.preventDefault();
    
    var playerName = $("#player-name").val().trim()
    if (playerName) {
        checkGameCapacity();
        if (!gameIsFull) {
            addPlayer(playerName);
            $("#player-name").val("");
        } else {
            console.log("Game is Full");
        }
    }
});

// Send chat message
$("#chat-button").on("click", function() {
    event.preventDefault();
});

/* TO DO
- Player needs to be connected - if disconnect, remove their info and decrease numberOfPlayers
*/