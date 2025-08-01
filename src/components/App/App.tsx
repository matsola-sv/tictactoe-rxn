import React, { FC } from 'react';
// Components
import AppRouter from 'routers/AppRouter';
import MediaQueryProvider from 'components/Providers/MediaQueryProvider/MediaQueryProvider';
// Styles
import 'components/App/App.css';

const App: FC = () => {
	return (
		<MediaQueryProvider>
			<div className='App'>
				<AppRouter />
			</div>
		</MediaQueryProvider>
	);
};
export default App;
