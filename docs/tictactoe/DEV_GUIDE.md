### DEV_GUIDE

### 1. Game State: Structure and Separation

The game state should be split into distinct components to ensure clear separation of concerns:

- **`t3-game`**:
    - Stores the **core game state** (e.g., players, history moves, currentMove, board size, game status, player's turn, winner).
    - Board size ensures that the board size cannot be changed after the game starts.

- **`t3-game-settings`**:
    - Stores **global game settings** for all players (e.g., win conditions, time per turn, automatic pause, rematch option).
    - Defines the **rules** of the game and influences the **game logic**.
    - Influences game logic (e.g., time per turn, whether rematch is allowed, if players can change their move during the game).
    - Stored separately in the database as part of the game configuration.

- **`t3-player`**:
    - Stores user interface state that can be modified by the user.
    - Stores **player settings** (e.g., sorting and visibility of move history, color theme, symbol colors for "X" and "O", sound volume).

**History settings (sorting and visibility) should be stored in `t3-user-settings` because:**
- These are personal UI settings affecting only the display.
- They don't affect the game logic, only how the user sees the move history.
- If multiple users are on the same device, each user can have their own sorting and visibility preferences.

### 2. Game Status: Structure and Explanation

The game has several statuses, each representing a specific stage or condition during gameplay. These statuses help manage game flow and transitions.

#### 2.1. Description of Each Status

- **`waiting`**:
    - **Description**: The game is ready to start, but it hasn’t begun yet. The first player hasn’t made a move. The timer is paused, and the game field is visible, but actions are blocked.

- **`running`**:
    - **Description**: The game is actively running. The game field is displayed, players can make moves, and the timer is running. This is the status when the game is actually in progress.

- **`paused`**:
    - **Description**: The game is paused. The timer is stopped, and the game field and move history are hidden or blocked.

- **`viewingHistory`**:
    - **Description**: The game is in the process of viewing the history of moves. The user can navigate through previous moves, but no actions can be performed on the game field. The game is in a read-only mode, allowing users to explore the past state.

- **`stopped`**:
    - **Description**: The game is finished. You can view the results (e.g., who won). The timer stops, and the game cannot be resumed or continued.

- **`saving`**:
    - **Description**: The game is being saved. The timer is stopped, and player actions are blocked until the save is complete.

#### 2.2. Logic for Status Transitions

The following outlines how the game progresses through various statuses:

1. **Game Initialization**:
    - Transition: `loading → waiting`
    - The game is being initialized and is not yet ready to start. The first player hasn't made a move.

2. **First Move**:
    - Transition: `waiting → running`
    - The first player has made a move, and the game is now actively running.

3. **Game Pause**:
    - Transition: `running → paused`
    - The game is paused, the timer stops, and actions are blocked.

4. **Resuming After Pause**:
    - Transition: `paused → running`
    - The game resumes from where it was paused and continues running.

5. **Stopping the Game (Victory or Other Scenario)**:
    - Transition: `running → stopped` or `paused → stopped`
    - The game ends, either due to victory or another scenario, and cannot be resumed.

6. **Saving the Game**:
    - Transition: `paused → saving → waiting` (if the game is expected to continue)
    - Transition: `paused → saving → stopped` (if the game ends after saving)
    - The game is being saved, and once completed, it either resumes or ends.  
