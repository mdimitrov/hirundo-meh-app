require(['jquery', 'handlebars', 'text!js/templates/feed.html', 'bootstrap'], function ($, Handlebars, feedTemplate) {
	Handlebars = Handlebars.default;

	function reloadFeed(data) {
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

  fetchFeed();
  setInterval(fetchFeed, 30000);
});