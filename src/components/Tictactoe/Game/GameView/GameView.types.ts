import {ReactNode} from "react";

// Props for the main game display component
export interface GameViewProps {
    components: {
        board: ReactNode;         // Game board component
        gameControls: {           // Game controls buttons component
            desktop: ReactNode;   // Desktop/laptop
            mobile: ReactNode;
        };
        gameStopwatch: ReactNode; // Game stopwatch component
        gameStatus: ReactNode;    // Game status display component
        movesList: ReactNode;     // History of game moves component
        movesControls: {          // Controls for history moves navigation
            desktop: ReactNode;   // Desktop/laptop
            mobile: ReactNode
        };
    };
}

// Props for game view templates
export interface GameTemplateProps {
    board: ReactNode;            // Game board component
    gameControls: ReactNode;     // Game controls buttons component
    gameStopwatch: ReactNode;    // Game stopwatch component
    gameStatus: ReactNode;       // Game status display component
    movesList: ReactNode;        // History of game moves component
    movesControls: ReactNode;    // Controls for navigating history moves
}