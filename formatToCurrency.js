(function () {
	var display = document.createElement('div');
	document.body.insertBefore(document.body, display);
	
	var isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	};

	var signs = {
		minus: ['-', ''],
		parens: ['(', ')']
	};

	var formatToCurrency = function(n, opts) {
		var defaults = {
			currSymbol: '$',
			currSep: ',',
			thousandsSep: '.',
			negSymbol: 'minus'
		};

		var options = opts || {};

		for (var prop in defaults) {
			options[prop] = options[prop] ? options[prop] : defaults[prop];
		}


		var value = isNumber(n) ? n : 0,
			sign = (value < 0) ? signs[options.negSymbol] : [],
			roundedDecimal = (Math.abs(value)).toFixed(2),
			decimalParts = roundedDecimal.split('.'),
			integerPart = decimalParts[0],
			fractionalPart = decimalParts[1];

		var temporary = integerPart.split('').reverse(),
			formattedIntegerPart = [];
		
		for (var i = 0, len = temporary.length; i < len; i++) {
			if (i === 0) {
				formattedIntegerPart.unshift(temporary[i]);
				continue;
			}

			if (i % 3 === 0) formattedIntegerPart.unshift(options.currSep);
			formattedIntegerPart.unshift(temporary[i]);
		}

		return [ 
			options.currSymbol,
			sign[0],
			formattedIntegerPart.join(''),
			options.thousandsSep,
			fractionalPart,
			sign[1]
		].join('');
	};

	window.formatToCurrency = formatToCurrency;

})();

var display = document.createElement('div');
document.body.appendChild(display);
var someNumber = -13254665464354.32465641;
display.innerHTML = formatToCurrency(someNumber, { negSymbol: 'parens' });




