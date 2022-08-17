import axios from "axios"
import { load } from "cheerio"

export const ciklumParser = async (getLink, testVacancies) => {
	const vacancies = []
	const res = await axios.get(getLink('Ciklum'))
	const $ = load(res.data)
	$('div.vacancy-card').each((i, elem) => {

		const company = 'Ciklum'
		const title = $(elem).find('a.vacancy-card__link').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a.vacancy-card__link').attr('href')
		const city = $(elem).find('div.vacancy-card__offices').find('a').text()
		const date = '';
		if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
	});
	return vacancies
}