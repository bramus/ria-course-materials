(function($) {
	$.extend($.expr[':'], {
		lists : function(elem, index, match, stack) {
			return ($.inArray(elem.nodeName.toLowerCase(), ['ul','ol','dl']) > -1);
		}
	});
})(jQuery);