// Variables for initial buttons
var holidays = ["New Years", "MLK Jr Day","Valentine's Day", "Ground Hog Day", "St. Patrick's Day","National Napping Day", "Easter", "Halloween", "Thanksgiving", "Christmas"];

// Creates holiday buttons when the page loads 
createHolidayButtons();

// On click event for buttons 
$(document.body).on('click', '.button-list', function() {
    // Creates a variable and assigns the value to the name of the holiday clicked/
    var holidayClicked = $(this).data('holiday');
   // console.log(holidayClicked)
    // Creates a variable to hold the query string for the Giphy API request and adds the holiday to the query string.
      method: "GET"
    var query = 'https://api.giphy.com/v1/gifs/search?q=' + holidayClicked + '&limit=10&api_key=y2PuqCv4HzuWJW3ZjAEsM0vOapdxaQI3';
    // console.log(query)
      method: "GET"
      
    // Empties the holidays element so new gifs are loaded in on each click of an holidays button.
    $('#holidays').empty();


    // Makes an AJAX request using the query string outlined above.
    $.ajax({
        url: query,
        method: 'GET'
            // Performs this anonymous function when the request is recieved back from the API.
    }).done(function(response) {
        // Creates a new variable and assigns its value to the responses JSON data object.
        var results = response.data;

        // Runs a for loop for the number of recieved results. 
        for (i = 0; i < results.length; i++) {
            // Creates a new variable and assigns a div with a class of col-sm-4 to it.
            var newGif = $('<div class="col-sm-4">');
            // Creates a new variable and assigns a rating from the response to it.
            var rating = results[i].rating.toUpperCase();
            // Creates a new variable and assigns a paragraph to it with the HTML of the gifs rating.
            var p = $('<p>').html('Rating: ' + rating);
             // Creates a new variable and assigns the title from the response to it.
             var title = results[i].title.toUpperCase();
             // Creates a new variable and assigns a paragraph to it with the HTML of the gifs title.
             var p2 = $('<p>').html('Title: ' +title);
            // Adds the text-center class to the p variable.
            p.addClass('text-center');
            // Creates a new variable and assigns a img.
            var img = $('<img>');

            // Adds a src to the img variable of the gifs still image.
            img.attr('src', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gifs still image.
            img.attr('data-still', results[i].images.fixed_height_small_still.url);
            // Adds a data attribute to the img variable of the gif.
            img.attr('data-animate', results[i].images.fixed_height_small.url);
            // Adds a data attribute to the img variable of the gifs state.
            img.attr('data-clicked', 'still');
            // Adds a classes to the img variable.
            img.addClass('gif-margin gif center-block panel');

            // Appends the p and img variables to the newGif variable.
            newGif.append(img);
            newGif.append(p);
           // newGif.append(p2); title for bonus section removed temporarily formatting needed
            
            // Appends the newGif variable to the element with the holidays ID.
            $('#holidays').append(newGif);
        }
    });
});

// On click event for animation
$(document.body).on('click', '.gif', function() {
    var click = $(this).attr('data-clicked');

    if (click === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-clicked', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-clicked', 'still');
    }
});

// On click for new holidays to be added
$('#addHoliday').on('click', function() {
    var holidayEntered = $('#holidayInput').val().trim();
    holidays.push(holidayEntered);
    $('#holidayInput').val('');
    createHolidayButtons();

    return false;
});

// This function is responsible for creating the clickable buttons of holiday names.

function createHolidayButtons() {
    $('#holidayButtons').empty();

    for (var i = 0; i < holidays.length; i++) {
        var button = $('<button>').addClass('btn btn-primary button-list');
        button.attr('data-holiday', holidays[i]).html(holidays[i]);
        $('#holidayButtons').append(button);
    }
}