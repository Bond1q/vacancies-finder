import axios from "axios"
import { load } from "cheerio"

export const evoPlayParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('EvoPlay'))
		const $ = load(res.data)
		$('li.menu-item-type-post_type').each((i, elem) => {
			const company = 'EvoPlay'
			const title = $(elem).find('a').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('a').attr('href')
			const city = 'Ukraine'
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}