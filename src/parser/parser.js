import axios from "axios";
import { load } from "cheerio";

export const getLink = (site) => {
	const allSites = {
		'Dou': 'https://jobs.dou.ua/vacancies/?category=Front%20End&exp=0-1',
		'Djinni': 'https://djinni.co/jobs/keyword-javascript/?exp_level=no_exp',
		'Brainence': 'https://brainence.com/career/',
		'GlobalLogic': 'https://www.globallogic.com/ua/career-search-page/?keywords=&experience=0-1%20years&freelance=&locations=ukraine&c=Engineering&remote=',
		'N-iX': 'https://careers.n-ix.com/jobs/?subcat%5B%5D=JavaScript&work_type%5B%5D=Remote&work_type%5B%5D=Office+based&country%5B%5D=Ukraine&country%5B%5D=Global&level%5B%5D=620599&level%5B%5D=620596&keyword=',
		'InterLogic': 'https://www.interlogic.com.ua/ua/vacancies/#JavaScript',
		'Ciklum': 'https://jobs.ciklum.com/jobs/?country=ukraine-remote&location=&category=javascript-vacancies,react-vacancies',
		'DataArt': 'https://dataart.team/en/vacancies?categories=4679&locations=12&locations=4738',
		'EvoPlay': 'https://evoplay.com/career/',
		'Intellias': 'https://www.intellias.ua/vacancies/current-open-positions',
		'Infopulse': 'https://www.infopulse.com/join-us?locale=en&page=1&specialization=6&location=167%2C143',
		'SoftServe': 'https://career.softserveinc.com/uk-ua/vacancies/country-ukraine/city-lviv/direction-software-development/technology-dot-net,cc-plus-plus,java,other-software-development,rare-technologies,db,webui,ios,ruby,python,apple,go/position-trainee,junior',
		'Sigma': 'https://career.sigma.software/what-we-offer/vacancies/?direction=engineering',
		'Eleks': 'https://careers.eleks.com/vacancies/?location=98,55&technology=21,57',
		'AllSTARSIT': 'https://www.allstarsit.com/careers/jobs?job-level-categories-wrjm=junior&job-location-categories=ukraine%7Cremote',
		'Sombra': 'https://sombrainc.com/career/',
		'StartupSoft': 'https://www.startupsoft.com/careers/openings/',
	}
	return allSites[site]
}


export const douParser = async () => {
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
export const djinniParser = async () => {
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

export const brainanceParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Brainence'))
	const $ = load(res.data)


	$('div.inner_block_open_vacancies').each((i, elem) => {
		const company = 'Brainence';
		const title = $(elem).find('h3').find('a').text();
		const link = $(elem).find('h3').find('a').attr('href');
		const city = 'Lviv/remote';
		const date = ''
		if (title.toLowerCase().includes('junior') || title.includes('trainee')) {
			vacancies.push({ company, title, link, city, date })

		}
	});
	return vacancies
}

export const nixParser = async () => {
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

export const globallogicParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('GlobalLogic'))
	const $ = load(res.data)

	$('div.career-pagelink').each((i, elem) => {
		const company = 'GlobalLogic'
		const title = $(elem).find('p.mb-0').find('a').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('p.mb-0').find('a').attr('href')
		const city = $(elem).find('span.job-locations').text()?.replaceAll('\n', '').trim().split('|')[1];
		const date = '';
		const testTitile = title.toLowerCase()
		if (testTitile.includes('front-end') || testTitile.includes('react') || testTitile.includes('javascript'))
			vacancies.push({ company, title, link, city, date })

	});
	return vacancies
}

export const interlogicParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('InterLogic'))
	const $ = load(res.data)
	$('div.vacancy').each((i, elem) => {
		if ($(elem)[0].attribs['data-category'].includes('front-end')) {
			const company = 'InterLogic'
			const title = $(elem).find('div.vacancy-title').text()?.replaceAll('\n', '').trim();
			const link = $(elem).find('a').attr('href')
			const city = $(elem)[0].attribs['data-category'].includes('front-end') && 'Ukraine'
			const date = '';
			vacancies.push({ company, title, link, city, date })
		}


	});
	return vacancies
}

export const ciklumParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Ciklum'))
	const $ = load(res.data)
	$('div.vacancy-card').each((i, elem) => {

		const company = 'Ciklum'
		const title = $(elem).find('a.vacancy-card__link').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a.vacancy-card__link').attr('href')
		const city = $(elem).find('div.vacancy-card__offices').find('a').text()
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('trainee') || testedTitle.includes('junior') || testedTitle.includes('intern')) {
			vacancies.push({ company, title, link, city, date })
		}
	});
	return vacancies
}

export const dataartParser = async () => {
	const vacancies = [{
		company: 'DataArt', title: 'All vacancies is there',
		link: getLink('DataArt'),
		city: 'Ukraine', date: ''
	}]
	return vacancies
}

export const evoplayParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('EvoPlay'))
	const $ = load(res.data)
	$('li.menu-item-type-post_type').each((i, elem) => {

		const company = 'EvoPlay'
		const title = $(elem).find('a').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a').attr('href')
		const city = 'Ukraine'
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('frontend') || testedTitle.includes('react') || testedTitle.includes('javascript')) {
			vacancies.push({ company, title, link, city, date })
		}
	});
	return vacancies
}

