$(function () {});
  
/* Declaring Variables */
var now = moment().format("H A");

var today = moment().format("dddd, MMMM Do");


/* workDay records for each hour of the workday */
var workDay = [
  { time: "9 AM", event: "" },
  { time: "10 AM", event: "" },
  { time: "11 AM", event: "" },
  { time: "12 PM", event: "" },
  { time: "1 PM", event: "" },
  { time: "2 PM", event: "" },
  { time: "3 PM", event: "" },
  { time: "4 PM", event: "" },
  { time: "5 PM", event: "" },
];

/* Local Storage check */
var dayEvents = JSON.parse(localStorage.getItem("workDay"));
if (dayEvents) {
  workDay = dayEvents;
}

/* Current Day */
$("#currentDay").text(today);

/* Rows */
workDay.forEach(function(timeBlock, index) {
   
    var blockColor = colorRow(timeLabel);

    var timeLabel = timeBlock.time;
   
	var row =
		'<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';

	$(".container").append(row);
});

/* Color rows based on current time */
function colorRow(time) {
    var planEntry = moment(time, "H A");
	var planNow = moment(now, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}

/* Saving Events */
$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
	var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	workDay[blockID].event = userEntry;

	/* Putting local storage */
	localStorage.setItem("workDay", JSON.stringify(workDay));
});