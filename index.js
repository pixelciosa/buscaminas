import options from './options.js';

export default class Game {
	constructor(cols, rows, mines) {
		this.cols = options.cols || 10
		this.rows = options.rows || 10
		this.mines = options.mines || 10
		this.cellSize = options.cellSize || 20
		this.isOver = false
		this.buttons = []
		this.minesLocations = []
		this.deactivated = []
		this.flags = []
	}
	init() {
		var _this = this;
		const canvas = document.getElementById('mineField')
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

					canvas.appendChild(cell)

				}
			}

		}
		// Put mines in random cells
		function initMines() {
			var ctx = _this;
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

			var cells = Array.apply(null, {length: (_this.rows * _this.cols)}).map(Number.call, Number);
			shuffle(cells);

			var minesLocations = cells.splice(0, _this.mines);
			ctx.minesLocations = minesLocations;


			for (var i = 0; i < minesLocations.length; i++) {
				var mined = document.getElementById(minesLocations[i]);

				mined.classList.add('mined');

				// Temp (For devs visualizacion)

				mined.style.opacity = '.7';

			}
			console.log('this.minesLocations ' + ctx.minesLocations);
			console.log('minesLocations ' + minesLocations);
			return minesLocations;

		}
		// Event Listeners
		function eventListeners() {
			var ctx = _this;

			_this.buttons = Array.from(document.getElementsByClassName('btn'))
			console.log(_this.buttons)
			_this.buttons.forEach(
				function eventListeners(button) {
					button.addEventListener('click', onClick);
					button.addEventListener('contextmenu', rightClick, false);
				}
			)
			function onClick() {
				if (this.classList.contains('mined')) {
					_this.looseGame(this);
				} else {
					this.classList.add('open');
				}
			}
			function rightClick(ev) {

				ev.preventDefault();

				if (this.classList.contains('flag')){
					this.classList.remove('flag');
				} else {
					this.classList.add('flag');
				}
				_this.winGame(this);
			}
		}

		// init executions
		initCanvas();
		initCells();
		initMines();
		eventListeners();

	}
	looseGame(btn) {
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

			alert('Perdiste :( ')
			restartGame()
		}, 200);
	}
	winGame(btn) {
		var ctx = this;

		function check() {
			ctx.flags = Array.from(document.getElementsByClassName('flag'))
			console.log('flags ' + ctx.flags.length)
			console.log('minesLocations ' + ctx.minesLocations.length)
			console.log('deactivated ' + ctx.deactivated.length)
			if (ctx.minesLocations.length == ctx.deactivated.length && ctx.minesLocations.length == ctx.flags.length) {

				setTimeout(function () {

				alert('Ganaste! :)')
				restartGame()
				}, 200);

			}
		}
		if (btn.classList.contains('mined')) {
			ctx.deactivated.push(btn.id)
		}
			check()
	}
}
const buscaminas = new Game()

buscaminas.init();

