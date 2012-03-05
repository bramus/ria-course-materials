(function($){
	
	$.fn.hilight = function(options) {
		
		var o = $.extend({}, $.fn.hilight.defaults, options);

		return this.each(function() {
			var $this = $(this);
			
			$this.css({
				'color': o.foreground,
				'background-color': o.background
			});
			
			$this.html('<strong>' + $this.html() + '</strong>');
			
		});
		
	};

	$.fn.hilight.defaults = {
		foreground: 'red',
		background: 'yellow'
	};
	
}(jQuery));