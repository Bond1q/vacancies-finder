import axios from "axios"
import { load } from "cheerio"

export const douParser = async (getLink) => {
	const vacancies = []
	const res = await axios.get(getLink('Dou'))
	const $ = load(res.data)
	$('div.vacancy').each((i, elem) => {
		const company = $(elem).find('div.title').find('a.company').text().trim();
		const title = $(elem).find('div.title').find('a.vt').text().replace(/\&nbsp;/g, '');
		const link = $(elem).find('div.title').find('a.vt').attr('href');
		const city = $(elem).find('div.title').find('span.cities').text();
		const date = $(elem).find('div.date').text()

		vacancies.push({ company, title, link, city, date })
	});

	return vacancies
}