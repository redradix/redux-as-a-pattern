
'use strict'

var printMatrix = require('./printMatrix')

function Matrix(width, height, initialPosition) {
	var position = initialPosition || [0, 0]
	var commands = []
	var _callback

	return {
		dispatch: function(action) {
			commands.push(action)
			var data = action.execute({
				position: position,
				width: width,
				height: height
			})
			position = data.position
			width = data.width
			_callback(width, height, position)
		},
		undo: function() {
			var action = commands.pop()
			var data = action.undo()
			position = data.position
			width = data.width
			_callback(width, height, position)
		},
		onChange: function(callback) {
			_callback = callback
		}
	}
}

function Command() {
	this.prev
	this.undo = function() {
		return this.prev
	}
}

function Right(n) {
	this.execute =function(data) {
		this.prev = data
		return {
			position: [data.position[0] + n, data.position[1]],
			width: data.width,
			height: data.height
		}
	}
}

Right.prototype = new Command()

function Left() {
	this.execute = function(data) {
		this.prev = data
		return {
			position: [data.position[0] - 1, data.position[1]],
			width: data.width,
			height: data.height
		}
	}
}

Left.prototype = new Command()

function Down() {
	this.execute = function(data) {
		this.prev = data
		return {
			position: [data.position[0], data.position[1] + 1],
			width: data.width,
			height: data.height
		}
	}
}

Down.prototype = new Command()

function SetWidth(width) {
	this.execute = function(data) {
		this.prev = data
		return {
			position: data.position,
			width: width,
			height: data.height
		}
	}
}

SetWidth.prototype = new Command()

var WIDTH = 4
var HEIGHT = 4

var matrix = Matrix(WIDTH, HEIGHT)
matrix.onChange(printMatrix)

matrix.dispatch(new Right(2))

matrix.undo()

matrix.dispatch(new Right(1))

matrix.dispatch(new Down())

matrix.dispatch(new Left())

matrix.undo()

matrix.dispatch(new SetWidth(5))

matrix.undo()
