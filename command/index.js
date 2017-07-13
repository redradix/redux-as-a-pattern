'use strict'
var printMatrix = require('./printMatrix')

function Matrix(width, height, initialPosition) {
	var position = initialPosition || [0, 0]

	return {
		moveRight: function() {
			position[0]++
		},
		// move: function(movement) {
		// 	position = movement.execute(position)
		// },
		print: function() {
			printMatrix(width, height, position)
		}
	}
}

function Right() {
	return {
		execute: function(position) {
			return [position[0] + 1, position[1]]
		}
	}
}


var WIDTH = 4
var HEIGHT = 4

var matrix = Matrix(WIDTH, HEIGHT)

matrix.print()
matrix.moveRight()
// matrix.move(new Right())
matrix.print()

