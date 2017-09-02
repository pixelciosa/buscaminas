(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

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
			var canvas = document.getElementById('app');
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

						document.getElementById('app').appendChild(cell);
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
					// ev.preventDefault();
					console.log('ok right click');
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

				alert('Perdiste :(');
				_this.resetGame();
			}, 200);
		}
	}, {
		key: 'resetGame',
		value: function resetGame() {
			document.location.href = "";
		}
	}]);

	return Game;
}();

var buscaminas = new Game();

buscaminas.init();

},{"./options.js":2}],2:[function(require,module,exports){
'use strict';

var options = {
	rows: 13,
	cols: 13,
	mines: 10,
	cellSize: 30
};

module.exports = options;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7SSxBQUVNLG1CQUNMO2VBQUEsQUFBWSxNQUFaLEFBQWtCLE1BQWxCLEFBQXdCLE9BQU87d0JBQzlCOztPQUFBLEFBQUssT0FBTyxrQkFBQSxBQUFRLFFBQXBCLEFBQTRCLEFBQzVCO09BQUEsQUFBSyxPQUFPLGtCQUFBLEFBQVEsUUFBcEIsQUFBNEIsQUFDNUI7T0FBQSxBQUFLLFFBQVEsa0JBQUEsQUFBUSxTQUFyQixBQUE4QixBQUM5QjtPQUFBLEFBQUssV0FBVyxrQkFBQSxBQUFRLFlBQXhCLEFBQW9DLEFBQ3BDO09BQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDtPQUFBLEFBQUssVUFBTCxBQUFlLEFBQ2Y7Ozs7O3lCQUNNLEFBQ047T0FBSSxRQUFKLEFBQVksQUFDWjtPQUFNLFNBQVMsU0FBQSxBQUFTLGVBQXhCLEFBQWUsQUFBd0IsQUFDdkMsQUFDQTs7WUFBQSxBQUFTLGFBQWEsQUFDckI7V0FBQSxBQUFPLE1BQVAsQUFBYSxRQUFTLE1BQUEsQUFBTSxXQUFXLE1BQWxCLEFBQXdCLE9BQTdDLEFBQW1ELEFBQ25EO1dBQUEsQUFBTyxNQUFQLEFBQWEsU0FBVSxNQUFBLEFBQU0sV0FBVyxNQUFsQixBQUF3QixPQUE5QyxBQUFvRCxBQUNwRCxBQUNELEFBQ0E7OztZQUFBLEFBQVMsWUFBWSxBQUNwQjtRQUFJLEtBQUosQUFBUyxBQUVUOztTQUFLLElBQUksSUFBVCxBQUFhLEdBQUcsSUFBSSxNQUFwQixBQUEwQixNQUExQixBQUFnQyxLQUFLLEFBRXBDOztVQUFLLElBQUksS0FBVCxBQUFhLEdBQUcsS0FBSSxNQUFwQixBQUEwQixNQUExQixBQUFnQyxNQUFLLEFBRXBDOztVQUFJLE9BQU8sU0FBQSxBQUFTLGNBQXBCLEFBQVcsQUFBdUIs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LEFBQy9CO1dBQU0sQUFDTjtXQUFBLEFBQU0sUUFBTixBQUFjLEdBQWQsQUFBaUIsVUFBakIsQUFBMkIsSUFBM0IsQUFBK0IsQUFDL0IsQUFDSixBQUVEOzs7O2NBQVcsWUFBWSxBQUV0Qjs7VUFBQSxBQUFNLEFBQ047VUFIRCxBQUdDLEFBQU0sQUFDTjtNQUpELEFBSUcsQUFDSDs7Ozs4QkFDVyxBQUNYO1lBQUEsQUFBUyxTQUFULEFBQWtCLE9BQWxCLEFBQXVCLEFBQ3ZCOzs7Ozs7O0FBR0YsSUFBSSxhQUFhLElBQWpCLEFBQWlCLEFBQUk7O0FBRXJCLFdBQUEsQUFBVzs7O0FDbElYOztBQUVBLElBQUk7T0FBVSxBQUNQLEFBQ047T0FGYSxBQUVQLEFBQ047UUFIYSxBQUdOLEFBQ1A7V0FKRCxBQUFjLEFBQ2IsQUFHVTs7O0FBR1gsT0FBQSxBQUFPLFVBQVAsQUFBZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuXG5jbGFzcyBHYW1lIHtcblx0Y29uc3RydWN0b3IoY29scywgcm93cywgbWluZXMpIHtcblx0XHR0aGlzLmNvbHMgPSBvcHRpb25zLmNvbHMgfHwgMTBcblx0XHR0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTBcblx0XHR0aGlzLm1pbmVzID0gb3B0aW9ucy5taW5lcyB8fCAxMFxuXHRcdHRoaXMuY2VsbFNpemUgPSBvcHRpb25zLmNlbGxTaXplIHx8IDIwXG5cdFx0dGhpcy5pc092ZXIgPSBmYWxzZVxuXHRcdHRoaXMuYnV0dG9ucyA9IFtdXG5cdH1cblx0aW5pdCgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKVxuXHRcdC8vIFNldCB0aGUgZ3JpZCBjb250YWluZXJcblx0XHRmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuXHRcdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gKF90aGlzLmNlbGxTaXplICogX3RoaXMuY29scykrJ3B4J1xuXHRcdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IChfdGhpcy5jZWxsU2l6ZSAqIF90aGlzLnJvd3MpKydweCdcblx0XHR9XG5cdFx0Ly8gQ3JlYXRlIHRoZSBjZWxscyB3aXRoIHVuaXF1ZSBpZFxuXHRcdGZ1bmN0aW9uIGluaXRDZWxscygpIHtcblx0XHRcdHZhciBpZCA9IDBcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBfdGhpcy5yb3dzOyBpKyspIHtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLmNvbHM7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2VsbFwiKVxuXHRcdFx0XHRcdGNlbGwuaW5uZXJIVE1MID1cblx0XHRcdFx0XHRcdGA8YnV0dG9uIGlkPVwiJHtpZCsrfVwiIGNsYXNzPVwiYnRuXCIgc3R5bGU9XCJ3aWR0aDoke190aGlzLmNlbGxTaXplfXB4OyBoZWlnaHQ6JHtfdGhpcy5jZWxsU2l6ZX1weCBcIi8+YFxuXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpLmFwcGVuZENoaWxkKGNlbGwpXG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdC8vIFB1dCBtaW5lcyBpbiByYW5kb20gY2VsbHNcblx0XHRmdW5jdGlvbiBpbml0TWluZXMoKSB7XG5cblx0XHRcdGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXG5cdFx0XHRcdHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblxuXHRcdFx0XHRcdHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcblx0XHRcdFx0XHRjdXJyZW50SW5kZXggLT0gMTtcblxuXHRcdFx0XHRcdHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0XHRcdFx0XHRhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuXHRcdFx0XHRcdGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY2VsbHMgPSBBcnJheS5hcHBseShudWxsLCB7bGVuZ3RoOiAoX3RoaXMucm93cyAqIF90aGlzLmNvbHMpfSkubWFwKE51bWJlci5jYWxsLCBOdW1iZXIpXG5cdFx0XHRzaHVmZmxlKGNlbGxzKTtcblxuXHRcdFx0dmFyIG1pbmVzTG9jYXRpb25zID0gY2VsbHMuc3BsaWNlKDAsIF90aGlzLm1pbmVzKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtaW5lc0xvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtaW5lc0xvY2F0aW9uc1tpXSlcblxuXHRcdFx0XHRtaW5lZC5jbGFzc0xpc3QuYWRkKCdtaW5lZCcpXG5cblx0XHRcdFx0Ly8gVGVtcCAoRm9yIGRldnMgdmlzdWFsaXphY2lvbilcblxuXHRcdFx0XHRtaW5lZC5zdHlsZS5vcGFjaXR5ID0gJy45JztcblxuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBFdmVudCBMaXN0ZW5lcnNcblx0XHRmdW5jdGlvbiBldmVudExpc3RlbmVycygpIHtcblx0XHRcdF90aGlzLmJ1dHRvbnMgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J0bicpKVxuXHRcdFx0Y29uc29sZS5sb2coX3RoaXMuYnV0dG9ucylcblx0XHRcdF90aGlzLmJ1dHRvbnMuZm9yRWFjaChcblx0XHRcdFx0ZnVuY3Rpb24gZXZlbnRMaXN0ZW5lcnMoYnV0dG9uKSB7XG5cdFx0XHRcdFx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljaylcblx0XHRcdFx0XHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY29udGV4dG1lbnUnLCByaWdodENsaWNrLCBmYWxzZSlcblx0XHRcdFx0fVxuXHRcdFx0KVxuXHRcdFx0ZnVuY3Rpb24gb25DbGljaygpIHtcblx0XHRcdFx0aWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW5lZCcpKSB7XG5cdFx0XHRcdFx0X3RoaXMuZW5kR2FtZSh0aGlzKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoJ29wZW4nKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiByaWdodENsaWNrKGV2KSB7XG5cdFx0XHRcdCAvLyBldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRjb25zb2xlLmxvZygnb2sgcmlnaHQgY2xpY2snKVxuXHRcdFx0ICAgIHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblxuXG5cdFx0aW5pdENhbnZhcygpO1xuXHRcdGluaXRDZWxscygpO1xuXHRcdGluaXRNaW5lcygpO1xuXHRcdGV2ZW50TGlzdGVuZXJzKCk7XG5cblx0fVxuXHRlbmRHYW1lKGJ0bikge1xuXHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0XHRidG4uY2xhc3NMaXN0LmFkZCgnYm9vbScpO1xuXHRcdGJ0bi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJ1xuXHRcdGZvciAodmFyIGk9MDsgaSA8IF90aGlzLmJ1dHRvbnMubGVuZ3RoOyBpKyspIHtcblx0XHQgICAgaWYgKF90aGlzLmJ1dHRvbnNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW5lZCcpKSB7XG5cdFx0ICAgIFx0X3RoaXMuYnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCdib29tJylcblx0XHQgICAgfSBlbHNlIHtcblx0XHQgICAgXHRfdGhpcy5idXR0b25zW2ldLmNsYXNzTGlzdC5hZGQoJ29wZW4nKVxuXHRcdCAgICB9O1xuXHRcdH1cblxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRhbGVydCgnUGVyZGlzdGUgOignKVxuXHRcdFx0X3RoaXMucmVzZXRHYW1lKClcblx0XHR9LCAyMDApO1xuXHR9XG5cdHJlc2V0R2FtZSgpIHtcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmPVwiXCJcblx0fVxuXG59XG5sZXQgYnVzY2FtaW5hcyA9IG5ldyBHYW1lKClcblxuYnVzY2FtaW5hcy5pbml0KCk7XG4iLCIndXNlIHN0cmljdCdcblxudmFyIG9wdGlvbnMgPSB7XG5cdHJvd3M6IDEzLFxuXHRjb2xzOiAxMyxcblx0bWluZXM6IDEwLFxuXHRjZWxsU2l6ZTogMzBcbn1cblxubW9kdWxlLmV4cG9ydHM9b3B0aW9uczsiXX0=
