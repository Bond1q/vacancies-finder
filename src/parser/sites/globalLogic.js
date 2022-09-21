import axios from "axios"
import { load } from "cheerio"

export const globalLogicParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('GlobalLogic'))
		const $ = load(res.data)

		$('div.career-pagelink').each((i, elem) => {
			const company = 'GlobalLogic'
			const title = $(elem).find('p.mb-0').find('a').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('p.mb-0').find('a').attr('href')
			const city = $(elem).find('span.job-locations').text()?.replaceAll('\n', '').trim().split('|')[1];
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })


		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}