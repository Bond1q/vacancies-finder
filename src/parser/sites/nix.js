import axios from "axios"
import { load } from "cheerio"

export const nixParser = async (getLink) => {
	const vacancies = []
	const res = await axios.get(getLink('N-iX'))
	const $ = load(res.data)
	$('div.job-card-sm').each((i, elem) => {
		const company = 'N-iX';
		const title = $(elem).find('a.title').text();
		const link = $(elem).find('a.title').attr('href');
		const city = $($(elem).find('div.info-list').find('div')[0]).text();
		const date = ''
		vacancies.push({ company, title, link, city, date })
	});

	return vacancies
}