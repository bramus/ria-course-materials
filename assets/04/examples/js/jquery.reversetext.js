(function($) {
	// jQuery plugin definition
	$.fn.reverseText = function(params) {
		// merge default and user parameters
		params = $.extend( {minlength: 0, maxlength: 99999}, params);
		// traverse all nodes
		this.each(function() {
			// express a single node as a jQuery object
			var $t = $(this);
			// find text
			var origText = $t.text(), newText = '';
			// text length within defined limits?
			if (origText.length >= params.minlength &&  origText.length <= params.maxlength) {
				// reverse text
				for (var i = origText.length-1; i >= 0; i--) newText += origText.substr(i, 1);
				$t.text(newText);
			}
		});
		// allow jQuery chaining
		return this;
	};
})(jQuery);