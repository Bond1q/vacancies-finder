export const softServeParser = async (getLink) => {

	const vacancies = [{
		company: 'SoftServe', title: 'All vacancies is there',
		link: getLink('SoftServe'),
		city: 'Ukraine', date: ''
	}]
	return vacancies
}