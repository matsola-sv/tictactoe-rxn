import React, { FC, useLayoutEffect, useRef } from 'react';
// Hooks
import useGameState from 'hooks/tictactoe/useGameState';
// Components
import Preloader from 'components/Common/UI/Preloader/Preloader';
import ErrorMessage from 'components/Common/Error/Message/Message';
import Game from 'components/Tictactoe/Game/Game';

const GamesPage: FC = () => {
	const gameID: number = 1; //TODO Temp
	const gameRef = useRef<HTMLDivElement>(null); // Reference to the game wrapper element
	const { loading, error, stateContainer } = useGameState<number>(gameID);

	// On page load, ensure the game block is fully visible as the game's main content.
	// Use useLayoutEffect to scroll to the element after it renders,
	// but before the browser paints to avoid visual flickering.
	useLayoutEffect(() => {
		if (!loading && gameRef.current) {
			gameRef.current.scrollIntoView({
				behavior: 'auto', // No animation
				block: 'center', // Center the element vertically
			});
		}
	}, [loading]);

	if (loading) return <Preloader />;
	if (error) return <ErrorMessage error={error} />;

	return (
		<div
			id='t3-game-wrapper'
			ref={gameRef}
		>
			<Game
				gameState={stateContainer.state}
				boardColumns={stateContainer.state.board.cols}
			/>
		</div>
	);
};
export default GamesPage;
