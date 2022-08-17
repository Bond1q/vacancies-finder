import axios from "axios"
import { load } from "cheerio"

export const interLogicParser = async (getLink, testVacancies) => {
	const vacancies = []
	const res = await axios.get(getLink('InterLogic'))
	const $ = load(res.data)
	$('div.vacancy').each((i, elem) => {
		if ($(elem)[0].attribs['data-category'].includes('front-end')) {
			const company = 'InterLogic'
			const title = $(elem).find('div.vacancy-title').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('a').attr('href')
			const city = $(elem)[0].attribs['data-category'].includes('front-end') && 'Ukraine'
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		}
	});
	return vacancies
}