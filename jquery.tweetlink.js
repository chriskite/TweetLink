
(function($) {

    $.fn.tweetlink = function(options) {
        return this.each(function() {
            var $this = $(this);
            
            $this.click( function() {
                tweetlinkClick($this);
            });
        });
    };
    
    $.fn.tweetlink.options = {
        classname:  'tweetlink',
        charlimit: 140
    };

    //called when the api request to bit.ly finishes
	$.fn.tweetlink.shortenCallback = function(data) {
		// this is how to get a result of shortening a single url
		var result;
		for (var r in data.results) {
			result = data.results[r];
			result['longUrl'] = r;
			break;
		}
		tweet(result['shortUrl']);
	}

    //callback added to all DOM objects with class="tweetlink"
    //shortens the document's url, which is then sent to twitter
    function tweetlinkClick($obj) {
        BitlyClient.shorten(document.location, '$.fn.tweetlink.shortenCallback');
    };
    
    //send the document title and shortened url to twitter
    function tweet(shorturl) {
        var title = document.title;
        var limit = $.fn.tweetlink.options.charlimit;
        var shorttitle = title.substr(0, limit - (shorturl.length + 1));
        var tweet = shorttitle + ' ' + shorturl;
        
        document.location = "http://twitter.com/home?status=" + escape(tweet);
    }

    //add the appropriate callback to all DOM objects with class="tweetlink"
    $(document).ready( function() {
        $('.' + $.fn.tweetlink.options.classname).tweetlink();
    });
  
})(jQuery);
