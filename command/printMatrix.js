module.exports = function(width, height, position) {
	for(var i = 0; i < height; i++) {
		var row = []
		for(var j = 0; j < width; j++) {
			if (position[0] === j && position[1] === i ) {
				row.push('x')
			} else {
				row.push('o')
			}
		}
		console.log(row.join(' '))
	}
	console.log('\n')
}