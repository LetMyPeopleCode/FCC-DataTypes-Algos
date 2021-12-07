/*

  We were not allowed to use any built-in string reversal functions and had to remove
  any non-alphanumeric characters. The comparison was case-insensitive.

  So, I converted to lowercase, and replaced all non-alphanumerics with an empty string.
  Then it's a matterof reversing... split to array of chars, reverse the array, join.

  I could have done the function in 2 lines and 1 variable instead of 3 lines and 2, but chose to use the latter for readability.

*/
function palindrome(str) {
	let val = str.toLowerCase().replace(/[^a-z0-9]/g, '');
	let val2 = val.split('').reverse().join('');
	return val === val2;
}
