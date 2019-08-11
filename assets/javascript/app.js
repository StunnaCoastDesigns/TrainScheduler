var newTrain;
var trainAdd;
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival;
var minutesAway = 0;
var firstTrain;
var currentDT = moment().format();

$(document).ready(function() {
    // Linking to Firebase here
    var trainData = new Firebase("https://stunna-train-database.firebaseio.com/");

    // Button for adding trains are here
    $("#addTrainBtn").on("click", function()  {

        // Variables
        // Users input from tables are here
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var trainTimeInput = $("#trainTimeInput").val().trim();
        var frequencyInput = $("#frequencyInput").val().trim();

        console.log(trainName);
        console.log(destination);
        console.log(trainTimeInput);
        console.log(frequencyInput);
    
    var newTrain = {
        name: trainName,
        destination: destination,
        trainTime: trainTimeInput,
        frequency: frequencyInput,
    }
    trainData.push(newTrain);

    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainInput").val("");
    $("#frequencyInput").val("");

    return false;
});

database.ref().on("child_added", function (childSnapShot) {
    console.log(childSnapShot.val());

    var firebaseName = childSnapShot.val().name;
    var firebaseDestination = childSnapShot.val().destination;
    var firebaseTrainTimeInput = childSnapShot.val().trainTime;
    var firebaseFrequency = childSnapShot.val().frequency;

    var diffTime = moment().diffTime(moment.unix(firebaseTrainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
    var minutes = firebaseFrequency - timeRemainder;

    var nextTrainTravel = moment().add(minutes, "m").format("hh:mm a");

    console.log(minutes);
    consolelog(nextTrainArrival);
    console.log(moment().format("hh:mm a"));
    console.log(nextTrainArrival);
    console.log(moment().format("X"));


    $("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination 
    + "</td><td>" + firebaseFrequency + "mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td><td>");
});
});