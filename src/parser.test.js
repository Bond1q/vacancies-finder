import { douParser } from "./parser/parser"

describe('persers', () => {
	it('dou', async () => {
		const res = await douParser();
		expect(res[1]).toMatchObject({
			company: "SaM Solutions", title: "Front-end Magento 2 developer",
			link: 'https://jobs.dou.ua/companies/sam-solutions/vacancies/206028/',
			city: 'Дніпро, віддалено', date: '5 серпня 2022'
		})
	})
})

//Front-end Magento 2 developer
//Front-end Magento 2 developer