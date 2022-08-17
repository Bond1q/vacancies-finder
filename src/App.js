
import { useEffect } from 'react';
import './App.css';
import SitesContainer from './components/SitesContainer';
import { djinniParser } from './parser/parser';


function App() {
	// useEffect(() => {
	// 	const getParser = async () => {
	// 		const res = await djinniParser();
	// 		console.log(res);
	// 	}
	// 	getParser()
	// })

	return (
		<div className="App">
			<SitesContainer />
		</div>
	);
}

export default App;
