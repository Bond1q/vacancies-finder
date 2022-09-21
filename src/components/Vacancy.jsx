import { Link, Typography } from '@mui/material';
import React from 'react';
import { shouldHighlightVacancy } from '../utils/isToday';
import { cutText } from '../utils/cutText';

const VacancyStyle = {
	width: '1000px',
	p: 2, margin: '0 auto',
	border: '1px solid #c8c8c8;',
	borderLeft: '2px solid black',
	boxSizing: 'border-box',
	display: 'block',
	transition: '100ms',
	'&:hover': { background: '#f9f9f9', transition: '100ms' }
}


const Vacancy = ({ company, title, link, city, date }) => {

	return (
		<Link
			href={link}
			underline='none'
			color="#191919"
			bgcolor={shouldHighlightVacancy(date) && '#EDFAF0'}
			target="_blank"

			sx={VacancyStyle}>
			{/* <Link color="#191919" target="_blank" underline="none" href={link}> */}
			<Typography m={'auto'} mb={2} variant='h6' component='div'>{cutText(title, 55, ' ')}</Typography>
			{/* </Link> */}
			<Typography color="#191919" display='flex' component='div' textAlign={'left'} fontWeight={600} >
				{company},
				<Typography ml={1} fontWeight={500}>{cutText(city, 50, ', ')}</Typography>
				<Typography ml={'auto'} fontWeight={400} >{date}</Typography>
			</Typography>
		</Link >
	);
};

export default Vacancy;




