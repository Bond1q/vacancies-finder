import axios from "axios"
import { load } from "cheerio"

export const allStarsitParser = async (getLink, testVacancies) => {
	const vacancies = []
	const res = await axios.get(getLink('AllSTARSIT'))
	const $ = load(res.data)
	$('div.job-item').each((i, elem) => {
		const company = 'AllSTARSIT'
		const title = $(elem).find('div.text-block-90').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a').attr('href')
		const city = 'Ukraine'
		const date = '';
		if (testVacancies(title)) vacancies.push({ company, title, link, city, date })

	});
	return vacancies
}