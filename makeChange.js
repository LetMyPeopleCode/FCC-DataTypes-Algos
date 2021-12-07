/* 

This uses a similar iteration to the Roman Numerals solution, but iterates backwards through bill values rather than multiples of 10. 

Because floating point numbers are not a JS strength and I wanted to avoid fractional values that were either wrong or unwieldy, I added a quick utility function to fix a float to a 2-place decimal value.

An interesting piece is that the change drawer array comes in essentially reading right to left, up to down across the drawer ($100s to pennies). But the test cases want the change array to read left to right and down to up across the drawer (pennies to $100s).

That was easy to fix using breakdown.push() instead of breakdown.unshift(), but I think it was bad test writing. Unfortunately, I couldn't edit the tests.

*/

function checkCashRegister(price, cash, cid) {
	// get the net value of the drawer
	const reducer = (previousval, nextval) => {
		if (Array.isArray(previousval)) previousval = previousval[1];
		return parseFloat(previousval) + parseFloat(nextval[1]);
	};

	// let's get a 2-decimal drawer total
	let drawer = floatFix(cid.reduce(reducer));

	// let's get 2-decimal change amount
	let change = floatFix(cash - price);

	//If change exceeds cash in drawer
	if (change > drawer) return { status: 'INSUFFICIENT_FUNDS', change: [] };

	//if change equals cash in drawer
	if (change === drawer) return { status: 'CLOSED', change: cid };

	//Can we make change in the change amount?
	return checkChange(change, cid);
}

function floatFix(num) {
	return Math.ceil(num * 100) / 100;
}

function checkChange(change, cid) {
	let vals = [100.0, 20.0, 10.0, 5.0, 1.0, 0.25, 0.1, 0.05, 0.01];
	let breakdown = [];
	for (let i = 0; i < vals.length; i++) {
		let curr = vals[i];
		let slot = cid[9 - (i + 1)];
		// skip the denomination if the change is less than a single unit of it
		if (change < curr) continue;
		//put the an amount into the array for the denomination (d) if d < change
		let count = Math.floor(floatFix(change) / curr); // number of denomination in change
		if (slot[1] <= count * curr) {
			breakdown.push([slot[0], slot[1]]); //put all (or none) of the slot in the change
			change -= slot[1];
		} else {
			//calculate number of items in slot we should use
			let using = count * curr;
			breakdown.push([slot[0], using]); //put some of the slot in the change
			change -= using;
		}
	}
	return change < 0.01
		? { status: 'OPEN', change: breakdown }
		: { status: 'INSUFFICIENT_FUNDS', change: [] };
}
