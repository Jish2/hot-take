export function remove(value, array) {
	return array.filter((item) => {
		return item !== value;
	});
}
