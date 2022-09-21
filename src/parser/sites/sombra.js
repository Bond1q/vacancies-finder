import axios from "axios"
import { load } from "cheerio"

export const sombraParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('Sombra'))
		const $ = load(res.data)
		$('div.vacancy').each((i, elem) => {
			const company = 'Sobmra'
			const title = $(elem).find('a').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('a').attr('href')
			const city = 'Ukraine'
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}