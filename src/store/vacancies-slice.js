import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { requestAllVacancies } from '../parser/parser';

const initialState = {
	sites: [
		{
			name: 'dou', vacanciesList: [{
				title: 'Intern JavaScript (Full-Stack) Developer',
				company: 'JavaScript Ninjas',
				city: 'Kyiv',
				link: 'https://djinni.co/jobs/362945-intern-javascript-full-stack-developer/',
				date: 'сьогодні',

			}]
		},


	],
	isLoading: false
}
export const getVacancies = createAsyncThunk(
	'vacancies/getVacancies',
	async (_, thunkAPI) => {
		const res = await requestAllVacancies();
		return res;

	}
)
const vacanciesSlice = createSlice({
	name: 'vacancies',
	initialState: initialState,
	reducers: {
		addSites(state, action) {
			state.sites = action.payload;
		}

	},
	extraReducers: {
		[getVacancies.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getVacancies.fulfilled]: (state, action) => {

			state.sites = action.payload;
			state.isLoading = false;

		}
	}

})


export default vacanciesSlice.reducer;
export const { addSites } = vacanciesSlice.actions