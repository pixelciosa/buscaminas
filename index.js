import options from './options.js';

class Game {
	constructor(cols, rows, mines) {
		this.cols = options.cols || 10
		this.rows = options.rows || 10
		this.mines = options.mines || 10
		this.cellSize = options.cellSize || 20
		this.isOver = false
		this.buttons = []
	}
	init() {
		var _this = this;
		const canvas = document.getElementById('app')
		// Set the grid container
		function initCanvas() {
			canvas.style.width = (_this.cellSize * _this.cols)+'px'
			canvas.style.height = (_this.cellSize * _this.rows)+'px'
		}
		// Create the cells with unique id
		function initCells() {
			var id = 0

			for (let i = 0; i < _this.rows; i++) {

				for (let i = 0; i < _this.cols; i++) {

					var cell = document.createElement("cell")
					cell.innerHTML =
						`<button id="${id++}" class="btn" style="width:${_this.cellSize}px; height:${_this.cellSize}px "/>`

					document.getElementById('app').appendChild(cell)

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

				mined.classList.add('mined')

				// Temp (For devs visualizacion)

				mined.style.opacity = '.9';

			}
		}
		// Event Listeners
		function eventListeners() {
			_this.buttons = Array.from(document.getElementsByClassName('btn'))
			console.log(_this.buttons)
			_this.buttons.forEach(
				function eventListeners(button) {
					button.addEventListener('click', onClick)
					button.addEventListener('contextmenu', rightClick, false)
				}
			)
			function onClick() {
				if (this.classList.contains('mined')) {
					_this.endGame(this);
				} else {
					this.classList.add('open')
				}
			}
			function rightClick(ev) {
				 // ev.preventDefault();
				console.log('ok right click')
			    return false;
			}
		}



		initCanvas();
		initCells();
		initMines();
		eventListeners();

	}
	endGame(btn) {
		var _this = this;

		btn.classList.add('boom');
		btn.style.backgroundColor = 'red'
		for (var i=0; i < _this.buttons.length; i++) {
		    if (_this.buttons[i].classList.contains('mined')) {
		    	_this.buttons[i].classList.add('boom')
		    } else {
		    	_this.buttons[i].classList.add('open')
		    };
		}

		setTimeout(function () {

			alert('Perdiste :(')
			_this.resetGame()
		}, 200);
	}
	resetGame() {
		document.location.href=""
	}

}
let buscaminas = new Game()

buscaminas.init();
