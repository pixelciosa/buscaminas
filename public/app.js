(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _options = require('./options.js');

var _options2 = _interopRequireDefault(_options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

					mined.style.opacity = '.7';
				}
				console.log('this.minesLocations ' + ctx.minesLocations);
				console.log('minesLocations ' + minesLocations);
				return minesLocations;
			}
			// Event Listeners
			function eventListeners() {
				var ctx = _this;

				_this.buttons = Array.from(document.getElementsByClassName('btn'));
				console.log(_this.buttons);
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
				console.log('flags ' + ctx.flags.length);
				console.log('minesLocations ' + ctx.minesLocations.length);
				console.log('deactivated ' + ctx.deactivated.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0FBOzs7Ozs7OztJQUVxQixJO0FBQ3BCLGVBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixLQUF4QixFQUErQjtBQUFBOztBQUM5QixPQUFLLElBQUwsR0FBWSxrQkFBUSxJQUFSLElBQWdCLEVBQTVCO0FBQ0EsT0FBSyxJQUFMLEdBQVksa0JBQVEsSUFBUixJQUFnQixFQUE1QjtBQUNBLE9BQUssS0FBTCxHQUFhLGtCQUFRLEtBQVIsSUFBaUIsRUFBOUI7QUFDQSxPQUFLLFFBQUwsR0FBZ0Isa0JBQVEsUUFBUixJQUFvQixFQUFwQztBQUNBLE9BQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxPQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsT0FBSyxjQUFMLEdBQXNCLEVBQXRCO0FBQ0EsT0FBSyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0EsT0FBSyxLQUFMLEdBQWEsRUFBYjtBQUNBOzs7O3lCQUNNO0FBQ04sT0FBSSxRQUFRLElBQVo7QUFDQSxPQUFNLFNBQVMsU0FBUyxjQUFULENBQXdCLFdBQXhCLENBQWY7QUFDQTtBQUNBLFlBQVMsVUFBVCxHQUFzQjtBQUNyQixXQUFPLEtBQVAsQ0FBYSxLQUFiLEdBQXNCLE1BQU0sUUFBTixHQUFpQixNQUFNLElBQXhCLEdBQThCLElBQW5EO0FBQ0EsV0FBTyxLQUFQLENBQWEsTUFBYixHQUF1QixNQUFNLFFBQU4sR0FBaUIsTUFBTSxJQUF4QixHQUE4QixJQUFwRDtBQUNBO0FBQ0Q7QUFDQSxZQUFTLFNBQVQsR0FBcUI7QUFDcEIsUUFBSSxLQUFLLENBQVQ7O0FBRUEsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLE1BQU0sSUFBMUIsRUFBZ0MsR0FBaEMsRUFBcUM7O0FBRXBDLFVBQUssSUFBSSxLQUFJLENBQWIsRUFBZ0IsS0FBSSxN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WUFBTSxhQUFOO0FBQ0E7QUFDQyxNQUpELEVBSUcsR0FKSDtBQU1BO0FBQ0Q7QUFDRCxPQUFJLElBQUksU0FBSixDQUFjLFFBQWQsQ0FBdUIsT0FBdkIsQ0FBSixFQUFxQztBQUNwQyxRQUFJLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBcUIsSUFBSSxFQUF6QjtBQUNBO0FBQ0E7QUFDRDs7Ozs7O2tCQS9KbUIsSTs7QUFpS3JCLElBQU0sYUFBYSxJQUFJLElBQUosRUFBbkI7O0FBRUEsV0FBVyxJQUFYOzs7QUNyS0E7O0FBRUEsSUFBSSxVQUFVO0FBQ2IsT0FBTSxFQURPO0FBRWIsT0FBTSxFQUZPO0FBR2IsUUFBTyxDQUhNO0FBSWIsV0FBVTtBQUpHLENBQWQ7O0FBT0EsT0FBTyxPQUFQLEdBQWUsT0FBZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lIHtcblx0Y29uc3RydWN0b3IoY29scywgcm93cywgbWluZXMpIHtcblx0XHR0aGlzLmNvbHMgPSBvcHRpb25zLmNvbHMgfHwgMTBcblx0XHR0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTBcblx0XHR0aGlzLm1pbmVzID0gb3B0aW9ucy5taW5lcyB8fCAxMFxuXHRcdHRoaXMuY2VsbFNpemUgPSBvcHRpb25zLmNlbGxTaXplIHx8IDIwXG5cdFx0dGhpcy5pc092ZXIgPSBmYWxzZVxuXHRcdHRoaXMuYnV0dG9ucyA9IFtdXG5cdFx0dGhpcy5taW5lc0xvY2F0aW9ucyA9IFtdXG5cdFx0dGhpcy5kZWFjdGl2YXRlZCA9IFtdXG5cdFx0dGhpcy5mbGFncyA9IFtdXG5cdH1cblx0aW5pdCgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5lRmllbGQnKVxuXHRcdC8vIFNldCB0aGUgZ3JpZCBjb250YWluZXJcblx0XHRmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuXHRcdFx0Y2FudmFzLnN0eWxlLndpZHRoID0gKF90aGlzLmNlbGxTaXplICogX3RoaXMuY29scykrJ3B4J1xuXHRcdFx0Y2FudmFzLnN0eWxlLmhlaWdodCA9IChfdGhpcy5jZWxsU2l6ZSAqIF90aGlzLnJvd3MpKydweCdcblx0XHR9XG5cdFx0Ly8gQ3JlYXRlIHRoZSBjZWxscyB3aXRoIHVuaXF1ZSBpZFxuXHRcdGZ1bmN0aW9uIGluaXRDZWxscygpIHtcblx0XHRcdHZhciBpZCA9IDBcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBfdGhpcy5yb3dzOyBpKyspIHtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLmNvbHM7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2VsbFwiKVxuXHRcdFx0XHRcdGNlbGwuaW5uZXJIVE1MID1cblx0XHRcdFx0XHRcdGA8YnV0dG9uIGlkPVwiJHtpZCsrfVwiIGNsYXNzPVwiYnRuXCIgc3R5bGU9XCJ3aWR0aDoke190aGlzLmNlbGxTaXplfXB4OyBoZWlnaHQ6JHtfdGhpcy5jZWxsU2l6ZX1weCBcIi8+YFxuXG5cdFx0XHRcdFx0Y2FudmFzLmFwcGVuZENoaWxkKGNlbGwpXG5cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fVxuXHRcdC8vIFB1dCBtaW5lcyBpbiByYW5kb20gY2VsbHNcblx0XHRmdW5jdGlvbiBpbml0TWluZXMoKSB7XG5cdFx0XHR2YXIgY3R4ID0gX3RoaXM7XG5cdFx0XHRmdW5jdGlvbiBzaHVmZmxlKGFycmF5KSB7XG5cdFx0XHRcdHZhciBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGgsIHRlbXBvcmFyeVZhbHVlLCByYW5kb21JbmRleDtcblxuXHRcdFx0XHR3aGlsZSAoMCAhPT0gY3VycmVudEluZGV4KSB7XG5cblx0XHRcdFx0XHRyYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGN1cnJlbnRJbmRleCk7XG5cdFx0XHRcdFx0Y3VycmVudEluZGV4IC09IDE7XG5cblx0XHRcdFx0XHR0ZW1wb3JhcnlWYWx1ZSA9IGFycmF5W2N1cnJlbnRJbmRleF07XG5cdFx0XHRcdFx0YXJyYXlbY3VycmVudEluZGV4XSA9IGFycmF5W3JhbmRvbUluZGV4XTtcblx0XHRcdFx0XHRhcnJheVtyYW5kb21JbmRleF0gPSB0ZW1wb3JhcnlWYWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBhcnJheTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIGNlbGxzID0gQXJyYXkuYXBwbHkobnVsbCwge2xlbmd0aDogKF90aGlzLnJvd3MgKiBfdGhpcy5jb2xzKX0pLm1hcChOdW1iZXIuY2FsbCwgTnVtYmVyKTtcblx0XHRcdHNodWZmbGUoY2VsbHMpO1xuXG5cdFx0XHR2YXIgbWluZXNMb2NhdGlvbnMgPSBjZWxscy5zcGxpY2UoMCwgX3RoaXMubWluZXMpO1xuXHRcdFx0Y3R4Lm1pbmVzTG9jYXRpb25zID0gbWluZXNMb2NhdGlvbnM7XG5cblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtaW5lc0xvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtaW5lc0xvY2F0aW9uc1tpXSk7XG5cblx0XHRcdFx0bWluZWQuY2xhc3NMaXN0LmFkZCgnbWluZWQnKTtcblxuXHRcdFx0XHQvLyBUZW1wIChGb3IgZGV2cyB2aXN1YWxpemFjaW9uKVxuXG5cdFx0XHRcdG1pbmVkLnN0eWxlLm9wYWNpdHkgPSAnLjcnO1xuXG5cdFx0XHR9XG5cdFx0XHRjb25zb2xlLmxvZygndGhpcy5taW5lc0xvY2F0aW9ucyAnICsgY3R4Lm1pbmVzTG9jYXRpb25zKTtcblx0XHRcdGNvbnNvbGUubG9nKCdtaW5lc0xvY2F0aW9ucyAnICsgbWluZXNMb2NhdGlvbnMpO1xuXHRcdFx0cmV0dXJuIG1pbmVzTG9jYXRpb25zO1xuXG5cdFx0fVxuXHRcdC8vIEV2ZW50IExpc3RlbmVyc1xuXHRcdGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKCkge1xuXHRcdFx0dmFyIGN0eCA9IF90aGlzO1xuXG5cdFx0XHRfdGhpcy5idXR0b25zID0gQXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidG4nKSlcblx0XHRcdGNvbnNvbGUubG9nKF90aGlzLmJ1dHRvbnMpXG5cdFx0XHRfdGhpcy5idXR0b25zLmZvckVhY2goXG5cdFx0XHRcdGZ1bmN0aW9uIGV2ZW50TGlzdGVuZXJzKGJ1dHRvbikge1xuXHRcdFx0XHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuXHRcdFx0XHRcdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjb250ZXh0bWVudScsIHJpZ2h0Q2xpY2ssIGZhbHNlKTtcblx0XHRcdFx0fVxuXHRcdFx0KVxuXHRcdFx0ZnVuY3Rpb24gb25DbGljaygpIHtcblx0XHRcdFx0aWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW5lZCcpKSB7XG5cdFx0XHRcdFx0X3RoaXMubG9vc2VHYW1lKHRoaXMpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRoaXMuY2xhc3NMaXN0LmFkZCgnb3BlbicpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRmdW5jdGlvbiByaWdodENsaWNrKGV2KSB7XG5cblx0XHRcdFx0ZXYucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2ZsYWcnKSl7XG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdmbGFnJyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKCdmbGFnJyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0X3RoaXMud2luR2FtZSh0aGlzKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBpbml0IGV4ZWN1dGlvbnNcblx0XHRpbml0Q2FudmFzKCk7XG5cdFx0aW5pdENlbGxzKCk7XG5cdFx0aW5pdE1pbmVzKCk7XG5cdFx0ZXZlbnRMaXN0ZW5lcnMoKTtcblxuXHR9XG5cdGxvb3NlR2FtZShidG4pIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXG5cdFx0YnRuLmNsYXNzTGlzdC5hZGQoJ2Jvb20nKTtcblx0XHRidG4uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJ3JlZCdcblx0XHRmb3IgKHZhciBpPTA7IGkgPCBfdGhpcy5idXR0b25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0ICAgIGlmIChfdGhpcy5idXR0b25zW2ldLmNsYXNzTGlzdC5jb250YWlucygnbWluZWQnKSkge1xuXHRcdCAgICBcdF90aGlzLmJ1dHRvbnNbaV0uY2xhc3NMaXN0LmFkZCgnYm9vbScpXG5cdFx0ICAgIH0gZWxzZSB7XG5cdFx0ICAgIFx0X3RoaXMuYnV0dG9uc1tpXS5jbGFzc0xpc3QuYWRkKCdvcGVuJylcblx0XHQgICAgfTtcblx0XHR9XG5cblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0YWxlcnQoJ1BlcmRpc3RlIDooICcpXG5cdFx0XHRyZXN0YXJ0R2FtZSgpXG5cdFx0fSwgMjAwKTtcblx0fVxuXHR3aW5HYW1lKGJ0bikge1xuXHRcdHZhciBjdHggPSB0aGlzO1xuXG5cdFx0ZnVuY3Rpb24gY2hlY2soKSB7XG5cdFx0XHRjdHguZmxhZ3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZsYWcnKSlcblx0XHRcdGNvbnNvbGUubG9nKCdmbGFncyAnICsgY3R4LmZsYWdzLmxlbmd0aClcblx0XHRcdGNvbnNvbGUubG9nKCdtaW5lc0xvY2F0aW9ucyAnICsgY3R4Lm1pbmVzTG9jYXRpb25zLmxlbmd0aClcblx0XHRcdGNvbnNvbGUubG9nKCdkZWFjdGl2YXRlZCAnICsgY3R4LmRlYWN0aXZhdGVkLmxlbmd0aClcblx0XHRcdGlmIChjdHgubWluZXNMb2NhdGlvbnMubGVuZ3RoID09IGN0eC5kZWFjdGl2YXRlZC5sZW5ndGggJiYgY3R4Lm1pbmVzTG9jYXRpb25zLmxlbmd0aCA9PSBjdHguZmxhZ3MubGVuZ3RoKSB7XG5cblx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0YWxlcnQoJ0dhbmFzdGUhIDopJylcblx0XHRcdFx0cmVzdGFydEdhbWUoKVxuXHRcdFx0XHR9LCAyMDApO1xuXG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChidG4uY2xhc3NMaXN0LmNvbnRhaW5zKCdtaW5lZCcpKSB7XG5cdFx0XHRjdHguZGVhY3RpdmF0ZWQucHVzaChidG4uaWQpXG5cdFx0fVxuXHRcdFx0Y2hlY2soKVxuXHR9XG59XG5jb25zdCBidXNjYW1pbmFzID0gbmV3IEdhbWUoKVxuXG5idXNjYW1pbmFzLmluaXQoKTtcblxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBvcHRpb25zID0ge1xuXHRyb3dzOiAxMyxcblx0Y29sczogMTAsXG5cdG1pbmVzOiA1LFxuXHRjZWxsU2l6ZTogMzBcbn1cblxubW9kdWxlLmV4cG9ydHM9b3B0aW9uczsiXX0=
