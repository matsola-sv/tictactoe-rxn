import {FC, lazy, Suspense} from "react";
import classNames from "classnames";
import {useMediaQuery} from "react-responsive";
// Models
import {GameViewProps} from "./GameView.types";
// Components
import Preloader from "../../../Common/UI/Preloader/Preloader";
// CSS basic styles for all display templates, imported before the templates themselves
import "../Templates/Common.css";

// Lazy loading of template components
const MobileGame = lazy(() => import("../Templates/MobileGame/MobileGame"));
const DesktopGame = lazy(() => import("../Templates/DesktopGame/DesktopGame"));

const GameView: FC<GameViewProps> = ({ components }) => {
    // TODO Temporary use
    const isMobile = useMediaQuery({ query: '(max-width: 700px)' });
    const layoutClass: string = classNames('t3-layout', {
        "one-column": isMobile,
        "two-columns": !isMobile
    });

    return (
        <Suspense fallback={<Preloader/>}>
            <div className="t3-container">
                <div className={layoutClass}>
                    {isMobile ? (
                        <MobileGame
                            gameControls={components.gameControls.mobile}
                            gameStopwatch={components.gameStopwatch}
                            gameStatus={components.gameStatus}
                            board={components.board}
                            movesList={components.movesList}
                            movesControls={components.movesControls.mobile}
                        />
                    ) : (
                        <DesktopGame
                            gameControls={components.gameControls.desktop}
                            gameStopwatch={components.gameStopwatch}
                            gameStatus={components.gameStatus}
                            board={components.board}
                            movesList={components.movesList}
                            movesControls={components.movesControls.desktop}
                        />
                    )}
                </div>
            </div>
        </Suspense>
    );
};
export default GameView;