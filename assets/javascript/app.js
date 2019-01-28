// Array of topics for gifs
var topics = ["Running", "Jumping", "Swimming", "Dancing", "Biking", "Rock Climbing", "Roller Skating", "Aerobics"];

// Function to create buttons for each topic in topics array
function renderButtons() {

// Delete movies prior to adding new buttons
$("#buttons-show").empty();    

// Loop through array of topics
for (var i = 0; i < topics.length; i++) {
    // Create button for each object in the array
    var button = $("<button>");
    // Add class to each button
    button.addClass("btn");
    // Add button type
    button.attr("type", "button");
    // Add data name attribute
    button.attr("data-name", topics[i]);
    // Add text to each button
    button.text(topics[i]);
    // Add buttons to buttons show div
    $("#buttons-show").append(button);
  }
  $("#topic-input").val("")
};


function displayGifs() {

// Clear any displayed images
$("#gifs-show").empty();

// Create variable to hold the data name for each attribute
var topic = $(this).attr("data-name");    
// Creating queryURL using the topics to access api site
var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + 
    topic + "&api_key=TaPLcLWJx9YaNIA0vUU8NkIzJoqXAAwu&limit=10";

//Performing the ajax request    
$.ajax({
    url: queryURL,
    method: "GET"
  })
  
  // Function to run after data comes back from request
  .then(function(response) {

    // Creating variable "results" to store response from ajax request
    var results = response.data;
    console.log(results)
    // Loop through results
    for ( var i = 0; i < results.length; i++) {
        // Create div tag for each result
        var topicsDiv = $("<div class='topics'>");

        // Create heading tag to store the title for each result
        var title = $("<p>").text(results[i].title);

        // Create p tag to store the rating for each result
        var rating = $("<p>").text("Rating: " + results[i].rating);

        // Create img tag for each result
        var topicsImage = $("<img class='gif'>");

        // Create variables for still images and animated images
        var imageStill = results[i].images.fixed_height_still.url;
        var imageAnimate = results[i].images.fixed_height.url;

        // Add attributes for images to results images
        topicsImage.attr("data-animate", imageAnimate);
        topicsImage.attr("data-still", imageStill);
        topicsImage.attr("src", imageStill);
        
        // Add data-state attribute of "still"
        topicsImage.attr("data-state", "still");

        // Append image and p tags to topics div
        topicsDiv.append(topicsImage);
        topicsDiv.append(title);
        topicsDiv.append(rating);

        // Prepend topicsDiv to "gifs-show" div on HTML page
        $("#gifs-show").prepend(topicsDiv);
    }


    $(".gif").on("click", function() {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    })
})
};

   
    // Create function to add topic
    $("#add-topic").on("click", function(event) {
      // Prevent submit when clicked
      event.preventDefault();
      // Pull input from textbox
      var topicSuggestion = $("#topic-input").val().trim();
      // Avoid posting blank button
      if (!$("#topic-input").val()){
          renderButtons();
        }
        // Avoid posting duplicate buttons
        else if(jQuery.inArray(topicSuggestion, topics) === -1){
         // Add topic to topics array
         topics.push(topicSuggestion);
         // Call function to create button for topicSuggestion
         renderButtons();
        }
            else {
                renderButtons();
            }
    });

$(document).on("click", ".btn", displayGifs); 
renderButtons();

