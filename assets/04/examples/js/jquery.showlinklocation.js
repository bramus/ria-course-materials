(function($){
	$.fn.showLinkLocation = function() {
		return this.filter('a').each(function() {
			$(this).append( ' <em>(' + this.href + ')</em>');
		});
	};
}(jQuery));