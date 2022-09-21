import { Button, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Vacancy from './Vacancy';
import { getLink } from './../parser/parser';
import { useLocation } from 'react-router-dom';

const ButtonShowMoreStyle = {
	marginTop: '25px',
	textTransform: 'none',
	color: '#191919',
	width: '200px',
	borderColor: '#191919',
	'&:hover': {
		borderColor: '#191919',
	}

}


const VacanciesContainer = ({ site, vacanciesList }) => {
	const id = useLocation().hash
	const [showAllList, setShowAllList] = useState(vacanciesList.length < 10 ? true : false)
	useEffect(() => {
		if (id !== '') {
			document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
		}
	}, [])

	return (
		<Box width={1000} id={site} p={4} m='auto' >
			<Typography mb={3} fontWeight={500} variant='h3'>
				<Link target="_blank" color="#191919" underline="hover" href={getLink(site, true)}>{site}</Link>
			</Typography>
			{vacanciesList.length !== 0 ?
				<Box>
					{showAllList ?
						vacanciesList?.map((vacan, index) => <Vacancy key={index}  {...vacan} />)
						:
						vacanciesList?.slice(0, 5)?.map((vacan, index) => <Vacancy key={index}  {...vacan} />)
					}
				</Box> :
				<Typography mt={2} fontWeight={500} variant='h5'>There aren't any vacancies at this moment!</Typography>
			}
			{vacanciesList.length > 10 &&
				<Button
					sx={ButtonShowMoreStyle}
					variant="outlined"
					onClick={() => setShowAllList(!showAllList)}>
					{!showAllList ? 'Show more' : 'Show less'}
				</Button>
			}

		</Box>
	);
};



export default VacanciesContainer;


