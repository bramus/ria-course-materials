(function($) {
	
	var methods = {
		init : function(options) { 
			var o = $.extend($.fn.hilight.defaults, options);
			return this.each(function() {
				var $this = $(this);
				$this.css({
					'color': o.foreground,
					'background-color': o.background
				});
				$this.html('<strong>' + $this.html() + '</strong>');
			});
		},
		remove : function() {
			return this.each(function(){
				var $this = $(this);
				$this.css({
					'color': 'inherit',
					'background-color': 'transparent'
				});
				$this.html($this.find('strong').html());
			});
		}
	};

	$.fn.hilight = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else { 
			$.error('Method ' +  method + ' does not exist on jQuery.hilight');
		}    
	};
	
	$.fn.hilight.defaults = {
		foreground: 'red',
		background: 'yellow'
	};
	
})(jQuery);