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
	}

	_createClass(Game, [{
		key: 'init',
		value: function init() {
			var _this = this;

			// Set the grid container
			function initCanvas() {
				var canvas = document.getElementById('app');
				canvas.style.width = _this.cellSize * _this.cols + 'px';
				canvas.style.height = _this.cellSize * _this.rows + 'px';
			}
			// Create the cells with unique id
			function initCells() {
				var id = 0;
				for (var i = 0; i < _this.rows; i++) {

					for (var _i = 0; _i < _this.cols; _i++) {

						var cell = document.createElement("button");
						var cell_content = document.createTextNode("o");
						cell.appendChild(cell_content);
						document.getElementById('app').appendChild(cell);
						cell.style.width = _this.cellSize + 'px';
						cell.style.height = _this.cellSize + 'px';
						cell.setAttribute("id", id++);
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

					mined.className = "mined";

					// Temp (For devs visualizacion)

					mined.style.backgroundColor = 'red';
				}
			}

			initCanvas();
			initCells();
			initMines();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm9wdGlvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7Ozs7SSxBQUVNLG1CQUNMO2VBQUEsQUFBWSxNQUFaLEFBQWtCLE1BQWxCLEFBQXdCLE9BQU87d0JBQzlCOztPQUFBLEFBQUssT0FBTyxrQkFBQSxBQUFRLFFBQXBCLEFBQTRCLEFBQzVCO09BQUEsQUFBSyxPQUFPLGtCQUFBLEFBQVEsUUFBcEIsQUFBNEIsQUFDNUI7T0FBQSxBQUFLLFFBQVEsa0JBQUEsQUFBUSxTQUFyQixBQUE4QixBQUM5QjtPQUFBLEFBQUssV0FBVyxrQkFBQSxBQUFRLFlBQXhCLEFBQW9DLEFBQ3BDO09BQUEsQUFBSyxTQUFMLEFBQWMsQUFDZDs7Ozs7eUJBQ00sQUFDTjtPQUFJLFFBQUosQUFBWSxBQUVaLEFBQ0E7OztZQUFBLEFBQVMsYUFBYSxBQUNyQjtRQUFNLFNBQVMsU0FBQSxBQUFTLGVBQXhCLEFBQWUsQUFBd0IsQUFDdkM7V0FBQSxBQUFPLE1BQVAsQUFBYSxRQUFTLE1BQUEsQUFBTSxXQUFXLE1BQWxCLEFBQXdCLE9BQTdDLEFBQW1ELEFBQ25EO1dBQUEsQUFBTyxNQUFQLEFBQWEsU0FBVSxNQUFBLEFBQU0sV0FBVyxNQUFsQixBQUF3QixPQUE5QyxBQUFvRCxBQUNwRCxBQUNELEFBQ0E7OztZQUFBLEFBQVMsWUFBWSxBQUNwQjtRQUFJLEtBQUosQUFBUyxBQUNUO1NBQUssSUFBSSxJQUFULEFBQWEsR0FBRyxJQUFJLE1BQXBCLEFBQTBCLE1BQTFCLEFBQWdDLEtBQUssQUFFcEM7O1VBQUssSUFBSSxLQUFULEFBQWEsR0FBRyxLQUFJLE1BQXBCLEFBQTBCLE1BQTFCLEFBQWdDLE1BQUssQUFFcEM7O1VBQUksT0FBTyxTQUFBLEFBQVMsY0FBcEIsQUFBVyxBQUF1QixBQUNsQztVQUFJLGVBQWUsU0FBQSxBQUFTLGVBQTVCLEFBQW1CLEFBQXdCLEFBQzNDO1dBQUEsQUFBSyxZQUFMLEFBQWlCLEFBQ2pCO2VBQUEsQUFBUyxlQUFULEFBQXdCLE9BQXhCLEFBQStCLFlBQS9CLEFBQTJDLEFBQzNDO1dBQUEsQUFBSyxNQUFMLEFBQVcsUUFBUSxNQUFBLEFBQU0sV0FBekIsQUFBa0MsQUFDbEM7V0FBQSxBQUFLLE1BQUwsQUFBVyxTQUFTLE1BQUEsQUFBTSxXQUExQixBQUFtQyxBQUNuQztXQUFBLEFBQUssYUFBTCxBQUFrQixNQUFsQixBQUF3QixBQUV4QixBQUNELEFBQ0QsQUFDRCxBQUNBOzs7OztZQUFBLEFBQVMsWUFBWSxBQUVwQjs7YUFBQSxBQUFTLFFBQVQsQUFBaUIsT0FBTyxBQUN2QjtTQUFJLGVBQWUsTUFBbkIsQUFBeUI7U0FBekIsQUFBaUM7U0FBakMsQUFBaUQsQUFFakQ7O1lBQU8sTUFBUCxBQUFhLGNBQWMsQUFFMUI7O29CQUFjLEtBQUEsQUFBSyxNQUFNLEtBQUEsQUFBSyxXQUE5QixBQUFjLEFBQTJCLEFBQ3pDO3NCQUFBLEFBQWdCLEFBRWhCOzt1QkFBaUIsTUFBakIsQUFBaUIsQUFBTSxBQUN2QjtZQUFBLEFBQU0sZ0JBQWdCLE1BQXRCLEFBQXNCLEFBQU0sQUFDNUI7WUFBQSxBQUFNLGVBQU4sQUFBcUIsQUFDckIsQUFFRDs7O1lBQUEsQUFBTyxBQUNQLEFBRUQ7OztRQUFJLFFBQVEsTUFBQSxBQUFNLE1BQU4sQUFBWSxNQUFNLEVBQUMsUUFBUyxNQUFBLEFBQU0sT0FBTyxNQUF6QyxBQUFrQixBQUE2QixRQUEvQyxBQUF1RCxJQUFJLE9BQTNELEFBQWtFLE1BQTlFLEFBQVksQUFBd0UsQUFDcEY7WUFBQSxBQUFRLEFBRVI7O1FBQUksaUJBQWlCLE1BQUEsQUFBTSxPQUFOLEFBQWEsR0FBRyxNQUFyQyxBQUFxQixBQUFzQixBQUUzQzs7U0FBSyxJQUFJLElBQVQsQUFBYSxHQUFHLElBQUksZUFBcEIsQUFBbUMsUUFBbkMsQUFBMkMsS0FBSyxBQUMvQztTQUFJLFFBQVEsU0FBQSxBQUFTLGVBQWUsZUFBcEMsQUFBWSxBQUF3QixBQUFlLEFBRW5EOztXQUFBLEFBQU0sWUFBTixBQUFrQixBQUVsQixBQUVBOzs7O1dBQUEsQUFBTSxNQUFOLEFBQVksa0JBQVosQUFBOEIsQUFFOUIsQUFDRCxBQUVELEFBQ0EsQUFDQSxBQUdBOzs7Ozs7Ozs7Ozs7O0FBR0YsSUFBSSxhQUFhLElBQWpCLEFBQWlCLEFBQUk7O0FBRXJCLFdBQUEsQUFBVzs7O0FDbkZYOztBQUVBLElBQUk7T0FBVSxBQUNQLEFBQ047T0FGYSxBQUVQLEFBQ047UUFIYSxBQUdOLEFBQ1A7V0FKRCxBQUFjLEFBQ2IsQUFHVTs7O0FBR1gsT0FBQSxBQUFPLFVBQVAsQUFBZSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgb3B0aW9ucyBmcm9tICcuL29wdGlvbnMuanMnO1xuXG5jbGFzcyBHYW1lIHtcblx0Y29uc3RydWN0b3IoY29scywgcm93cywgbWluZXMpIHtcblx0XHR0aGlzLmNvbHMgPSBvcHRpb25zLmNvbHMgfHwgMTBcblx0XHR0aGlzLnJvd3MgPSBvcHRpb25zLnJvd3MgfHwgMTBcblx0XHR0aGlzLm1pbmVzID0gb3B0aW9ucy5taW5lcyB8fCAxMFxuXHRcdHRoaXMuY2VsbFNpemUgPSBvcHRpb25zLmNlbGxTaXplIHx8IDIwXG5cdFx0dGhpcy5pc092ZXIgPSBmYWxzZVxuXHR9XG5cdGluaXQoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdC8vIFNldCB0aGUgZ3JpZCBjb250YWluZXJcblx0XHRmdW5jdGlvbiBpbml0Q2FudmFzKCkge1xuXHRcdFx0Y29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpXG5cdFx0XHRjYW52YXMuc3R5bGUud2lkdGggPSAoX3RoaXMuY2VsbFNpemUgKiBfdGhpcy5jb2xzKSsncHgnXG5cdFx0XHRjYW52YXMuc3R5bGUuaGVpZ2h0ID0gKF90aGlzLmNlbGxTaXplICogX3RoaXMucm93cykrJ3B4J1xuXHRcdH1cblx0XHQvLyBDcmVhdGUgdGhlIGNlbGxzIHdpdGggdW5pcXVlIGlkXG5cdFx0ZnVuY3Rpb24gaW5pdENlbGxzKCkge1xuXHRcdFx0dmFyIGlkID0gMFxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBfdGhpcy5yb3dzOyBpKyspIHtcblxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IF90aGlzLmNvbHM7IGkrKykge1xuXG5cdFx0XHRcdFx0dmFyIGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5cdFx0XHRcdFx0dmFyIGNlbGxfY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFwib1wiKVxuXHRcdFx0XHRcdGNlbGwuYXBwZW5kQ2hpbGQoY2VsbF9jb250ZW50KVxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKS5hcHBlbmRDaGlsZChjZWxsKVxuXHRcdFx0XHRcdGNlbGwuc3R5bGUud2lkdGggPSBfdGhpcy5jZWxsU2l6ZSsncHgnXG5cdFx0XHRcdFx0Y2VsbC5zdHlsZS5oZWlnaHQgPSBfdGhpcy5jZWxsU2l6ZSsncHgnXG5cdFx0XHRcdFx0Y2VsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBpZCsrKTtcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIFB1dCBtaW5lcyBpbiByYW5kb20gY2VsbHNcblx0XHRmdW5jdGlvbiBpbml0TWluZXMoKSB7XG5cblx0XHRcdGZ1bmN0aW9uIHNodWZmbGUoYXJyYXkpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnRJbmRleCA9IGFycmF5Lmxlbmd0aCwgdGVtcG9yYXJ5VmFsdWUsIHJhbmRvbUluZGV4O1xuXG5cdFx0XHRcdHdoaWxlICgwICE9PSBjdXJyZW50SW5kZXgpIHtcblxuXHRcdFx0XHRcdHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY3VycmVudEluZGV4KTtcblx0XHRcdFx0XHRjdXJyZW50SW5kZXggLT0gMTtcblxuXHRcdFx0XHRcdHRlbXBvcmFyeVZhbHVlID0gYXJyYXlbY3VycmVudEluZGV4XTtcblx0XHRcdFx0XHRhcnJheVtjdXJyZW50SW5kZXhdID0gYXJyYXlbcmFuZG9tSW5kZXhdO1xuXHRcdFx0XHRcdGFycmF5W3JhbmRvbUluZGV4XSA9IHRlbXBvcmFyeVZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGFycmF5O1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgY2VsbHMgPSBBcnJheS5hcHBseShudWxsLCB7bGVuZ3RoOiAoX3RoaXMucm93cyAqIF90aGlzLmNvbHMpfSkubWFwKE51bWJlci5jYWxsLCBOdW1iZXIpXG5cdFx0XHRzaHVmZmxlKGNlbGxzKTtcblxuXHRcdFx0dmFyIG1pbmVzTG9jYXRpb25zID0gY2VsbHMuc3BsaWNlKDAsIF90aGlzLm1pbmVzKTtcblxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtaW5lc0xvY2F0aW9ucy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIgbWluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChtaW5lc0xvY2F0aW9uc1tpXSlcblxuXHRcdFx0XHRtaW5lZC5jbGFzc05hbWUgPSBcIm1pbmVkXCJcblxuXHRcdFx0XHQvLyBUZW1wIChGb3IgZGV2cyB2aXN1YWxpemFjaW9uKVxuXG5cdFx0XHRcdG1pbmVkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aW5pdENhbnZhcygpO1xuXHRcdGluaXRDZWxscygpO1xuXHRcdGluaXRNaW5lcygpO1xuXG5cblx0fVxuXG59XG5sZXQgYnVzY2FtaW5hcyA9IG5ldyBHYW1lKClcblxuYnVzY2FtaW5hcy5pbml0KCk7XG4iLCIndXNlIHN0cmljdCdcblxudmFyIG9wdGlvbnMgPSB7XG5cdHJvd3M6IDEzLFxuXHRjb2xzOiAxMyxcblx0bWluZXM6IDEwLFxuXHRjZWxsU2l6ZTogMzBcbn1cblxubW9kdWxlLmV4cG9ydHM9b3B0aW9uczsiXX0=
