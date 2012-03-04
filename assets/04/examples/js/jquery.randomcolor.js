(function($) {
	$.extend({
		randomColor : function() {
			return '#' + Math.floor(Math.random() * 16777216).toString(16);
		}
	})
})(jQuery);