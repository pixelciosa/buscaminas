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

				for (var i = 0; i < minesLocations.length; i++) {
					var mined = document.getElementById(minesLocations[i]);

					mined.classList.add('mined');

					// Temp (For devs visualizacion)

					mined.style.opacity = '.9';
				}
			}
			// Event Listeners
			function eventListeners() {
				_this.buttons = Array.from(document.getElementsByClassName('btn'));
				console.log(_this.buttons);
				_this.buttons.forEach(function eventListeners(button) {
					button.addEventListener('click', onClick);
					button.addEventListener('contextmenu', rightClick, false);
				});
				function onClick() {
					if (this.classList.contains('mined')) {
						_this.endGame(this);
					} else {
						this.classList.add('open');
					}
				}
				function rightClick(ev) {
					ev.preventDefault();
					this.classList.add('flag');
					return false;
				}
			}

			initCanvas();
			initCells();
			initMines();
			eventListeners();
		}
	}, {
		key: 'endGame',
		value: function endGame(btn) {
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
				resetGame();
			}, 200);
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
	mines: 20,
	cellSize: 30
};

module.exports = options;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7Ozs7O0ksQUFFcUIsbUJBQ3BCO2VBQUEsQUFBWSxNQUFaLEFBQWtCLE1BQWxCLEFBQXdCLE9BQU87d0JBQzlCOztPQUFBLEFBQUssT0FBTyxrQkFBQSxBQUFRLFFBQXBCLEFBQTRCLEFBQzVCO09BQUEsQUFBSyxPQUFPLGtCQUFBLEFBQVEsUUFBcEIsQUFBNEIsQUFDNUI7T0FBQSxBQUFLLFFBQVEsa0JBQUEsQUFBUSxTQUFyQixBQUE4QixBQUM5QjtPQUFBLEFBQUssV0FBVyxrQkFBQSxBQUFRLFlBQXhCLEFBQW9DLEFBQ3BDO09BQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDtPQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2Y7Ozs7O3lCQUNNLEFBQ047T0FBSSxRQUFKLEFBQVksQUFDWjtPQUFNLFNBQVMsU0FBQSxBQUFTLGVBQXhCLEFBQWUsQUFBd0IsQUFDdkMsQUFDQTs7WUFBQSxBQUFTLGFBQWEsQUFDckI7V0FBQSxBQUFPLE1BQVAsQUFBYSxRQUFTLE1BQUEsQUFBTSxXQUFXLE1BQWxCLEFBQXdCLE9BQTdDLEFBQW1ELEFBQ25EO1dBQUEsQUFBTyxNQUFQLEFBQWEsU0FBVSxNQUFBLEFBQU0sV0FBVyxNQUFsQixBQUF3QixPQUE5QyxBQUFvRCxBQUNwRCxBQUNELEFBQ0E7OztZQUFBLEFBQVMsWUFBWSxBQUNwQjtRQUFJLEtBQUosQUFBUyxBQUVUOztTQUFLLElBQUksSUFBVCxBQUFhLEdBQUcsSUFBSSxNQUFwQixBQUEwQixNQUExQixBQUFnQyxLQUFLLEFBRXBDOztVQUFLLElBQUksS0FBVCxBQUFhLEdBQUcsS0FBSSxNQUFwQixBQUEwQixNQUExQixBQUFnQyxNQUFLLEFBRXBDOztVQUFJLE9BQU8sU0FBQSxBQUFTLGNBQXBCLEFBQVcs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QStCLEFBQy9CO1dBQU0sQUFDTjtXQUFBLEFBQU0sUUFBTixBQUFjLEdBQWQsQUFBaUIsVUFBakIsQUFBMkIsSUFBM0IsQUFBK0IsQUFDL0IsQUFDSixBQUVEOzs7O2NBQVcsWUFBWSxBQUV0Qjs7VUFGRCxBQUVDLEFBQU0sQUFDTixBQUNBOztNQUpELEFBSUcsQUFDSDs7Ozs7OztrQixBQXhIbUI7O0FBNEhyQixJQUFNLGFBQWEsSUFBbkIsQUFBbUIsQUFBSTs7QUFFdkIsV0FBQSxBQUFXOzs7QUNoSVg7O0FBRUEsSUFBSTtPQUFVLEFBQ1AsQUFDTjtPQUZhLEFBRVAsQUFDTjtRQUhhLEFBR04sQUFDUDtXQUpELEFBQWMsQUFDYixBQUdVOzs7QUFHWCxPQUFBLEFBQU8sVUFBUCxBQUFlIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBvcHRpb25zIGZyb20gJy4vb3B0aW9ucy5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWUge1xuXHRjb25zdHJ1Y3Rvcihjb2xzLCByb3dzLCBtaW5lcykge1xuXHRcdHRoaXMuY29scyA9IG9wdGlvbnMuY29scyB8fCAxMFxuXHRcdHRoaXMucm93cyA9IG9wdGlvbnMucm93cyB8fCAxMFxuXHRcdHRoaXMubWluZXMgPSBvcHRpb25zLm1pbmVzIHx8IDEwXG5cdFx0dGhpcy5jZWxsU2l6ZSA9IG9wdGlvbnMuY2VsbFNpemUgfHwgMjBcblx0XHR0aGlzLmlzT3ZlciA9IGZhbHNlXG5cdFx0dGhpcy5idXR0b25zID0gW11cblx0fVxuXHRpbml0KCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21pbmVGaWVsZCcpXG5cdFx0Ly8gU2V0IHRoZSBncmlkIGNvbnRhaW5lclxuXHRcdGZ1bmN0aW9uIGluaXRDYW52YXMoKSB7XG5cdFx0XHRjYW52YXMuc3R5bGUud2lkdGggPSAoX3RoaXMuY2VsbFNpemUgKiBfdGhpcy5jb2xzKSsncHgnXG5cdFx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gKF90aGlzLmNlbGxTaXplICogX3RoaXMucm93cykrJ3B4J1xuXHRcdH1cblx0XHQvLyBDcmVhdGUgdGhlIGNlbGxzIHdpdGggdW5pcXVlIGlkXG5cdFx0ZnVuY3Rpb24gaW5pdENlbGxzKCkge1xuXHRcdFx0dmFyIGlkID0gMFxuXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLnJvd3M7IGkrKykge1xuXG5cdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgX3RoaXMuY29sczsgaSsrKSB7XG5cblx0XHRcdFx0XHR2YXIgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjZWxsXCIpXG5cdFx0XHRcdFx0Y2VsbC5pbm5lckhUTUwgPVxuXHRcdFx0XHRcdFx0YDxidXR0b24gaWQ9XCIke2lkKyt9XCIgY2xhc3M9XCJidG5cIiBzdHlsZT1cIndpZHRoOiR7X3RoaXMuY2VsbFNpemV9cHg7IGhlaWdodDoke190aGlzLmNlbGxTaXplfXB4IFwiLz5gXG5cblx0XHRcdFx0XHRjYW52YXMuYXBwZW5kQ2hpbGQoY2VsbClcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9XG5cdFx0Ly8gUHV0IG1pbmVzIGluIHJhbmRvbSBjZWxsc1xuXHRcdGZ1bmN0aW9uIGluaXRNaW5lcygpIHtcblxuXHRcdFx0ZnVuY3Rpb24gc2h1ZmZsZShhcnJheSkge1xuXHRcdFx0XHR2YXIgY3VycmVudEluZGV4ID0gYXJyYXkubGVuZ3RoLCB0ZW1wb3JhcnlWYWx1ZSwgcmFuZG9tSW5kZXg7XG5cblx0XHRcdFx0d2hpbGUgKDAgIT09IGN1cnJlbnRJbmRleCkge1xuXG5cdFx0XHRcdFx0cmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuXHRcdFx0XHRcdGN1cnJlbnRJbmRleCAtPSAxO1xuXG5cdFx0XHRcdFx0dGVtcG9yYXJ5VmFsdWUgPSBhcnJheVtjdXJyZW50SW5kZXhdO1xuXHRcdFx0XHRcdGFycmF5W2N1cnJlbnRJbmRleF0gPSBhcnJheVtyYW5kb21JbmRleF07XG5cdFx0XHRcdFx0YXJyYXlbcmFuZG9tSW5kZXhdID0gdGVtcG9yYXJ5VmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gYXJyYXk7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBjZWxscyA9IEFycmF5LmFwcGx5KG51bGwsIHtsZW5ndGg6IChfdGhpcy5yb3dzICogX3RoaXMuY29scyl9KS5tYXAoTnVtYmVyLmNhbGwsIE51bWJlcik7XG5cdFx0XHRzaHVmZmxlKGNlbGxzKTtcblxuXHRcdFx0dmFyIG1pbmVzTG9jYXRpb25zID0gY2VsbHMuc3BsaWNlKDAsIF90aGlzLm1pbmVzKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtaW5lc0xvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtaW5lc0xvY2F0aW9uc1tpXSk7XG5cblx0XHRcdFx0bWluZWQuY2xhc3NMaXN0LmFkZCgnbWluZWQnKTtcblxuXHRcdFx0XHQvLyBUZW1wIChGb3IgZGV2cyB2aXN1YWxpemFjaW9uKVxuXG5cdFx0XHRcdG1pbmVkLnN0eWxlLm9wYWNpdHkgPSAnLjknO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIEV2ZW50IExpc3RlbmVyc1xuXHRcdGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCkge1xuXHRcdFx0X3RoaXMuYnV0dG9ucyA9IEFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYnRuJykpXG5cdFx0XHRjb25zb2xlLmxvZyhfdGhpcy5idXR0b25zKVxuXHRcdFx0X3RoaXMuYnV0dG9ucy5mb3JFYWNoKFxuXHRcdFx0XHRmdW5jdGlvbiBldmVudExpc3RlbmVycyhidXR0b24pIHtcblx0XHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkNsaWNrKTtcblx0XHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCByaWdodENsaWNrLCBmYWxzZSk7XG5cdFx0XHRcdH1cblx0XHRcdClcblx0XHRcdGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG5cdFx0XHRcdGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucygnbWluZWQnKSkge1xuXHRcdFx0XHRcdF90aGlzLmVuZEdhbWUodGhpcyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGZ1bmN0aW9uIHJpZ2h0Q2xpY2soZXYpIHtcblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdmbGFnJyk7XG5cdFx0XHQgICAgcmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXG5cblx0XHRpbml0Q2FudmFzKCk7XG5cdFx0aW5pdENlbGxzKCk7XG5cdFx0aW5pdE1pbmVzKCk7XG5cdFx0ZXZlbnRMaXN0ZW5lcnMoKTtcblxuXHR9XG5cdGVuZEdhbWUoYnRuKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdGJ0bi5jbGFzc0xpc3QuYWRkKCdib29tJyk7XG5cdFx0YnRuLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnXG5cdFx0Zm9yICh2YXIgaT0wOyBpIDwgX3RoaXMuYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuXHRcdCAgICBpZiAoX3RoaXMuYnV0dG9uc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ21pbmVkJykpIHtcblx0XHQgICAgXHRfdGhpcy5idXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ2Jvb20nKVxuXHRcdCAgICB9IGVsc2Uge1xuXHRcdCAgICBcdF90aGlzLmJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnb3BlbicpXG5cdFx0ICAgIH07XG5cdFx0fVxuXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdGFsZXJ0KCdQZXJkaXN0ZSA6KCAnKVxuXHRcdFx0cmVzZXRHYW1lKClcblx0XHR9LCAyMDApO1xuXHR9XG5cblxufVxuY29uc3QgYnVzY2FtaW5hcyA9IG5ldyBHYW1lKClcblxuYnVzY2FtaW5hcy5pbml0KCk7XG5cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgb3B0aW9ucyA9IHtcblx0cm93czogMTMsXG5cdGNvbHM6IDEwLFxuXHRtaW5lczogMjAsXG5cdGNlbGxTaXplOiAzMFxufVxuXG5tb2R1bGUuZXhwb3J0cz1vcHRpb25zOyJdfQ==
