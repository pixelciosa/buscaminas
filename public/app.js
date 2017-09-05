(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () {
	function defineProperties(target, props) {
		for (var i = 0; i < props.length; i++) {
			var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
		}
	}return function (Constructor, protoProps, staticProps) {
		if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	};
}();

var _options = require('./options.js');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

var Game = function () {
	function Game(cols, rows, mines) {
		_classCallCheck(this, Game);

		this.cols = _options2.default.cols || 10;
		this.rows = _options2.default.rows || 10;
		this.mines = _options2.default.mines || 10;
		this.cellSize = _options2.default.cellSize || 20;
		this.isOver = false;
		this.buttons = [];
		this.minesLocations = [];
		this.deactivated = [];
		this.flags = [];
	}

	_createClass(Game, [{
		key: 'init',
		value: function init() {
			var _this = this;
			var canvas = document.getElementById('mineField');
			// Set the grid container
			function initCanvas() {
				canvas.style.width = _this.cellSize * _this.cols + 'px';
				canvas.style.height = _this.cellSize * _this.rows + 'px';
			}
			// Create the cells with unique id
			function initCells() {
				var id = 0;

				for (var i = 0; i < _this.rows; i++) {

					for (var _i = 0; _i < _this.cols; _i++) {

						var cell = document.createElement("cell");
						cell.innerHTML = '<button id="' + id++ + '" class="btn" style="width:' + _this.cellSize + 'px; height:' + _this.cellSize + 'px "/>';

						canvas.appendChild(cell);
					}
				}
			}
			// Put mines in random cells
			function initMines() {
				var ctx = _this;
				function shuffle(array) {
					var currentIndex = array.length,
					    temporaryValue,
					    randomIndex;

					while (0 !== currentIndex) {

						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;

						temporaryValue = array[currentIndex];
						array[currentIndex] = array[randomIndex];
						array[randomIndex] = temporaryValue;
					}

					return array;
				}

				var cells = Array.apply(null, { length: _this.rows * _this.cols }).map(Number.call, Number);
				shuffle(cells);

				var minesLocations = cells.splice(0, _this.mines);
				ctx.minesLocations = minesLocations;

				for (var i = 0; i < minesLocations.length; i++) {
					var mined = document.getElementById(minesLocations[i]);

					mined.classList.add('mined');

					// Temp (For devs visualizacion)

					mined.style.opacity = '.8';
				}
				return minesLocations;
			}
			// Event Listeners
			function eventListeners() {
				var ctx = _this;

				_this.buttons = Array.from(document.getElementsByClassName('btn'));
				_this.buttons.forEach(function eventListeners(button) {
					button.addEventListener('click', onClick);
					button.addEventListener('contextmenu', rightClick, false);
				});
				function onClick() {
					if (this.classList.contains('mined')) {
						_this.looseGame(this);
					} else {
						this.classList.add('open');
					}
				}
				function rightClick(ev) {

					ev.preventDefault();

					if (this.classList.contains('flag')) {
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
	}, {
		key: 'looseGame',
		value: function looseGame(btn) {
			var _this = this;

			btn.classList.add('boom');
			btn.style.backgroundColor = 'red';
			for (var i = 0; i < _this.buttons.length; i++) {
				if (_this.buttons[i].classList.contains('mined')) {
					_this.buttons[i].classList.add('boom');
				} else {
					_this.buttons[i].classList.add('open');
				};
			}

			setTimeout(function () {

				alert('Perdiste :( ');
				restartGame();
			}, 200);
		}
	}, {
		key: 'winGame',
		value: function winGame(btn) {
			var ctx = this;

			function check() {
				ctx.flags = Array.from(document.getElementsByClassName('flag'));
				if (ctx.minesLocations.length == ctx.deactivated.length && ctx.minesLocations.length == ctx.flags.length) {

					setTimeout(function () {

						alert('Ganaste! :)');
						restartGame();
					}, 200);
				}
			}
			if (btn.classList.contains('mined')) {
				ctx.deactivated.push(btn.id);
			}
			check();
		}
	}]);

	return Game;
}();

exports.default = Game;

var buscaminas = new Game();

buscaminas.init();

},{"./options.js":2}],2:[function(require,module,exports){
'use strict';

var options = {
	rows: 13,
	cols: 10,
	mines: 5,
	cellSize: 30
};

module.exports = options;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7O0ksQUFFcUIsbUJBQ3BCO2VBQUEsQUFBWSxNQUFaLEFBQWtCLE1BQWxCLEFBQXdCLE9BQU87d0JBQzlCOztPQUFBLEFBQUssT0FBTyxrQkFBQSxBQUFRLFFBQXBCLEFBQTRCLEFBQzVCO09BQUEsQUFBSyxPQUFPLGtCQUFBLEFBQVEsUUFBcEIsQUFBNEIsQUFDNUI7T0FBQSxBQUFLLFFBQVEsa0JBQUEsQUFBUSxTQUFyQixBQUE4QixBQUM5QjtPQUFBLEFBQUssV0FBVyxrQkFBQSxBQUFRLFlBQXhCLEFBQW9DLEFBQ3BDO09BQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDtPQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2Y7T0FBQSxBQUFLLGlCQUFMLEFBQXNCLEFBQ3RCO09BQUEsQUFBSyxjQUFMLEFBQW1CLEFBQ25CO09BQUEsQUFBSyxRQUFMLEFBQWEsQUFDYjs7Ozs7eUJBQ00sQUFDTjtPQUFJLFFBQUosQUFBWSxBQUNaO09BQU0sU0FBUyxTQUFBLEFBQVMsZUFBeEIsQUFBZSxBQUF3QixBQUN2QyxBQUNBOztZQUFBLEFBQVMsYUFBYSxBQUNyQjtXQUFBLEFBQU8sTUFBUCxBQUFhLFFBQVMsTUFBQSxBQUFNLFdBQVcsTUFBbEIsQUFBd0IsT0FBN0MsQUFBbUQsQUFDbkQ7V0FBQSxBQUFPLE1BQVAsQUFBYSxTQUFVLE1BQUEsQUFBTSxXQUFXLE1BQWxCLEFBQXdCLE9BQTlDLEFBQW9ELEFBQ3BELEFBQ0Q7QUFDQTs7WUFBQSxBQUFTLFlBQVksQUFDcEI7UUFBSSxLQUFKLEFBQVMsQUFFVDs7U0FBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksTUFBcEIsQUFBMEIsTUFBMUIsQUFBZ0MsS0FBSyxBQUVwQzs7VUFBSyxJQUFJLEtBQVQsQUFB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L0pYOztBQUVBLElBQUk7T0FBVSxBQUNQLEFBQ047T0FGYSxBQUVQLEFBQ047UUFIYSxBQUdOLEFBQ1A7V0FKRCxBQUFjLEFBQ2IsQUFHVTs7O0FBR1gsT0FBQSxBQUFPLFVBQVAsQUFBZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblx0Y29uc3RydWN0b3IoY29scywgcm93cywgbWluZXMpIHtcblx0XHR0aGlzLmNvbHMgPSBvcHRpb25zLmNvbHMgfHwgMTBcblx0XHR0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTBcblx0XHR0aGlzLm1pbmVzID0gb3B0aW9ucy5taW5lcyB8fCAxMFxuXHRcdHRoaXMuY2VsbFNpemUgPSBvcHRpb25zLmNlbGxTaXplIHx8IDIwXG5cdFx0dGhpcy5pc092ZXIgPSBmYWxzZVxuXHRcdHRoaXMuYnV0dG9ucyA9IFtdXG5cdFx0dGhpcy5taW5lc0xvY2F0aW9ucyA9IFtdXG5cdFx0dGhpcy5kZWFjdGl2YXRlZCA9IFtdXG5cdFx0dGhpcy5mbGFncyA9IFtdXG5cdH1cblx0aW5pdCgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5lRmllbGQnKVxuXHRcdC8vIFNldCB0aGUgZ3JpZCBjb250YWluZXJcblx0XHRmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuXHRcdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gKF90aGlzLmNlbGxTaXplICogX3RoaXMuY29scykrJ3B4J1xuXHRcdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IChfdGhpcy5jZWxsU2l6ZSAqIF90aGlzLnJvd3MpKydweCdcblx0XHR9XG5cdFx0Ly8gQ3JlYXRlIHRoZSBjZWxscyB3aXRoIHVuaXF1ZSBpZFxuXHRcdGZ1bmN0aW9uIGluaXRDZWxscygpIHtcblx0XHRcdHZhciBpZCA9IDBcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBfdGhpcy5yb3dzOyBpKyspIHtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLmNvbHM7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2VsbFwiKVxuXHRcdFx0XHRcdGNlbGwuaW5uZXJIVE1MID1cblx0XHRcdFx0XHRcdGA8YnV0dG9uIGlkPVwiJHtpZCsrfVwiIGNsYXNzPVwiYnRuXCIgc3R5bGU9XCJ3aWR0aDoke190aGlzLmNlbGxTaXplfXB4OyBoZWlnaHQ6JHtfdGhpcy5jZWxsU2l6ZX1weCBcIi8+YFxuXG5cdFx0XHRcdFx0Y2FudmFzLmFwcGVuZENoaWxkKGNlbGwpXG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdC8vIFB1dCBtaW5lcyBpbiByYW5kb20gY2VsbHNcblx0XHRmdW5jdGlvbiBpbml0TWluZXMoKSB7XG5cdFx0XHR2YXIgY3R4ID0gX3RoaXM7XG5cdFx0XHRmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG5cdFx0XHRcdHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblxuXHRcdFx0XHR3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cblx0XHRcdFx0XHRyYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdFx0XHRcdFx0Y3VycmVudEluZGV4IC09IDE7XG5cblx0XHRcdFx0XHR0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG5cdFx0XHRcdFx0YXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcblx0XHRcdFx0XHRhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhcnJheTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNlbGxzID0gQXJyYXkuYXBwbHkobnVsbCwge2xlbmd0aDogKF90aGlzLnJvd3MgKiBfdGhpcy5jb2xzKX0pLm1hcChOdW1iZXIuY2FsbCwgTnVtYmVyKTtcblx0XHRcdHNodWZmbGUoY2VsbHMpO1xuXG5cdFx0XHR2YXIgbWluZXNMb2NhdGlvbnMgPSBjZWxscy5zcGxpY2UoMCwgX3RoaXMubWluZXMpO1xuXHRcdFx0Y3R4Lm1pbmVzTG9jYXRpb25zID0gbWluZXNMb2NhdGlvbnM7XG5cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtaW5lc0xvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtaW5lc0xvY2F0aW9uc1tpXSk7XG5cblx0XHRcdFx0bWluZWQuY2xhc3NMaXN0LmFkZCgnbWluZWQnKTtcblxuXHRcdFx0XHQvLyBUZW1wIChGb3IgZGV2cyB2aXN1YWxpemFjaW9uKVxuXG5cdFx0XHRcdG1pbmVkLnN0eWxlLm9wYWNpdHkgPSAnLjgnO1xuXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbWluZXNMb2NhdGlvbnM7XG5cblx0XHR9XG5cdFx0Ly8gRXZlbnQgTGlzdGVuZXJzXG5cdFx0ZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0XHR2YXIgY3R4ID0gX3RoaXM7XG5cblx0XHRcdF90aGlzLmJ1dHRvbnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bicpKVxuXHRcdFx0X3RoaXMuYnV0dG9ucy5mb3JFYWNoKFxuXHRcdFx0XHRmdW5jdGlvbiBldmVudExpc3RlbmVycyhidXR0b24pIHtcblx0XHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcblx0XHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCByaWdodENsaWNrLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdClcblx0XHRcdGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG5cdFx0XHRcdGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWluZWQnKSkge1xuXHRcdFx0XHRcdF90aGlzLmxvb3NlR2FtZSh0aGlzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZnVuY3Rpb24gcmlnaHRDbGljayhldikge1xuXG5cdFx0XHRcdGV2LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdFx0aWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdmbGFnJykpe1xuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnZmxhZycpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnZmxhZycpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aGlzLndpbkdhbWUodGhpcyk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gaW5pdCBleGVjdXRpb25zXG5cdFx0aW5pdENhbnZhcygpO1xuXHRcdGluaXRDZWxscygpO1xuXHRcdGluaXRNaW5lcygpO1xuXHRcdGV2ZW50TGlzdGVuZXJzKCk7XG5cblx0fVxuXHRsb29zZUdhbWUoYnRuKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdGJ0bi5jbGFzc0xpc3QuYWRkKCdib29tJyk7XG5cdFx0YnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgX3RoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuXHRcdCAgICBpZiAoX3RoaXMuYnV0dG9uc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmVkJykpIHtcblx0XHQgICAgXHRfdGhpcy5idXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2Jvb20nKVxuXHRcdCAgICB9IGVsc2Uge1xuXHRcdCAgICBcdF90aGlzLmJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnb3BlbicpXG5cdFx0ICAgIH07XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGFsZXJ0KCdQZXJkaXN0ZSA6KCAnKVxuXHRcdFx0cmVzdGFydEdhbWUoKVxuXHRcdH0sIDIwMCk7XG5cdH1cblx0d2luR2FtZShidG4pIHtcblx0XHR2YXIgY3R4ID0gdGhpcztcblxuXHRcdGZ1bmN0aW9uIGNoZWNrKCkge1xuXHRcdFx0Y3R4LmZsYWdzID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmbGFnJykpXG5cdFx0XHRpZiAoY3R4Lm1pbmVzTG9jYXRpb25zLmxlbmd0aCA9PSBjdHguZGVhY3RpdmF0ZWQubGVuZ3RoICYmIGN0eC5taW5lc0xvY2F0aW9ucy5sZW5ndGggPT0gY3R4LmZsYWdzLmxlbmd0aCkge1xuXG5cdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdGFsZXJ0KCdHYW5hc3RlISA6KScpXG5cdFx0XHRcdHJlc3RhcnRHYW1lKClcblx0XHRcdFx0fSwgMjAwKTtcblxuXHRcdFx0fVxuXHRcdH1cblx0XHRpZiAoYnRuLmNsYXNzTGlzdC5jb250YWlucygnbWluZWQnKSkge1xuXHRcdFx0Y3R4LmRlYWN0aXZhdGVkLnB1c2goYnRuLmlkKVxuXHRcdH1cblx0XHRcdGNoZWNrKClcblx0fVxufVxuY29uc3QgYnVzY2FtaW5hcyA9IG5ldyBHYW1lKClcblxuYnVzY2FtaW5hcy5pbml0KCk7XG5cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb3B0aW9ucyA9IHtcblx0cm93czogMTMsXG5cdGNvbHM6IDEwLFxuXHRtaW5lczogNSxcblx0Y2VsbFNpemU6IDMwXG59XG5cbm1vZHVsZS5leHBvcnRzPW9wdGlvbnM7Il19
