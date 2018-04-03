// HERE WE GO!

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
var localPlayerId = 0;
var turn = 0;

// Pull and update player data from Firebase when players are added
players.on("value", function(snapshot) {
    if (snapshot.hasChild("1")) {
        playerOneOccupied = true;
        displayPlayerInfo("1", snapshot.child("1/name").val());
        displayPlayerBox("1", snapshot.child("1/name").val(), snapshot.child("1/wins").val(), snapshot.child("1/losses").val());
    } else {
        playerOneOccupied = false;
    }

    if (snapshot.hasChild("2")) {
        playerTwoOccupied = true;
        displayPlayerInfo("2", snapshot.child("2/name").val());
        displayPlayerBox("2", snapshot.child("2/name").val(), snapshot.child("2/wins").val(), snapshot.child("2/losses").val());
    } else {
        playerTwoOccupied = false;
    }

    if (snapshot.hasChild("1") && snapshot.hasChild("2")) {
        gameIsFull = true;
        startRound();
    } else {
        gameIsFull = false;
    }
})

// Display player info in HTML
function displayPlayerInfo(playerNumber, playerName) {
    if (localPlayerId === 1) {
        $("#new-player-form").hide();
        $("#player-1-info").show()
        $("#player-2-info").hide();
    } else if (localPlayerId === 2) {
        $("#new-player-form").hide();
        $("#player-1-info").hide();
        $("#player-2-info").show();
    } else {
        $("#player-1-info").hide();
        $("#player-2-info").hide();
    }

    $("#player-" + playerNumber + "-greeting").text("Hi, " + playerName + "! You are Player " + playerNumber + ".");
}

// Display player box in HTML
function displayPlayerBox(playerNumber, playerName, wins, losses) {
    $("#player-" + playerNumber + "-name").text(playerName);
    $("#player-" + playerNumber + "-stats").text("Wins: " + wins + " | Losses: " + losses);
}

// Add player to Firebase if game is not full
function addPlayer(name) {
    if (!playerOneOccupied) {
        localPlayerId = 1;
    } else {
        localPlayerId = 2;
    }

    players.child(localPlayerId).set({
        name: name,
        wins: 0,
        losses: 0,
    });

    database.ref("players/" + localPlayerId).onDisconnect().remove();
}

// Set turn to 1 so gameplay can start
function startRound(name) {
    database.ref("turn").set("1");
    turn = 1;

    if (localPlayerId === 1) {
        displayChoices();
    } else {

    }
}

function displayChoices() {

}

// Run the resetPlayer function when a player exits the game
players.on("child_removed", function(snapshot) {
    resetPlayer(snapshot.key);
})

// Reset localPlayerId, reset player name and stats to default "Waiting for Player" text
function resetPlayer(playerNumber) {
    if (localPlayerId === playerNumber) {
        localPlayerId = 0;
    }

    $("#player-" + playerNumber + "-name").text("Waiting for Player " + playerNumber);
    $("#player-" + playerNumber + "-stats").text("");

    reopenGame();
}

function reopenGame() {
    if (localPlayerId === 0) {
        $("#new-player-form").show();
        $("#game-full-message").remove();
    }
}

// Click events
// Add player
$("#start-button").on("click", function() {
    event.preventDefault();
    
    var playerName = $("#player-name").val().trim()
    if (playerName) {
        if (!gameIsFull) {
            addPlayer(playerName);
            $("#player-name").val("");
        } else {
            $("#new-player-form").hide();
            $("<p>").attr("id", "game-full-message").text("Sorry, the game is full! Feel free to watch and wait for it to reopen.").appendTo("#new-player-area");
        }
    }
});

// Send chat message
$("#chat-button").on("click", function() {
    event.preventDefault();
});