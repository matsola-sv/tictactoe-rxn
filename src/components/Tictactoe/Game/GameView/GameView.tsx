import {FC, lazy, Suspense} from "react";
import classNames from "classnames";
// Models
import {GameViewProps} from "components/Tictactoe/Game/GameView/GameView.types";
// Hooks
import useMediaQueryContext from "hooks/useMediaQueryContext";
// Components
import Preloader from "components/Common/UI/Preloader/Preloader"; // Lazy loading of template components
// Lazy loading of template components
const MobileGame = lazy(() => import("components/Tictactoe/Game/Templates/MobileGame/MobileGame"));
const DesktopGame = lazy(() => import("components/Tictactoe/Game/Templates/DesktopGame/DesktopGame"));

const GameView: FC<GameViewProps> = ({ components }) => {
    // Screens: compact tablet (600-768px), tablet+ (min-width: 600px), and low height (max-height: 480px)
    const { tabletMView, tabletMUpView, lowHeightView } = useMediaQueryContext();
    const { desktop: desktopControls, mobile: mobileControls } = components.gameControls;

    // Two-columns layout for smaller screens with compact elements due to limited space.
    const isDesktopCompact = tabletMView || (tabletMUpView && lowHeightView);
    const containerClass: string = classNames("t3-box", {
        "t3-box--mob": !tabletMUpView, // For compact screens (mobiles, tablets etc.)
        "t3-box--desk": tabletMUpView, // For wider screens (laptop, large tablets, desktops etc.)
    });
    const layoutClass: string = classNames('t3-layout', {
        "t3-layout--1-col": !tabletMUpView,
        "t3-layout--2-cols": tabletMUpView,
        // Two-columns layout for smaller screens with compact elements due to limited space.
        "t3-layout--2-cols--sm": isDesktopCompact
    });

    return (
        <Suspense fallback={<Preloader/>}>
            <div className={containerClass}>
                <div className={layoutClass}>
                    {tabletMUpView ? (
                        <DesktopGame
                            gameControls={isDesktopCompact ? mobileControls : desktopControls}
                            gameStopwatch={components.gameStopwatch}
                            gameStatus={components.gameStatus}
                            board={components.board}
                            movesList={components.movesList}
                            movesControls={components.movesControls.desktop}
                        />
                    ) : (
                        <MobileGame
                            gameControls={components.gameControls.mobile}
                            gameStopwatch={components.gameStopwatch}
                            gameStatus={components.gameStatus}
                            board={components.board}
                            movesList={components.movesList}
                            movesControls={components.movesControls.mobile}
                        />
                    )}
                </div>
            </div>
        </Suspense>
    );
};
export default GameView;