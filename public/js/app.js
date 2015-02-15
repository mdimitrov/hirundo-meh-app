require(['jquery', 'handlebars', 'text!js/templates/feed.html', 'bootstrap'], function ($, Handlebars, feedTemplate) {
	Handlebars = Handlebars.default;

	function reloadFeed(data) {
    debugger;
		$("#feed").html(Handlebars.compile(feedTemplate)(data));
  	}

  function fetchFeed() {
    $.ajax({
      type: "GET",
      url: "http://localhost:1337/feed"
    })
    .done(function(feed) {
      reloadFeed(feed);
    })
    .fail(function(error) {
      console.log(error);
    });
  }

  function sendTweet() {
    var text = $("#tweet-text").val();

    if (text.length) {
      $.ajax({
      type: "POST",
      url: "http://localhost:1337/tweet",
      data: {
        content: text
      }
    })
    .done(function() {
      fetchFeed();
    })
    .fail(function(error) {
      console.log(error);
    });
    }
  }

  $("#tweet-button").click(sendTweet);

  fetchFeed();
  setInterval(fetchFeed, 30000);
});