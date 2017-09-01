import options from './options.js';

class Game {
	constructor(cols, rows, mines) {
		this.cols = options.cols || 10
		this.rows = options.rows || 10
		this.mines = options.mines || 10
		this.cellSize = options.cellSize || 20
		this.isOver = false
	}
	init() {
		var _this = this;

		// Set the grid container
		function initCanvas() {
			const canvas = document.getElementById('app')
			canvas.style.width = (_this.cellSize * _this.cols)+'px'
			canvas.style.height = (_this.cellSize * _this.rows)+'px'
		}
		// Create the cells with unique id
		function initCells() {
			var id = 0
			for (let i = 0; i < _this.rows; i++) {

				for (let i = 0; i < _this.cols; i++) {

					var cell = document.createElement("button")
					var cell_content = document.createTextNode("o")
					cell.appendChild(cell_content)
					document.getElementById('app').appendChild(cell)
					cell.style.width = _this.cellSize+'px'
					cell.style.height = _this.cellSize+'px'
					cell.setAttribute("id", id++);

				}
			}
		}
		// Put mines in random cells
		function initMines() {

			function shuffle(array) {
				var currentIndex = array.length, temporaryValue, randomIndex;

				while (0 !== currentIndex) {

					randomIndex = Math.floor(Math.random() * currentIndex);
					currentIndex -= 1;

					temporaryValue = array[currentIndex];
					array[currentIndex] = array[randomIndex];
					array[randomIndex] = temporaryValue;
				}

				return array;
			}

			var cells = Array.apply(null, {length: (_this.rows * _this.cols)}).map(Number.call, Number)
			shuffle(cells);

			var minesLocations = cells.splice(0, _this.mines);

			for (var i = 0; i < minesLocations.length; i++) {
				var mined = document.getElementById(minesLocations[i])

				mined.className = "mined"

				// Temp (For devs visualizacion)

				mined.style.backgroundColor = 'red';

			}
		}

		initCanvas();
		initCells();
		initMines();


	}

}
let buscaminas = new Game()

buscaminas.init();
