(function() {
    // This code updates Meddelare' social sharing counts for all matching elements on this page.
    // The url is taken from the elements' data-meddelare-url.
    //
    // The request is being made to Meddelare's server (on cloudfront). You need to set up your own server.
    // See more information on https://meddelare.com/
    //
    // Requires jQuery.
    //
    // TODO: de-duplicate urls to reduce the number of requests.

    $("[data-meddelare-url]").each(function(index, element) {
        var $meddelareUrlElement = $(element),
            url = $meddelareUrlElement.data("meddelare-url");

        $.ajax("https://d12cncu17l9pr5.cloudfront.net/?networks=facebook,twitter,googleplus&url=" + url, {
            success: function(res, err) {
                $.each(res, function(network, value) {
                    if (value >= 0) {
                        $meddelareUrlElement.find("[data-meddelare-network=" + network + "]").attr("data-count", value);
                    }
                });
            }
        });
    });
}());
