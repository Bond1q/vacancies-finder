import axios from "axios"
import { load } from "cheerio"

export const brainanceParser = async (getLink, testVacancies) => {
	const vacancies = []
	try {
		const res = await axios.get(getLink('Brainence'))
		const $ = load(res.data)


		$('div.inner_block_open_vacancies').each((i, elem) => {
			const company = 'Brainence';
			const title = $(elem).find('h3').find('a').text();
			const link = $(elem).find('h3').find('a').attr('href');
			const city = 'Lviv/remote';
			const date = ''
			if (testVacancies(title)) vacancies.push({ company, title, link, city, date })
		});
	} catch (error) {
		console.log(error);
	}

	return vacancies
}