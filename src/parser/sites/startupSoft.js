import axios from "axios"
import { load } from "cheerio"

export const startupSoftParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('StartupSoft'))
		const $ = load(res.data)
		$('div.front-end-developer.lviv').each((i, elem) => {
			const company = 'StartupSoft'
			const title = $(elem).find('div.inner').find('h4').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('a').attr('href')
			const city = $(elem).find('div.inner').find('div.career_location').text()
			const date = '';
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		});
	} catch (error) {
		console.log(error);
	}
	return vacancies
}