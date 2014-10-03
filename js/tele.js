$(document).ready(function(){
	$(document).keydown(function(e) {
		term.printNext($("#terminal"))
	})
})

Array.prototype.getIterator = function(index) {
	var theArray = this
	return {
		next: function() {
			var value = theArray[index]
			if (index < theArray.length-1) { //bump up against the end and return the same value
				index++;
			}
			return value;
		},
		prev: function() {
			var value;
			if (index > 0) {
				value = theArray[index-1]; //do not get current element.
				index--;
			}
			else {
				value = theArray[0]; //bump up against element 0
			}
		}
	}
}


var term = (function(script, config){

	var iter = script.getIterator(0)
	var nextElement;

	return {
		commands: script,
		printNext: function(element) {
			var obj = iter.next() //HAHAHAHHHAHA

			var commandElem = nextElement || $("<div></div").addClass("command").append(config.prompt).appendTo(element)
			
			function appendCharStream(to, what, speed, index) {
				if (index === undefined) index = 0;

				to.append(what.charAt(index))
				if (index < what.length) {
					index++;
					setTimeout(function() {
						appendCharStream(to, what, speed, index)
					}, speed)
				}
			}

			appendCharStream(commandElem, obj.input, 20)

			setTimeout(function() {
				element.append('<div class="command">'+obj.output+'<br>')
				element.animate({scrollTop:element[0].scrollHeight}, 1000);
				nextElement = $("<div></div").addClass("command").append(config.prompt)
				nextElement.appendTo(element)
			}, 1000)
		}
	}
})(script, config)