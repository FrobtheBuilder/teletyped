$(document).ready(function(){

	var rootElement = $("#terminal");

	rootElement.css("height", window.innerHeight-50)
	rootElement.css("width", window.innerWidth-50)

	script.forEach(function(command) {
		processor.process(command);
	});

	tty.printNext(rootElement);
	$(document).keydown(function(e) {
		tty.printNext(rootElement);
	});
	$(document).click(function(e) {
		tty.printNext(rootElement);
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

var processor = (function(config) {

	var filters = [
		{	
			name: "CATIMG",
			func: function(argument) {
				this.input = "cat "+argument;
				this.output = '<img src="'+argument+'">';
			}
		}
	]

	return {
		process: function (command) {
			if (command.args != undefined) {
				filters.forEach(function(filter) {
					if (command.input == config.tag+filter.name) {
						filter.func.apply(command, command.args);
					}
				})
			}
		}
	}

})(config)


var tty = (function(script, config){

	var iter = script.getIterator(0)
	var nextElement;

	return {
		commands: script,
		printNext: function(element) {
			var that = this;
			var obj = iter.next() //HAHAHAHHHAHA OMFG IT WORKS
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
				element.append('<div class="command result">'+obj.output+'<br>')
				element.animate({scrollTop:element[0].scrollHeight}, 1000);
				setTimeout(function(){
					nextElement = $("<div></div").addClass("command").append(config.prompt)
					nextElement.appendTo(element)
					if (obj.next != undefined && obj.next) {
						that.printNext(element)
					}
				}, 100)
			}, 1000)
		}
	}
})(script, config)