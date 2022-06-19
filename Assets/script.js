// when I visit this page
// I should see 9am to 5pm (workday)
// Create 2 functions 

// Using moment, if day is 6 || 7 "Enjoy the weekend", else show day

function startClock() {
    setInterval(function () {
        const now = moment().format("h:mm:ss a Do-MMM-YYYY");

        const day = moment().day();

        const weekend = moment().day("Saturday", "Sunday");

        const weekday = moment().day("Monday", "Tuesday", "Wednesday", "Thrusday", "Friday")

        if(weekday){
            $("#current-time").text("It's " + day + now);
        }

        if(weekend){
            $("#current-time").text("Go and enjoy the weekend!!! " + day + now);
        }

        // $("#current-time").text(now)

    }, 1000);
}

function createTimeBlock(hour) {

    const row = $("<div>");

    const currentHour = Number(moment().format("H"));

    // past --- hour < current hour
    const isPast = hour < currentHour;
    // present --- current hour === hour
    const isPresent = hour === currentHour;
    // future --- hour > current hour
    const isFuture = hour > currentHour;

    let rowClass = 'row';

    if (isPast) {
        rowClass = rowClass + ' past';
    }

    if (isPresent) {
        rowClass = rowClass + ' present';
    }

    if (isFuture) {
        rowClass = rowClass + ' future';
    }

    row.attr('class', rowClass);

    const timeCol = $("<div>");
    timeCol.attr('class', 'time-col col-2');

    timeCol.text(hour + ":00");

    const textDiv = $("<div>");
    textDiv.attr('class', 'textarea-col col-8');
    const textInput = $('<textarea cols="30" rows="3">');
    textDiv.append(textInput);

    // with existing details form local storage
    const existingData = localStorage.getItem(hour);
    textInput.val(existingData);

    const btnDiv = $("<div>");
    btnDiv.attr('class', 'button-col col-2 d-flex justify-content-center p-0 rounded-lg');
    const btnSave = $("<button>");
    btnSave.attr('class', 'btn btn-primary save-button btn-block');
    const iconSave = $("<i class='fas fa-save fa-2x'></i>")
    btnSave.append(iconSave);

    btnDiv.append(btnSave);

    row.append(timeCol, textDiv, btnDiv);
    
    return row;


};

// $ (When page is loading)
$(function () {

    startClock();

    const timeBlockContainer = $(".container");

    for (let hour = 9; hour < 18; hour++) {

        const timeBlock = createTimeBlock(hour);


        timeBlockContainer.append(timeBlock);
    };
});


$(document).on('click', '.save-button', function (event) {

    // When user clicks on the save button on a particular time block
    

    // If empty, ok to store

   

    const buttonClicked = $(event.target);

    const textInput = buttonClicked.parent().prev().children();

    const timeCol = buttonClicked.parent().prev().prev();

    const time = timeCol.text();
    // console.log(time)

    const hour = time.slice(0,-3);

    // console.log(hour)
 // Grab the user input,
    const userInput = textInput.val();

    // console.log(userInput);

// Key should be the hour of timeblock

 // Save to local storage
 localStorage.setItem(hour, userInput);
    
    


});
