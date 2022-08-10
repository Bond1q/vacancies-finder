import { Card, Link, Typography } from '@mui/material';
import React from 'react';

const Vacancy = ({ company, title, link, city, date }) => {

	return (
		<div>
			<Card sx={{
				maxWidth: 1000, bgcolor: '#e8eaf6', p: 2, margin: '0 auto', height: '100%',
				boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
			}}>
				<Link target="_blank" color="#000" underline="hover" href={link}>
					<Typography m={'auto'} mb={2} variant='h6' component='div'>{title}</Typography>
				</Link>
				<Typography sx={{ display: 'flex' }}
					textAlign={'left'} fontWeight={600} variant='body1' component='div'>
					{company},
					<Typography ml={1} textAlign={'left'} fontWeight={500} variant='body1' component='div'>{city}</Typography>
					<Typography ml={'auto'} fontWeight={400} variant='body1' component='div'>{date}</Typography>
				</Typography>
			</Card >
		</div >
	);
};

export default Vacancy;