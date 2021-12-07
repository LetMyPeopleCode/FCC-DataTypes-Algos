/*

For this, all A-Z were to be shifted by 13 places wrapping around the alphabet
and the answer was to be returned in uppercase.

Array.prototype.map seemed to be the best option.

*/

function rot13(str) {
	return str
		.toUpperCase()
		.split('')
		.map((char) => {
			if (/[A-Z]/.test(char)) {
				return String.fromCharCode(
					char.charCodeAt(0) > 77
						? char.charCodeAt(0) - 13
						: char.charCodeAt(0) + 13
				);
			} else {
				return char;
			}
		})
		.join('');
}
