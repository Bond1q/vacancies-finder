import axios from "axios"
import { load } from "cheerio"

export const djinniParser = async (getLink) => {
	const vacancies = []
	const res = await axios.get(getLink('Djinni'))
	const $ = load(res.data)
	$('li.list-jobs__item').each((i, elem) => {
		const company = $($(elem).find('div.list-jobs__details__info').find('a')[1]).text()?.replaceAll('\n', '').trim()
		const title = $(elem).find('a.profile').text()?.replaceAll('\n', '').trim();
		const link = 'djinni.co' + $(elem).find('a.profile').attr('href')
		const cities = $(elem).find('span.location-text').find('span').text()?.replaceAll('\n', '').trim();
		const type = $($(elem).find('nobr')[0]).text()?.replaceAll('\n', '').trim();
		const date = $(elem).find('div.text-date').text()?.replaceAll('\n', '').trim();
		const city = cities.lenght > 1 ? cities + '/' + type : type;
		vacancies.push({ company, title, link, city, date })
	});
	return vacancies
}