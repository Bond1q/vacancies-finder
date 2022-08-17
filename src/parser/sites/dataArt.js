
import axios from "axios"
import { load } from "cheerio"

export const dataArtParser = async (getLink, testVacancies) => {
	const vacancies = []
	const res = await axios.get(getLink('DataArt'))
	const $ = load(res.data)
	$('div.VacancyCard ').each((i, elem) => {
		const company = 'DataArt'
		const title = $(elem).find('div.VacancyCard-Title').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a.VacancyCard-Link').attr('href')
		const city = 'Ukraine'
		const date = '';
		if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
	});
	return vacancies
}