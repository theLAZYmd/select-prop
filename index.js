/**
 * @param {object} obj The object from which to select properties
 * @param {string|string[]} path The selection string in the form of each property separated by '.'
 * @returns {*|*[]}
 */
function select_prop (obj, path) {

	switch (typeof path) {
		case ('string'):
			path = path.split('.');
			break;
		case ('object'):
			if (path instanceof Array) {
				for (let val of path) {
					if (typeof val !== 'string') {
						throw new TypeError('Array input for \'path\' must be an array of strings');
					}
				}
			}
		default:
			throw new TypeError('Input parameter \'path\' must be a string with \'.\' denoting properties or an array of strings');
	}

	let arr = [];
	let res = path.reduce((acc, curr, i) => {
		if (acc instanceof Array) {
			for (let val of acc) {
				let r = select_prop(val, path.slice(i).join('.'));
				if (r) {
					if (r instanceof Array) arr = arr.concat(r);
					else arr.push(r);
				}
			}
		}
		if (acc[curr]) return acc[curr];
		return null;
	}, obj);
	if (arr.length) return arr;
	else return res;
}

module.exports = select_prop;