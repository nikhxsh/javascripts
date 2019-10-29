export function toTitleCase(name) {
	return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase();
}

export function isEqualObject(x, y) {
	let xProps = Object.getOwnPropertyNames(x);
	let yProps = Object.getOwnPropertyNames(y);

	if (xProps.length !== yProps.length)
		return false;

	for (let i = 0; i < xProps.length; i++) {
		let propName = xProps[i];
		if (x[propName] !== y[propName])
			return false;
	}
	return true;
}

export function hasAllValues(x) {
	let check = true;
	for (let [key, value] of Object.entries(x)) {
		if (key === 'id') continue;
		check = check && (value !== null && value !== '');
	}
	return check;
}