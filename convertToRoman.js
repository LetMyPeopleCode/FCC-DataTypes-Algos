function convertToRoman(num) {
	// converts numbers up to 3999
	/*
    My solution is to step backwards from thousands to ones.

    The `nums` array contains the letters to use for ones, 
    fives, and tens in each decimal column.

    Running through the nums array, it first determines how many times
    the 'base' value can go into the available number, converts that
    to a string, and then deducts the number from the total before the next round.

    For greater efficiency, I could change nums.ForEach into a traditional loop
    then use `if (num === 0) break` as the last line of the loop. So if the number
    was a multiple of 1000, we'd save 3 iterations.

  */

	let nums = [
		{ base: 1000, ten: '', five: '', one: 'M' },
		{ base: 100, ten: 'M', five: 'D', one: 'C' },
		{ base: 10, ten: 'C', five: 'L', one: 'X' },
		{ base: 1, ten: 'X', five: 'V', one: 'I' },
	];

	function col(val, ten, five, one) {
		if (val == 0) return '';
		if (val < 4) return one.repeat(val);
		if (val == 4) return one + five;
		if (val < 9) return five + one.repeat(val - 5);
		if (val == 9) return one + ten;
	}

	let roman = '';
	nums.forEach((vals) => {
		let colbase = Math.floor(num / vals.base);
		roman += col(colbase, vals.ten, vals.five, vals.one);
		num -= colbase * vals.base;
	});
	return roman;
}
