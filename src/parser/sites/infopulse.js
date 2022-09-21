import axios from "axios"
import { load } from "cheerio"

export const infopulseParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('Infopulse'))
		const $ = load(res.data)
		$('a.job-card__title').each((i, elem) => {
			const company = 'Infopulse'
			const title = $(elem).text()?.replaceAll('\n', '').trim();
			const link = $(elem).attr('href')
			const city = 'Ukraine'
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })

		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}