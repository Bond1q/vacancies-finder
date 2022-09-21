const monthes = {
	'січеня': 1,
	'лютого': 2,
	'березя': 3,
	'квітня': 4,
	'травня': 5,
	'червня': 6,
	'липня': 7,
	'серпня': 8,
	'вересня': 9,
	'жовтня': 10,
	'листопада': 11,
	'грудня': 12,
}

export const shouldHighlightVacancy = (date) => {
	if (date.includes('сьогодні')) return true


	const dividerDate = date.split(' ')
	const today = new Date()

	if (+dividerDate[0] === today.getDate() &&
		monthes[dividerDate[1]] === (today.getMonth() + 1)) return true

	return false
}