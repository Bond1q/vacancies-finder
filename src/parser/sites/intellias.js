import axios from "axios"
import { load } from "cheerio"

export const intelliasParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('Intellias'))
		const $ = load(res.data)
		$('a.vacancy-item ').each((i, elem) => {

			const company = 'Intellias'
			const title = $(elem).find('h3').text()?.replaceAll('\n', '').trim();
			const link = 'https://www.intellias.ua' + $(elem).attr('href')
			const city = $(elem).find('p').text()?.replaceAll('\n', '').trim();
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}
