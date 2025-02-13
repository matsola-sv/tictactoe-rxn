import {FC, lazy, Suspense} from "react";
import classNames from "classnames";
// Models
import {GameViewProps} from "./GameView.types";
// Hooks
import useMediaQueryContext from "../../../../hooks/useMediaQueryContext";
// Components
import Preloader from "../../../Common/UI/Preloader/Preloader";

// Lazy loading of template components
const MobileGame = lazy(() => import("../Templates/MobileGame/MobileGame"));
const DesktopGame = lazy(() => import("../Templates/DesktopGame/DesktopGame"));

const GameView: FC<GameViewProps> = ({ components }) => {
    // Determines if the screen size is larger than a tablet (769px and above)
    const { tabletPlusView } = useMediaQueryContext();
    const layoutClass: string = classNames('t3-layout', {
        "one-column": !tabletPlusView,
        "two-columns": tabletPlusView
    });

    return (
        <Suspense fallback={<Preloader/>}>
            <div className="t3-container">
                <div className={layoutClass}>
                    {tabletPlusView ? (
                        <DesktopGame
                            gameControls={components.gameControls.desktop}
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