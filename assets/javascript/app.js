$(document).ready(function () {
    var gQueryURL;
    var gifStuff = ["inuyasha", "full-metal-alchemist", "macross", "garden-of-words"]

    //create search bar that takes input 

    for (var i = 0; i < gifStuff.length; i++) {
        $("#buttonList").append('<button type="button" class="btn btn-dark">' + gifStuff[i] + '</button>');
    }

    $("button").on("click", function () {

        var input = findAndReplace($(this).text().trim(), " ", "-");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=dc6zaTOxFJmzC&limit=10";

        gQueryURL = queryURL;


        ajec();
    });

    $(document).on('click', '#close', function () {
        var input = findAndReplace($(this).text().trim(), " ", "-");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=dc6zaTOxFJmzC&limit=10";

        gQueryURL = queryURL;


        ajec();


    });




    $("#searchBar").keypress(function (e) {
        if (e.which === 13) {
            var search = findAndReplace($("#searchBar").val().trim(), " ", "-");
            e.preventDefault();
            console.log(search);
            gifStuff.push(search);
            $("#searchBar").val('');
            $("#buttonList").empty();
            for (var i = 0; i < gifStuff.length; i++) {
                $("#buttonList").append('<button type="button" id="close" class="btn btn-dark">' + gifStuff[i] + '</button>');
            }
            console.log(gifStuff);


        };


    });

    //---------------------------------------------------------------------
    function findAndReplace(string, target, replacement) {

        var i = 0, length = string.length;

        for (i; i < length; i++) {

            string = string.replace(target, replacement);

        }
        return string;
    };

    //Make the search Query 
    function ajec() {
        $.ajax({
            url: gQueryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(gQueryURL);
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {


                    var gifDiv = $("<div>");


                    var p = $("<p>").text("Rating: " + results[i].rating);

                    var gifImage = $("<img>");

                    gifImage.attr("src", results[i].images.original_still.url);
                    gifImage.attr("data-still", results[i].images.original_still.url);
                    gifImage.attr("data-animate", results[i].images.original.url);
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("gif-image");
                    
                    gifDiv.append(gifImage);
                    gifDiv.append(p);


                    $("#gifSpot").prepend(gifDiv);
                }
            });


    }


    $(document).on("click", ".gif-image", function () {

        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });







})