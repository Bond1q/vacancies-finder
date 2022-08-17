import axios from "axios";
import { load } from "cheerio";
import {
	douParser, djinniParser, brainanceParser, nixParser, globalLogicParser,
	interLogicParser, ciklumParser, dataArtParser, evoPlayParser,
	intelliasParser, infopulseParser, softServeParser, eleksParser, allStarsitParser,
	sombraParser, startupSoftParser
} from "./sites";

export const getLink = (site, linkOnSite = false) => {
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
		'Sigma': 'https://career.sigma.software/what-we-offer/vacancies/?direction=engineering%2Cukraine%2Cjunior&seniority=junior&location=ukraine&search=',
		'Sigma2': 'https://career.sigma.software/what-we-offer/vacancies/?direction=engineering%2Cukraine%2Cinterns&seniority=interns&location=ukraine&search=',
		'Eleks': 'https://careers.eleks.com/vacancies/?location=98,55&technology=21,57',
		'AllSTARSIT': 'https://www.allstarsit.com/careers/jobs?job-level-categories-wrjm=junior&job-location-categories=ukraine%7Cremote',
		'Sombra': 'https://sombrainc.com/career/',
		'StartupSoft': 'https://www.startupsoft.com/careers/openings/',
	}
	// return 'https://api.codetabs.com/v1/proxy?quest=' + allSites[site]
	if (window.location.href.includes('localhost') || linkOnSite === true) {
		return allSites[site]
	}

	return 'https://api.codetabs.com/v1/proxy?quest=' + allSites[site]
}

const testVacancies = (title) => {
	const testedTitle = title.toLowerCase();
	const levelKeys = ['trainee', 'junior', 'intern'];
	const technologyKeys = ['front end', 'front-end', 'frontend', 'javascript', 'js', 'react'];
	return levelKeys.some(el => testedTitle.includes(el)) &&
		technologyKeys.some(el => testedTitle.includes(el));
}


export const requestAllVacancies = async () => {
	try {
		const sitesList = [
			{ name: 'Dou', func: () => douParser(getLink) },
			{ name: 'Djinni', func: () => djinniParser(getLink) },
			{ name: 'Brainence', func: () => brainanceParser(getLink, testVacancies) },
			{ name: 'GlobalLogic', func: () => globalLogicParser(getLink, testVacancies) },
			{ name: 'N-iX', func: () => nixParser(getLink) },
			{ name: 'InterLogic', func: () => interLogicParser(getLink, testVacancies) },
			{ name: 'Ciklum', func: () => ciklumParser(getLink, testVacancies) },
			{ name: 'DataArt', func: () => dataArtParser(getLink, testVacancies) },
			{ name: 'EvoPlay', func: () => evoPlayParser(getLink, testVacancies) },
			{ name: 'Intellias', func: () => intelliasParser(getLink, testVacancies) },
			{ name: 'Infopulse', func: () => infopulseParser(getLink, testVacancies) },
			{ name: 'SoftServe', func: () => softServeParser(getLink) },
			{ name: 'Eleks', func: () => eleksParser(getLink, testVacancies) },
			{ name: 'AllSTARSIT', func: () => allStarsitParser(getLink, testVacancies) },
			{ name: 'Sombra', func: () => sombraParser(getLink, testVacancies) },
			{ name: 'StartupSoft', func: () => startupSoftParser(getLink, testVacancies) },
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

