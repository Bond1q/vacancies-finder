import axios from "axios"
import { load } from "cheerio"

export const eleksParser = async (getLink, testVacancies) => {
	const vacancies = []
	const res = await axios.get(getLink('Eleks'))
	const $ = load(res.data)
	$('a.vacancy-item').each((i, elem) => {
		const company = 'Eleks'
		const title = $(elem).find('h3.vacancy-item__title').text()?.replaceAll('\n', '').trim();
		const link = $(elem).attr('href')
		const city = 'Ukraine'
		const date = '';
		if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
	});
	return vacancies
}