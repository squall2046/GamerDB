
$(document).ready(function () {
    //================== search game =====================
    $("#searchBtn").on("click", function () {
        event.preventDefault();
        var input = $('#inputGame').val().trim().split(" ").join("+");

        if (input.length < 1) {
            alert("Which game are you looking for?")
        } else {
            $.get("/input/" + input).then(function (data) {
                $(".searchRes").html(

                    '<div class="searchStyle">' +
                    '<button id="searchOff"><i class="fas fa-times"></i> </button>' +

                    '<h2 class="transition" style="margin-top: 50px; margin-left: auto; margin-right: auto; width: 100%; ">' + data.Name + '</h2>' +
                    '<p style="margin-top: 50px; margin-left: auto; margin-right: auto; width: 100%; ">' + 'Year of Release: ' + data.Year_of_Release + '<br> Platform: ' + data.Platform  + '<br>  Genre: ' + data.Genre + '<br> North America Sales: ' + data.NA_Sales + '<br> Global Sales: ' + data.Global_Sales + '</p>' +
                    '<div class="my-rating jq-stars"></div>' +
                    '<button class="favBtn btn-danger" id="btn-fav-search" data-gameId="' + data.id + '" data-favSta="' + data.isFav + '">' +
                    '<i class="fas fa-heart">' + '</i>' +
                    '</button>' +
                    '<div class="cta-container transition searchDetails"><a href="/card/' + data.id + 
                    '" class="cta cardBtn">More Details</a></div>' +
                    '</div>'

                    //=====( Isaac, this is your search bar code )=====//

                    // '<div class="searchStyle">' +
                    // '<h6>Game Name: ' + data.Name + '</h6>' +
                    // '<p>Game Platform: ' + data.Platform + '</p>' +
                    // '<p>Year_of_Release: ' + data.Year_of_Release + '</p>' +
                    // '<p>Genre: ' + data.Genre + '</p>' +
                    // '<p>North America Sales: ' + data.NA_Sales + '</p>' +
                    // '<p>Global Sales: ' + data.Global_Sales + '</p>' +
                    // '<div class="my-rating jq-stars"></div>' +
                    // '<button class="favBtn btn-danger" data-gameId="' + data.id +
                    // '" data-favSta="' + data.isFav + '"><i class="fas fa-heart"></i></button>' +
                    // '<div class="cta-container transition"><a href="/card/' + data.id +
                    // '" class="cta cardBtn">More Details</a></div>' +
                    // '<button class="btn btn-primary" id="searchOff"> Close </button>' +
                    // '</div>'
                );
                $('#inputGame').val("");
            });
        }
    });
    $(document).on("click", "#searchOff", function () {
        $(".searchRes").empty();
    });
    $("#sortBtn").on("click", function () {
        event.preventDefault();
        if ($("#platform").val() === "ps4") {
            window.location = "/platform/ps4"
        }
        if ($("#platform").val() === "xb1") {
            window.location = "/platform/XOne"
        }
        if ($("#platform").val() === "wiiu") {
            window.location = "/platform/WiiU"
        }
        if ($("#platform").val() === "3ds") {
            window.location = "/platform/3DS"
        }
        if ($("#genre").val() === "act") {
            window.location = "/Genre/action"
        }
        if ($("#genre").val() === "rpg") {
            window.location = "/Genre/rpg"
        }
        if ($("#genre").val() === "spt") {
            window.location = "/Genre/sports"
        }
        if ($("#genre").val() === "sht") {
            window.location = "/Genre/Shooter"
        }
        $("#platform").val("");
        $("#genre").val("");
    })
    $("#orderBtn").on("click", function () {
        event.preventDefault();
        if ($("#gameOrder").val() === "yd") {
            window.location = "/year-desc"
        }
        if ($("#gameOrder").val() === "ya") {
            window.location = "/year-asc"
        }
        if ($("#gameOrder").val() === "sd") {
            window.location = "/sales-desc"
        }
        if ($("#gameOrder").val() === "sa") {
            window.location = "/sales-asc"
        }
    })
    //================== favorite button in game table =====================
    $(document).on("click", ".favBtn", function () {
        var gameId = $(this).data("gameid");
        var favSta = $(this).data("favsta");
        if (favSta === false) {
            $.ajax({
                type: "POST",
                url: "/favorite/add/" + gameId,
            }).then(
                function (post) {
                    alert("saved to your favorite!")
                });
            $.ajax({
                type: "PUT",
                url: "/favorite/add/" + gameId,
            }).then(
                function (put) {
                    console.log("favorite state changed");
                });
            window.location = "/";
        } else {
            alert("it's already in favorite~")
        };
    })
    //================== star =====================
    $(".my-rating").starRating({
        initialRating: 0,
        starSize: 20,
        callback: function (currentRating, $el) {
            var gameId = $("#star").data("gameid");
            $.ajax({
                type: "PUT",
                url: "/rating/" + gameId,
                data: { star: currentRating }
            }).then(
                function (res) {
                    // update:
                    $("#star").html("last rating: " + currentRating);
                }
            );
        }
    })
})