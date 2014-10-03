// just some config options
var config = {
	prompt: "$ "
}



/*
format:
[
	{
		command: "what to write out",
		result: "what to respond with (can be any html)"
		OR
		result: "autoImg" for "cat ...png kind of commands"
	}
]

*/

var script = [
	{
		input: "cat img/bell.jpg",
		output: '<img src="img/bell.jpg">'
	},
	{
		input: "cat another/image.jpg",
		output: "lel"
	}
]