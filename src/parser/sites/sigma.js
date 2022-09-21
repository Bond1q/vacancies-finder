import axios from "axios"
import { load } from "cheerio"

export const sigmaParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const juniorRes = await axios.get(getLink('Sigma'))
		const $Junior = load(juniorRes.data)
		const internRes = await axios.get(getLink('Sigma2'))
		const $Intern = load(internRes.data)
		const parseData = ($) => {
			$('a.card ').each((i, elem) => {
				const company = 'Sigma'
				const title = $(elem).find('h3.card-title').text()?.replaceAll('\n', '').trim();
				const link = $(elem).attr('href')
				const city = 'Ukraine'
				const date = '';
				if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
			});
		}
		parseData($Junior)
		parseData($Intern)
	} catch (error) {
		console.log(error);
	}
	return vacancies
}