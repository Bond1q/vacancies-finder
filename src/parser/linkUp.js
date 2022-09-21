import axios from "axios"
import { load } from "cheerio"

export const isPlaceInLinkUpAcademy = async () => {
	try {
		const res = await axios.get('https://linkupst.com/academy/')
		const $ = load(res.data)
		const availablePlaces = +$('p.availableTechnologies_tabFreePlaces__mDXcr > span').first().text()

		if (availablePlaces > 0) {
			alert('LinkUp has a places in Frontend academy!!! ')
		}
	} catch (error) {
		console.log(error);
	}
} 