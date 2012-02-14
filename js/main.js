window.addEventListener('load', function() {
	
	// Parse the query string into a key/value object
	var query = {};
	location.search.replace( /[A-Z0-9]+?=(\w*)/gi, function(a) {
		query[ a.split( '=' ).shift() ] = a.split( '=' ).pop();
	} );

	// Start Reveal.js Slideshow Engine
	Reveal.initialize({
		// Display controls in the bottom right corner
		controls: true,

		// Display a presentation progress bar
		progress: true,

		// If true; each slide will be pushed to the browser history
		history: true,

		// Flags if mouse wheel navigation should be enabled
		mouseWheel: false,

		// Apply a 3D roll to links on hover
		rollingLinks: false,

		// UI style
		theme: query.theme || 'default', // default/neon

		// Transition style
		transition: query.transition || 'default' // default/cube/page/concave/linear(2d)
	});


	// Syntax Highlighting (all code blocks: JS, CSS, HTML, PHP, etc.) + play nice contenteditable
	var codeBlocks = document.querySelectorAll('pre code');
	for (var i = 0, len = codeBlocks.length; i < len ; i++) {

		// Local reference
		var codeBlock = codeBlocks[i];

		// May we highlight it?
		if (codeBlock.className.match(new RegExp('(\\s|^)donthighlight(\\s|$)'))) continue;

		// Highlight it
		hljs.highlightBlock(codeBlock, '    ');
		
		// If it's editable, add listeners to it to disable/enable Syntax Highlighting when necessary
		if (codeBlock.hasAttribute('contenteditable')) {
			
			// Disable on focus
			codeBlock.addEventListener('focus', function() {
				if (this.className.match(new RegExp('(\\s|^)language-html(\\s|$)'))) {
					this.innerHTML = htmlentities(stripHTML(this.innerHTML));
				} else {
					this.innerHTML = stripHTML(this.innerHTML);
				}
			});
		
			// Re-enable on blur
			codeBlock.addEventListener('blur', function() {
				// @note <div> is needed for Chrome which inserts one when ENTER is pressed.
				this.innerHTML = this.innerHTML.replace(/<br>/gm, '\r\n').replace(/<br\/>/gm, '\r\n').replace(/<br \/>/gm, '\r\n').replace(/<div>/gm, '\r\n').replace(/<\/div>/gm, ''); 
				hljs.highlightBlock(this, '    ');
			});
			
		}
		
	}

	// Add Run Button to JS Blocks + Make Incrementable
	var jsBlocks = document.querySelectorAll('code.language-js');
	for (var i = 0, len = jsBlocks.length; i < len ; i++) {

		// Local reference
		var jsBlock = jsBlocks[i];

		// may we add the run button to it?
		if (jsBlock.className.match(new RegExp('(\\s|^)dontrun(\\s|$)'))) continue;

		// Add Run button
		var button = document.createElement('input');
		button.type = 'submit';
		button.value = 'Run';
		button.className = 'run';
		button.addEventListener('click', function() {
			eval(stripHTML(this.parentNode.querySelector('code').innerHTML)); // Yeah, that's effin' dangerous!
		});
		jsBlock.parentNode.appendChild(button);

		// Hook ctrl+enter to run the code
		jsBlock.addEventListener('keypress', function(evt) {
			if(evt.ctrlKey && (evt.keyCode == 13)) {
				evt.preventDefault();
				evt.stopPropagation();
				eval(stripHTML(this.innerHTML));
			}
		}, false);

		// Make Incrementable
		new Incrementable(jsBlock);

	}

	// Helper Function to strip HTML from a string
	function stripHTML(html) {
		var tmp = document.createElement('div');
		tmp.innerHTML = html;
		toReturn = tmp.textContent || tmp.innerText;
		tmp = null;
		return toReturn;
	}
	
	function htmlentities(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML.replace(/"/g, '"').replace(/'/g, '\'');
	}
	
	function html_entity_decode(str) {
		var tmp = document.createElement('textarea');
		tmp.innerHTML = str.replace(/</g,"&lt;").replace(/>/g,"&gt;");
		toReturn = tmp.value;
		tmp = null;
		return toReturn;
	}

	// Make CSS Blocks update referenced elements + Make Incrementable
	var cssBlocks = document.querySelectorAll('code.language-css');
	for(var i = 0, len = cssBlocks.length; i < len; i++) {

		// Local reference
		var cssBlock = cssBlocks[i];

		// Apply style to referenced element(s)
		new CSSSnippet(cssBlock);

		// Make Incrementable
		new Incrementable(cssBlock);
		
	}
	
	// Print fix (Firefox, IE only though)
	window.addEventListener('beforeprint', function(e) {
		var els = document.querySelectorAll('#reveal .slides > section');
		for(var i = 0, len = els.length; i < len; i++) {
			els[i].style.display = 'block';
		}
	});
	
}, false);