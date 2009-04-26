
(function($) {

    $.fn.tweetlink = function(options) {
        return this.each(function() {
            $this = $(this);
            
            $this.click( function() {
                tweetlinkClick($this);
            });
        });
    };
    
    $.fn.tweetlink.options = {
        classname:  'tweetlink'
    };    

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

    function tweetlinkClick($obj) {
        BitlyClient.shorten("http://www.google.com", '$.fn.tweetlink.shortenCallback');
    };
    
    function tweet(url) {
        document.location = "http://twitter.com/home?status=" + escape(url);
    }

    $.fn.tweetlink.options = {
        classname:  'tweetlink'
    };

    $(document).ready( function() {
        $('.' + $.fn.tweetlink.options.classname).tweetlink();
    });
  
})(jQuery);
