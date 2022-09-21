export const cutText = (text, max, divider) => {
	const splitedText = text.split(divider)
	let cuttedText = splitedText[0]
	let counter = 1
	while (counter < splitedText.length) {
		if (cuttedText.length + splitedText[counter].length < max) {
			cuttedText += divider + splitedText[counter]
			counter++
		} else {
			cuttedText += ' ...'
			break
		}
	}
	return cuttedText
}