/*

Checks a string for US telephone number format 10 digits + optional country code 
& optional dashes and parens, but only in the expected places.

Basically, it was just an exercise in writing a regex.

*/

function telephoneCheck(str) {
	let tester = /^(?:1*)\-*(?:\([\d]{3}\)|[\d]{3})\-*\d{3}-*\d{4}$/;
	return tester.test(str.replace(/ /g, ''));
}
