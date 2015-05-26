// just some config options
var config = {
	prompt: "$ ",
	tag: "##"
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
		input: "cat /etc/motd",
		output: "Unix and its Derivatives <br> By Evan Banyash"
	},
	{
		//input: "cat img/bell.jpg",
		//output: '<img src="img/bell.jpg">'
		input: "##CATIMG",
		args: ["img/bell.jpg"]
	},
	{
		input: "cat BSD.txt | grep mascot",
		output: "The BSD mascot:",
		next: true
	},
	{
		input: "##CATIMG",
		args: ["img/bsd.png"]
	},
	{
		input: "##CATIMG",
		args: ["img/linus.jpg"]
	},
	{
		input: "##CATIMG",
		args: ["img/stallman.jpg"]
	},
	{
		input: "##CATIMG",
		args: ["img/gnu.jpg"],
		next: true
	},
	{
		input: 'echo "GNU: GNU\'s Not Unix"',
		output: "GNU: GNU\'s Not Unix"
	},
	{
		input: "cat linux.txt | grep mascot",
		output: "The Linux mascot:",
		next: true
	},
	{
		input: "##CATIMG",
		args: ["img/tux.png"]
	},
	{
		input: "##CATIMG",
		args: ["img/ubuntu.png"]
	},
	{
		input: "##CATIMG",
		args: ["img/redhat.png"]
	},
	{
		input: "##CATIMG",
		args: ["img/fedora.png"]
	}
]