(function () {

	// http://stackoverflow.com/questions/18082/validate-numbers-in-javascript-isnumeric/1830844
	var isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	var negativeSymbols = {
		minus: ['-', ''],
		parens: ['(', ')']
	};

	var formatToCurrency = function(n, opts) {
		var defaults = {
			currSymbol: '$',
			thousandsSep: ',',
			decimalSep: '.',
			negSymbolType: 'minus'
		};

		var options = opts || {};

		for (var prop in defaults) {
			options[prop] = options[prop] ? options[prop] : defaults[prop];
		}


		var value = isNumber(n) ? n : 0,
			sign = (value < 0) ? negativeSymbols[options.negSymbolType] : [],
			roundedDecimal = (Math.abs(value)).toFixed(2),
			decimalParts = roundedDecimal.split('.'),
			integerPart = decimalParts[0],
			fractionalPart = decimalParts[1];

		var tempArray = integerPart.split('').reverse(),
			formattedIntegerPart = [];
		
		for (var i = 0, len = tempArray.length; i < len; i++) {
			if (i === 0) {
				formattedIntegerPart.unshift(tempArray[i]);
				continue;
			}

			if (i % 3 === 0) formattedIntegerPart.unshift(options.thousandsSep);
			formattedIntegerPart.unshift(tempArray[i]);
		}

		return [ 
			options.currSymbol,
			sign[0],
			formattedIntegerPart.join(''),
			options.decimalSep,
			fractionalPart,
			sign[1]
		].join('');
	};

	window.formatToCurrency = formatToCurrency;

})();

var display = document.createElement('div');
var someNumber = -13254665464354.32465641;
display.innerHTML = formatToCurrency(someNumber, { negSymbolType: 'parens' });
document.body.appendChild(display);




