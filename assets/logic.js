// Initialize Firebase
var config = {
  apiKey: "AIzaSyCZqA0YT1elmhR1NVbXdItSQSRzfonjhwU",
  authDomain: "trainchallenge-d7457.firebaseapp.com",
  databaseURL: "https://trainchallenge-d7457.firebaseio.com",
  projectId: "trainchallenge-d7457",
  storageBucket: "trainchallenge-d7457.appspot.com",
  messagingSenderId: "605335348651"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#addTrain").on("click", function() {

trainName = $('#nameInput').val().trim();
destination = $('#destinationInput').val().trim();
firstTrainTime = $('#firstTrainInput').val().trim();
frequency = $('#frequencyInput').val().trim();

// console.log(trainName);

// Upload to database
database.ref().push({
  trainName: trainName,
  destination: destination,
  firstTrainTime: firstTrainTime,
  frequency: frequency
});

  return false;
});;

// Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(snapshot) {
// console.log(snapshot.val());

// update the variables with data from the database
trainName = snapshot.val().trainName;
destination = snapshot.val().destination;
firstTrainTime = snapshot.val().firstTrainTime;
frequency = snapshot.val().frequency;

// moment attempt to get next arrival calculated :/
var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
var nowMoment = moment(); // create variable to capture current time

var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
var minutesSinceLastArrival = minutesSinceFirstArrival / frequency;
var minutesAway = frequency - minutesSinceLastArrival;

var nextArrival = nowMoment.add(minutesAway, 'minutes');
var formatNextArrival = nextArrival.format("HH:mm");

// create row for table
var tablerow = $('<tr>').append(
  $("<td>").text(trainName),
  $("<td>").text(destination),
  $("<td>").text(frequency),
  $("<td>").text(formatNextArrival),
  $("<td>").text(minutesAway),
)

// append new role to table
$('#addedTrains').append(tablerow);

});