export const intelliasParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Intellias'))
	const $ = load(res.data)
	$('a.vacancy-item ').each((i, elem) => {

		const company = 'Intellias'
		const title = $(elem).find('h3').text()?.replaceAll('\n', '').trim();
		const link = $(elem).attr('href')
		const city = $(elem).find('p').text()?.replaceAll('\n', '').trim();
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('front-end') || testedTitle.includes('react') || testedTitle.includes('javascript')) {
			if (testedTitle.includes('junior') || testedTitle.includes('trainee')) {
				vacancies.push({ company, title, link, city, date })
			}
		}
	});
	return vacancies
}

export const infopulseParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Infopulse'))
	const $ = load(res.data)
	$('a.job-card__title').each((i, elem) => {
		const company = 'Infopulse'
		const title = $(elem).text()?.replaceAll('\n', '').trim();
		const link = $(elem).attr('href')
		const city = 'Ukraine'
		const date = '';
		if (title.length > 1) {
			vacancies.push({ company, title, link, city, date })
		}

	});
	return vacancies
}

export const softserveParser = async () => {
	const vacancies = [{
		company: 'SoftServe', title: 'All vacancies is there',
		link: getLink('SoftServe'),
		city: 'Ukraine', date: ''
	}]
	return vacancies
}

export const sigmaParser = async () => {
	const vacancies = []
	const juniorRes = await axios.get('https://career.sigma.software/what-we-offer/vacancies/?direction=engineering%2Cukraine%2Cjunior&seniority=junior&location=ukraine&search=')
	const $Junior = load(juniorRes.data)
	const internRes = await axios.get('https://career.sigma.software/what-we-offer/vacancies/?direction=engineering%2Cukraine%2Cinterns&seniority=interns&location=ukraine&search=')
	const $Intern = load(internRes.data)
	const parseData = ($) => {
		$('a.card ').each((i, elem) => {
			const company = 'Sigma'
			const title = $(elem).find('h3.card-title').text()?.replaceAll('\n', '').trim();
			const link = $(elem).attr('href')
			const city = 'Ukraine'
			const date = '';
			vacancies.push({ company, title, link, city, date })
		});
	}
	parseData($Junior)
	parseData($Intern)
	return vacancies
}

export const eleksParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Eleks'))
	const $ = load(res.data)
	$('a.vacancy-item').each((i, elem) => {
		const company = 'Eleks'
		const title = $(elem).find('h3.vacancy-item__title').text()?.replaceAll('\n', '').trim();
		const link = $(elem).attr('href')
		const city = 'Ukraine'
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('junior') || testedTitle.includes('trainee')) {
			vacancies.push({ company, title, link, city, date })

		}
	});
	return vacancies
}

export const allstarsitParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('AllSTARSIT'))
	const $ = load(res.data)
	$('div.job-item').each((i, elem) => {
		const company = 'AllSTARSIT'
		const title = $(elem).find('div.text-block-90').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a').attr('href')
		const city = 'Ukraine'
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('javascript') || testedTitle.includes('react') || testedTitle.includes('frontend')) {
			if (testedTitle.includes('junior') || testedTitle.includes('trainee')) {
				vacancies.push({ company, title, link, city, date })

			}
		}

	});
	return vacancies
}

export const sombraParser = async () => {
	const vacancies = []
	const res = await axios.get(getLink('Sombra'))
	const $ = load(res.data)
	$('div.vacancy').each((i, elem) => {
		const company = 'Sobmra'
		const title = $(elem).find('a').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a').attr('href')
		const city = 'Ukraine'
		const date = '';
		const testedTitle = title.toLowerCase();
		if (testedTitle.includes('javascript') || testedTitle.includes('react') || testedTitle.includes('frontend')) {
			if (testedTitle.includes('junior') || testedTitle.includes('trainee')) {
				vacancies.push({ company, title, link, city, date })
			}
		}
	});
	return vacancies
}

export const startupSoft = async () => {
	const vacancies = []
	const res = await axios.get(getLink('StartupSoft'))
	const $ = load(res.data)
	$('div.front-end-developer.lviv').each((i, elem) => {
		const company = 'StartupSoft'
		const title = $(elem).find('div.inner').find('h4').text()?.replaceAll('\n', '').trim();
		const link = $(elem).find('a').attr('href')
		const city = $(elem).find('div.inner').find('div.career_location').text()
		const date = '';
		vacancies.push({ company, title, link, city, date })
	});
	return vacancies
}



export const requestAllVacancies = async () => {
	try {
		const sitesList = [
			{ name: 'Dou', func: douParser },
			{ name: 'Djinni', func: djinniParser },
			{ name: 'Brainence', func: brainanceParser },
			{ name: 'GlobalLogic', func: globallogicParser },
			{ name: 'N-iX', func: nixParser },
			{ name: 'InterLogic', func: interlogicParser },
			{ name: 'Ciklum', func: ciklumParser },
			{ name: 'DataArt', func: dataartParser },
			{ name: 'EvoPlay', func: evoplayParser },
			{ name: 'Intellias', func: intelliasParser },
			{ name: 'Infopulse', func: infopulseParser },
			{ name: 'SoftServe', func: softserveParser },
			{ name: 'Sigma', func: sigmaParser },
			{ name: 'Eleks', func: eleksParser },
			{ name: 'AllSTARSIT', func: allstarsitParser },
			{ name: 'Sombra', func: sombraParser },
			{ name: 'StartupSoft', func: startupSoft },
		]
		const res = await axios.all(sitesList.map(site => site.func()))
		const result = [];
		res.forEach((site, index) => {
			result.push({ name: sitesList[index].name, vacanciesList: site })
		})
		return result
	} catch (error) {
		return error
	}

}

