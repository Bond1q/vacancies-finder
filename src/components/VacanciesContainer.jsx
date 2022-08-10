import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Vacancy from './Vacancy';
import { getLink } from './../parser/parser';

const VacanciesContainer = ({ site, vacanciesList }) => {
	return (
		<Box id={site} p={4} px={11}>
			<Typography color={'#212121'} fontWeight={500} variant='h2'>
				<Link target="_blank" color="#000" underline="hover" href={getLink(site)}>{site}</Link>
			</Typography>
			{vacanciesList.length !== 0 ?
				<Box sx={{
					mt: 4, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr))', gap: 4,
					mx: "auto", maxWidth: 1500, justifyContent: 'center',
				}} value={false} className='flexContainer '>

					{vacanciesList?.map((vacan, index) => <Vacancy key={index}  {...vacan} />)}

				</Box> :

				<Typography mt={2} fontWeight={500} variant='h5'>There aren't any vacancies at this moment!</Typography>
			}

		</Box>
	);
};

export default VacanciesContainer;