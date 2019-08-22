$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBJHLFeNSTsrIdHSQ2C1jSdmKZItHXJiQc",
        authDomain: "stunna-train-database.firebaseapp.com",
        databaseURL: "https://stunna-train-database.firebaseio.com",
        projectId: "stunna-train-database",
        storageBucket: "",
        messagingSenderId: "152702923066",
        appId: "1:152702923066:web:72e50bdc8a109909"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var database = firebase.database();


    // storing information from submit button
    $(".submitInput").on("click", function () {
        console.log("function is working");

        // Variables
        // Users input from tables are here
        var nameInput = $("#nameInput").val().trim();
        var numberInput = $("#numberInput").val().trim();
        var destinationInput = $("#destinationInput").val().trim();
        var timeInput = $("#timeInput").val().trim();
        var frequencyInput = $("#frequencyInput").val().trim();

        console.log(nameInput);
        console.log(numberInput);
        console.log(destinationInput);
        console.log(timeInput);
        console.log(frequencyInput);


        // input validation
        if (nameInput != "" &&
            numberInput != "" &&
            destinationInput != "" &&
            timeInput.length === 4 &&
            frequencyInput != "") {


            //    collected input above and port into firebase database
            database.ref().push({
                name: nameInput,
                number: numberInput,
                destination: destinationInput,
                time: timeInput,
                frequency: frequencyInput,

            });

        } else {

            alert("Please enter valid train data");
            $("input").val("");
            return false;
        }
        // console.log(database);
        $("input").val("");
    });
    database.ref().on("child_added", function (childSnapshot) {
        var name = childSnapshot.val().name;
        var number = childSnapshot.val().number;
        var destination = childSnapshot.val().destination;
        var time = childSnapshot.val().time;
        var frequency = childSnapshot.val().frequency;

        console.log(name, destination, time, frequency);

        // time formation

        var frequency = parseInt(frequency);
        var currentTime = moment();


        console.log("Current time: " + moment().format("HHmm"));

        var dateConvert = moment(childSnapshot.val().time, "HHmm").subtract(1, "years");

        console.log("DATE CONVERTED: " + dateConvert);

        var trainTime = moment(dateConvert).format("HHmm");

        console.log("Train time : " + trainTime);

        // difference bw the times
        var timeConvert = moment(trainTime, "HHmm").subtract(1, "years");
        var timeDifference = moment().diff(moment(timeConvert), "minutes");

        console.log("Difference in time: " + timeDifference);

        // remainder
        var timeRemaining = timeDifference % frequency;

        console.log("Time Remaining: " + timeRemaining);

        // time until next train 
        var timeAway = frequency - timeRemaining;

        console.log("Minutes until next train: " + timeAway);

        // next train arrival
        var nextArrival = moment().add(timeAway, "minutes");

        var arrivalDisplay = moment(nextArrival).format("HHmm");

        //append data to table
        $("#trainTableText").append(
            "<tr><td id='nameDisplay'>" + childSnapshot.val().name +
            "<td id='numberDisplay'>" + childSnapshot.val().number +
            "<td id='destinationDisplay'>" + childSnapshot.val().destination +
            "<td id='frequencyDisplay'>" + childSnapshot.val().frequency +
            "<td id='arrivalDisplay'>" + childSnapshot.val().arrivalDisplay +
            "<td id='awayDisplay'>" + timeAway + " minutes until arrival" + "</td></tr>");

        console.log(arrivalDisplay);
        console.log(timeAway);

    });

    //reset button
    $(".resetInput").on("click", function () {
        location.reload();
    });

    //set interval to refresh after 1 minute
    setInterval("window.location.reload()", 60000);

});